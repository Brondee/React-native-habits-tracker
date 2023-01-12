import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

const ProgressBar = () => {
  const percentage = useSelector(state => state.progress.percentage) || 0;

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <View style={[{width: `${percentage}%`}, styles.bar]}></View>
      </View>
      <Text style={styles.text}>{percentage}% completed</Text>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  barContainer: {
    width: '100%',
    borderRadius: 22,
    height: 9,
    backgroundColor: '#3956A0',
    marginTop: 25,
  },
  bar: {
    height: 9,
    backgroundColor: '#CAD8FB',
    borderRadius: 15,
  },
  text: {
    fontSize: 15,
    fontFamily: 'Montserrat-Bold',
    marginTop: 6,
    color: '#FFFFFF',
  },
});
