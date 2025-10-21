import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View, ViewStyle } from 'react-native';

interface LoadingDotsProps {
  dotCount?: number;
  dotSize?: number;
  dotColor?: string;
  spacing?: number;
  animationDuration?: number;
  minOpacity?: number;
  style?: ViewStyle;
}

const LoadingDots: React.FC<LoadingDotsProps> = ({
  dotCount = 5,
  dotSize = 12,
  dotColor = '#4a90e2',
  spacing = 8,
  animationDuration = 1200,
  minOpacity = 0.5,
  style,
}) => {
  const animatedValues = useRef(
    [...Array(dotCount)].map(() => ({
      scale: new Animated.Value(1),
      opacity: new Animated.Value(minOpacity),
    }))
  ).current;

  useEffect(() => {
    const animations: Animated.CompositeAnimation[] = [];
    const timers: number[] = [];

    const delayIncrement = animationDuration / 5;

    animatedValues.forEach((values, index) => {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(values.scale, {
              toValue: 1.5,
              duration: animationDuration / 2,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(values.opacity, {
              toValue: 1,
              duration: animationDuration / 2,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(values.scale, {
              toValue: 1,
              duration: animationDuration / 2,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(values.opacity, {
              toValue: minOpacity,
              duration: animationDuration / 2,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
        ])
      );
      animations.push(animation);

      const timer = setTimeout(() => {
        animation.start();
      }, index * delayIncrement);

      timers.push(timer);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
      animations.forEach(animation => animation.stop());
    };
  }, [dotCount, animationDuration, minOpacity, animatedValues]);

  return (
    <View style={[styles.container, style]}>
      {[...Array(dotCount)].map((_, index) => (
        <Animated.View
          key={`dot-${index}`}
          style={[
            styles.dot,
            {
              width: dotSize,
              height: dotSize,
              borderRadius: dotSize / 2,
              backgroundColor: dotColor,
              marginHorizontal: spacing / 2,
              transform: [{ scale: animatedValues[index].scale }],
              opacity: animatedValues[index].opacity,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {},
});

export default LoadingDots;