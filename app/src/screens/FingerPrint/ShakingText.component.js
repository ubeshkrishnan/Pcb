import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Animated, Text} from 'react-native';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';


const ShakingText = forwardRef(({ style, children }, ref) => {
  const shakeAnimationValue = new Animated.Value(0);

  const startShakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shakeAnimationValue, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnimationValue, { toValue: -10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnimationValue, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnimationValue, { toValue: 0, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  return (
    <Animated.Text
      ref={ref}
      style={[style, { transform: [{ translateX: shakeAnimationValue }] }]}
      onLayout={startShakeAnimation}
    >
      {children}
    </Animated.Text>
  );
});

ShakingText.propTypes = {
  style: ViewPropTypes.style,
  children: PropTypes.node.isRequired,
};

export default ShakingText;
