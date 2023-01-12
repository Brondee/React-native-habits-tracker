import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import uuid from 'react-native-uuid';
import {useSelector, useDispatch} from 'react-redux';

import PinkBtn from './BlueBtn';
import SlideUpView from '../animated/SlideUpView';

import {hideAddForm} from '../../store/addForm/addFormSlice';
import {updateNeedToBeDone} from '../../store/progressSlice';
import {setModal, hideModal} from '../../store/modalSlice';
import {addHabit} from '../../store/habit/habitSlice';
import {useAddHabitMutation} from '../../store/addForm/addFormApiSlice';

import randomColorGenerator from '../../utils/randomColorGenerator';

const AddForm = () => {
  const {isAddFormActive} = useSelector(state => state.addForm);
  const {habits} = useSelector(state => state.habit);
  dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [daysLeft, setDaysLeft] = useState(0);

  const [addHabitMutation, {isLoading}] = useAddHabitMutation();

  const [color, setColor] = useState(randomColorGenerator());

  const toggleColorFunc = () => {
    setColor(randomColorGenerator());
  };

  // to filter only not finished habits for today
  const habitsWithoutFinished = habits?.filter(
    habit => habit.isFinished == false,
  );

  const saveFunc = async () => {
    if (!title || !daysLeft) {
      dispatch(setModal({title: 'fill in all the fields', type: 'error'}));
      setTimeout(() => {
        dispatch(hideModal());
      }, 1500);
    } else {
      const amountToFinish = Number(daysLeft);
      const newHabit = {
        text: title,
        color,
        amountToFinish,
      };
      const response = await addHabitMutation(newHabit);
      if (response.error) {
        dispatch(setModal({title: 'Error occured', type: 'error'}));
        setTimeout(() => {
          dispatch(hideModal());
        }, 1500);
        console.log(response.error);
      } else {
        const newHabitTwo = {
          id: Number(response.data.id),
          text: title,
          color,
          amountToFinish,
          doneToday: false,
          isFinished: false,
          amountDone: 0,
          dataByDates: [
            {
              date: new Date().getDate(),
              isDone: false,
            },
          ],
          ...response.data.newHabit,
        };
        await dispatch(addHabit(newHabitTwo));
        //updating the progress bar
        dispatch(updateNeedToBeDone(habitsWithoutFinished.length + 1));
        //hiding add form
        dispatch(hideAddForm());
        //setting to default each state
        setTitle('');
        setDaysLeft(0);
        //showing modal with success type
        dispatch(setModal({title: 'habit added', type: 'success'}));
        setTimeout(() => {
          dispatch(hideModal());
        }, 1500);
      }
    }
  };
  const hideFormFunc = () => {
    dispatch(hideAddForm());
  };

  if (isAddFormActive) {
    return (
      <SlideUpView>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Add Habit</Text>
          <View style={styles.underline}></View>
          <View style={styles.colorContainer}>
            <View style={[{backgroundColor: color}, styles.colorSquare]}></View>
            <PinkBtn
              title="Toggle color"
              fontSize={16}
              color="#000000"
              onPress={toggleColorFunc}
            />
          </View>
          <TextInput
            placeholder="title"
            placeholderTextColor="#999595"
            value={title}
            onChangeText={value => setTitle(value)}
            style={styles.titleInput}></TextInput>
          <View style={styles.daysToCompleteContainer}>
            <TextInput
              value={daysLeft}
              onChangeText={value => setDaysLeft(value)}
              style={styles.daysLeftInput}></TextInput>
            <Text style={styles.daysLeftText}>days to complete</Text>
          </View>
          <View style={styles.btnsContainer}>
            <PinkBtn
              title="Save"
              fontSize={18}
              marginRight={15}
              color="#000000"
              onPress={saveFunc}
            />
            <PinkBtn
              title="Cancel"
              fontSize={18}
              color="#606060"
              onPress={hideFormFunc}
            />
          </View>
        </View>
      </SlideUpView>
    );
  }
};

export default AddForm;

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#151C2D',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 100,
    width: '100%',
    paddingVertical: 40,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 23,
    fontFamily: 'Montserrat-SemiBold',
    color: '#FFFFFF',
  },
  underline: {
    marginTop: 2,
    height: 2,
    width: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  colorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  colorSquare: {
    width: 50,
    height: 50,
    borderRadius: 13,
    marginRight: 10,
  },
  titleInput: {
    width: '100%',
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#96B8EB',
    paddingHorizontal: 30,
    paddingVertical: 15,
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 12,
    color: '#FFFFFF',
  },
  daysToCompleteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  daysLeftInput: {
    borderWidth: 3,
    borderColor: '#96B8EB',
    borderRadius: 12,
    width: 50,
    height: 50,
    color: '#000000',
    paddingLeft: 13,
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: '#FFFFFF',
  },
  daysLeftText: {
    color: '#E3E3E3',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: 12,
  },
  btnsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
