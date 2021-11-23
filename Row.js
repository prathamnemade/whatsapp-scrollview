import React from "react";
import { View, Image, Text, StyleSheet, Dimensions } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { clamp, snapPoint } from "react-native-redash";

const { width } = Dimensions.get("window");
const SNAP_POINTS = [-width, -(2 * width) / 3, -width / 3, 0];
const BOX_SIZE = 70;

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
      widthX2.value = Math.abs(translateX.value) / 2;
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
        widthX1.value = withTiming(width, { duration: 400 });
        widthX2.value = 0;
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
      width: widthX1.value,
      left: -widthX1.value,
    };
  });

  const style2 = useAnimatedStyle(() => {
    return {
      width: widthX2.value,
      left: -3 * widthX2.value,
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
      <Animated.View
        style={[{ backgroundColor: "red", height: "100%" }, style1]}
      />
      <Animated.View
        style={[{ backgroundColor: "green", height: "100%" }, style2]}
      />
    </View>
  );
};

export default Row;

const styles = StyleSheet.create({
  detailRow: {
    flexDirection: "row",
    padding: 10,
    width: width,
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
});
