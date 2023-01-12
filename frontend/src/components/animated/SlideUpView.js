import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions, StyleSheet} from 'react-native';

const SlideUpView = props => {
  // get height of the screen
  height = Dimensions.get('window').height;
  let animated = useRef(new Animated.Value(height - 50)).current;
  const duration = 400;

  useEffect(() => {
    Animated.timing(animated, {
      toValue: height - 750,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [animated]);

  return (
    <Animated.View style={[styles.view, {transform: [{translateY: animated}]}]}>
      {props.children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default SlideUpView;
