import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {useDispatch} from 'react-redux';
import {updateCurDate} from '../../store/datesSlice';
import {setHabits} from '../../store/habit/habitSlice';
import {updateNeedToBeDone, setDoneToday} from '../../store/progressSlice';

const DateBtn = ({dateNumber, dayNumber, dayTitle, isActive, isClickable}) => {
  const dispatch = useDispatch();

  const onPress = () => {
    dispatch(updateCurDate({dayNumber, dateNumber}));
    dispatch(setHabits([]));
    dispatch(updateNeedToBeDone(0));
    dispatch(setDoneToday(0));
  };

  return isActive ? (
    <TouchableOpacity style={styles.btnActive} activeOpacity={0.7}>
      <Text style={styles.titleActive}>{dayTitle}</Text>
      <Text style={styles.numActive}>{dateNumber}</Text>
    </TouchableOpacity>
  ) : isClickable ? (
    <TouchableOpacity
      style={styles.btnInactive}
      activeOpacity={0.7}
      onPress={onPress}>
      <Text style={styles.numInactive}>{dateNumber}</Text>
    </TouchableOpacity>
  ) : (
    <View style={styles.btnInactive}>
      <Text style={styles.numInactive}>{dateNumber}</Text>
    </View>
  );
};

export default DateBtn;

const styles = StyleSheet.create({
  btnActive: {
    borderWidth: 3,
    borderColor: '#96B8EB',
    borderRadius: 15,
    width: 44,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#141C36',
  },
  titleActive: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: '#FFFFFF',
  },
  numActive: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    color: '#FFFFFF',
  },
  btnInactive: {
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#96B8EB',
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numInactive: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: '#D4CDCD',
  },
});
