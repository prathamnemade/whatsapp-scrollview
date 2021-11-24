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
const SNAP_POINTS = [-width, -width / 2, (-3 * width) / 8, -width / 4, 0];

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
      const movementValue = ctx.x + translationX;
      translateX.value = clamp(movementValue, -width, 0);
      widthX1.value = movementValue / 2;
      if (movementValue < -width / 2) {
        widthX2.value = movementValue;
      } else {
        widthX2.value = movementValue / 2;
      }
    },
    onEnd: ({ velocityX }) => {
      const dest = snapPoint(translateX.value, velocityX, SNAP_POINTS);
      if (dest === SNAP_POINTS[4]) {
        translateX.value = withTiming(0, { duration: 400 });
        widthX1.value = withTiming(0, { duration: 400 });
        widthX2.value = withTiming(0, { duration: 400 });
      } else if (dest <= SNAP_POINTS[1]) {
        translateX.value = withTiming(SNAP_POINTS[0], { duration: 200 });
        widthX1.value = withTiming(SNAP_POINTS[0], { duration: 200 });
        widthX2.value = withTiming(SNAP_POINTS[0], { duration: 200 });
        runOnJS(vibrateMe)(Haptics.NotificationFeedbackType.Success);
      } else {
        translateX.value = withTiming(SNAP_POINTS[2], { duration: 400 });
        widthX1.value = withTiming(SNAP_POINTS[2] / 2, { duration: 400 });
        widthX2.value = withTiming(SNAP_POINTS[2] / 2, { duration: 400 });
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
      width: Math.abs(2 * widthX1.value),
      left: 2 * widthX1.value,
    };
  });

  const style2 = useAnimatedStyle(() => {
    return {
      width: Math.abs(widthX2.value),
      left: widthX2.value,
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

// const onGestureEvent = useAnimatedGestureHandler({
//     onStart: (_, ctx) => {
//       ctx.x = translateX.value;
//     },
//     onActive: ({ translationX, velocityX }, ctx) => {
//       const dest = snapPoint(translateX.value, velocityX, SNAP_POINTS);
//       const movementValue = ctx.x + translationX;
//       translateX.value = clamp(movementValue, -width, 0);
//       widthX1.value = movementValue / 2;
//       if (SNAP_POINTS[1] > dest) {
//         translateX.value = withTiming(dest, { duration: 100 });
//         widthX1.value = withTiming(dest, { duration: 700 });
//         widthX2.value = withTiming(dest, { duration: 500 });
//       } else {
//         widthX2.value = movementValue / 2;
//       }
//     },
//     onEnd: ({ velocityX }) => {
//       const dest = snapPoint(translateX.value, velocityX, SNAP_POINTS);
//       if (dest === SNAP_POINTS[4]) {
//         translateX.value = withTiming(0, { duration: 400 });
//         widthX1.value = withTiming(0, { duration: 400 });
//         widthX2.value = withTiming(0, { duration: 400 });
//       } else if (dest === SNAP_POINTS[0]) {
//         runOnJS(vibrateMe)(Haptics.NotificationFeedbackType.Success);
//       } else {
//         translateX.value = withTiming(SNAP_POINTS[2], { duration: 400 });
//         widthX1.value = withTiming(SNAP_POINTS[2] / 2, { duration: 400 });
//         widthX2.value = withTiming(SNAP_POINTS[2] / 2, { duration: 400 });
//       }
//     },
//   });
