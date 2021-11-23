import React from "react";
import { View, Image, Text, StyleSheet, Dimensions } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { clamp, snapPoint } from "react-native-redash";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");
const SNAP_POINTS = [-width, -(2 * width) / 3, -width / 3, 0];
const BOX_SIZE = 70;
const BUFFER_FEEDBACK = 10;

const withinRangeFeedback = (x, min, max, type) => {
  if (x >= min && x <= max) {
    runOnJS(vibrateMe)(type);
  }
};

const vibrateMe = (type) => {
  Haptics.notificationAsync(type);
};

const Row = ({ item }) => {
  const translateX = useSharedValue(0);
  const widthX1 = useSharedValue(0);
  const widthX2 = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
    },
    onActive: ({ translationX }, ctx) => {
      translateX.value = clamp(ctx.x + translationX, -width, 0);
      widthX1.value = Math.abs(translateX.value) / 2;
      if (
        Math.abs(ctx.x + translationX) > width / 3 &&
        Math.abs(ctx.x + translationX) < (2 * width) / 3
      ) {
        widthX2.value = withTiming((2 * width) / 3, { duration: 400 });
      } else if (Math.abs(ctx.x + translationX) > (2 * width) / 3) {
        widthX2.value = withTiming(width, { duration: 400 });
      } else {
        widthX2.value = Math.abs(translateX.value) / 2;
      }
      runOnJS(withinRangeFeedback)(
        Math.abs(Math.ceil(ctx.x + translationX)),
        Math.ceil(width / 3),
        Math.ceil(width / 3) + BUFFER_FEEDBACK,
        Haptics.NotificationFeedbackType.Warning
      );
    },
    onEnd: ({ velocityX }) => {
      const dest = snapPoint(translateX.value, velocityX, SNAP_POINTS);
      if (dest === 0) {
        translateX.value = withTiming(0, { duration: 400 });
        widthX1.value = withTiming(0, { duration: 400 });
        widthX2.value = withTiming(0, { duration: 400 });
      } else if (dest === -width / 3) {
        translateX.value = withTiming(-BOX_SIZE * 2, { duration: 400 });
        widthX1.value = withTiming(BOX_SIZE, { duration: 400 });
        widthX2.value = withTiming(BOX_SIZE, { duration: 400 });
      } else if (dest === (-2 * width) / 3) {
        translateX.value = withTiming(-BOX_SIZE * 4, { duration: 400 });
        widthX1.value = withTiming(BOX_SIZE * 2, { duration: 400 });
        widthX2.value = withTiming(BOX_SIZE * 2, { duration: 400 });
      } else {
        translateX.value = withTiming(-width, { duration: 400 });
        widthX1.value = 0;
        widthX2.value = withTiming(width, { duration: 400 });
        runOnJS(vibrateMe)(Haptics.NotificationFeedbackType.Success);
      }
    },
  });

  const style = useAnimatedStyle(() => {
    return {
      left: translateX.value,
    };
  });

  const style1 = useAnimatedStyle(() => {
    return {
      width: 2 * widthX1.value,
      left: -2 * widthX1.value,
    };
  });

  const style2 = useAnimatedStyle(() => {
    return {
      width: widthX2.value,
      left: -widthX2.value,
    };
  });

  return (
    <View style={styles.rowArrange}>
      <PanGestureHandler {...{ onGestureEvent }}>
        <Animated.View style={[styles.detailRow, style]}>
          <Image source={{ uri: item.photo }} style={styles.image} />
          <View style={styles.nameDetails}>
            <Text>
              {item.first_name} {item.last_name}
            </Text>
            <Text>{item.email}</Text>
          </View>
        </Animated.View>
      </PanGestureHandler>
      <View style={{ flexDirection: "row" }}>
        <Animated.View style={[styles.optionBar1, style1]} />
        <Animated.View style={[styles.optionBar2, style2]} />
      </View>
    </View>
  );
};

export default Row;

const styles = StyleSheet.create({
  detailRow: {
    flexDirection: "row",
    padding: 10,
    width: width,
    borderWidth: 0.2,
    borderColor: "#D3D3D3",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  nameDetails: {
    flexDirection: "column",
    marginHorizontal: 10,
  },
  rowArrange: {
    flexDirection: "row",
  },
  optionBar1: {
    height: "100%",
    position: "absolute",
    backgroundColor: "#C8C8CC",
  },
  optionBar2: {
    height: "100%",
    position: "absolute",
    backgroundColor: "#4A6FA3",
  },
});
