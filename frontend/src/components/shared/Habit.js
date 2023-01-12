import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {markDoneHabit} from '../../store/habit/habitSlice';
import {updateDoneToday} from '../../store/progressSlice';
import {updateHabitId} from '../../store/editFormSlice';
import {hideAddForm} from '../../store/addForm/addFormSlice';
import {setModal, hideModal} from '../../store/modalSlice';

import {useEditHabitMutation} from '../../store/habit/habitApiSlice';

const Habit = ({id, text, color, doneToday, amountDone, amountToFinish}) => {
  const dispatch = useDispatch();
  const {curDate} = useSelector(state => state.dates);
  const [editHabit, {isLoading}] = useEditHabitMutation();

  const onPress = async () => {
    const response = await editHabit({
      id,
      amountDone: amountDone + 1,
      doneToday: true,
    });
    if (response.error) {
      dispatch(setModal({title: 'Error occured', type: 'error'}));
      setTimeout(() => {
        dispatch(hideModal());
      }, 1500);
      console.log(response.error);
    } else {
      dispatch(markDoneHabit(id));
      dispatch(updateDoneToday(1));
      dispatch(setModal({title: 'habit done', type: 'success'}));
      setTimeout(() => {
        dispatch(hideModal());
      }, 1000);
    }
  };

  let toggleEditForm = () => {};
  if (curDate == new Date().getDate()) {
    toggleEditForm = () => {
      dispatch(updateHabitId(id));
      dispatch(hideAddForm());
    };
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        doneToday ? {borderColor: color} : {borderColor: '#121212'},
        styles.habitContainer,
      ]}
      onPress={toggleEditForm}>
      <View style={[{backgroundColor: color}, styles.colorSquare]}></View>
      <View style={styles.allButColorContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.habitTitle}>{text}</Text>
          {doneToday ? (
            <Text style={styles.habitDoneText}>completed</Text>
          ) : (
            <Text style={styles.habitDays}>
              {amountDone} of {amountToFinish} days
            </Text>
          )}
        </View>
        {!doneToday && curDate == new Date().getDate() && (
          <TouchableOpacity
            style={styles.doneBtn}
            onPress={onPress}></TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Habit;

const styles = StyleSheet.create({
  habitContainer: {
    width: '88%',
    borderRadius: 20,
    borderWidth: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121212',
    paddingVertical: 13,
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  colorSquare: {
    width: 19,
    height: 35,
    borderRadius: 6,
  },
  allButColorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: '8%',
    width: '80%',
  },
  habitTitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: '#FFFFFF',
    maxWidth: 150,
  },
  habitDays: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: '#BDBDBD',
    marginTop: 3,
  },
  habitDoneText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Bold',
    color: '#BDBDBD',
    marginTop: 3,
  },
  doneBtn: {
    width: 25,
    height: 25,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#B7DCFF',
  },
});
