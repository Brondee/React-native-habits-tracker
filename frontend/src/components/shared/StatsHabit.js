import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const StatsHabit = ({text, amountDone, amountToFinish, isFinished, color}) => {
  const percentage = (amountDone / amountToFinish) * 100;
  return (
    <View style={[{borderColor: color}, styles.mainContainer]}>
      <View style={styles.titleColorContainer}>
        <View style={[{backgroundColor: color}, styles.colorSquare]}></View>
        <Text style={styles.title}>{text}</Text>
      </View>
      <View style={styles.progressBarContainer}>
        <View
          style={[
            {backgroundColor: color, width: `${percentage}%`},
            styles.progressBar,
          ]}></View>
      </View>
      {isFinished ? (
        <Text style={styles.habitText}>completed</Text>
      ) : (
        <Text style={styles.habitText}>
          <Text style={{color}}>{amountDone}</Text> of {amountToFinish} days
        </Text>
      )}
    </View>
  );
};

export default StatsHabit;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    backgroundColor: '#141C36',
    borderRadius: 18,
    borderWidth: 3,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 15,
  },
  titleColorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorSquare: {
    width: 10,
    height: 10,
    borderRadius: 3,
    marginRight: 6,
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
    color: '#FFFFFF',
    paddingBottom: 3,
  },
  progressBarContainer: {
    width: '100%',
    height: 5,
    borderRadius: 35,
    backgroundColor: '#F8FAFF',
    marginVertical: 5,
  },
  progressBar: {
    height: 5,
    borderRadius: 35,
  },
  habitText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontFamily: 'Montserrat-SemiBold',
  },
});
