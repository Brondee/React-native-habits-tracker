import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import PinkBtn from './BlueBtn';

import {hideForm} from '../../store/editFormSlice';
import {editHabit, deleteHabitById} from '../../store/habit/habitSlice';
import {updateDoneToday} from '../../store/progressSlice';
import {updateNeedToBeDone} from '../../store/progressSlice';
import {setModal, hideModal} from '../../store/modalSlice';
import {
  useDeleteHabitMutation,
  useEditHabitMutation,
} from '../../store/habit/habitApiSlice';

import randomColorGenerator from '../../utils/randomColorGenerator';
import SlideUpView from '../animated/SlideUpView';
import DeleteImg from '../../assets/img/delete.svg';

const EditForm = () => {
  const {isEditFormActive, habitId} = useSelector(state => state.editForm);
  const {habits} = useSelector(state => state.habit);
  dispatch = useDispatch();

  const [deleteHabitMutation, {isLoadingDel}] = useDeleteHabitMutation();
  const [editHabitMutation, {isLoadingEdit}] = useEditHabitMutation();

  curHabit = habits.filter(habit => habit.id == habitId);
  curHabit = curHabit[0];
  let curHabitDays = curHabit?.amountToFinish.toString();

  const [text, setText] = useState('');
  const [amountToFinish, setAmountToFinish] = useState('');
  const [doneToday, setDoneToday] = useState(false);
  const [color, setColor] = useState('');

  const habitsWithoutFinished = habits?.filter(
    habit => habit.isFinished == false,
  );

  let newDataByDates = [];
  useEffect(() => {
    setText(curHabit?.text);
    setAmountToFinish(curHabitDays);
    setDoneToday(
      typeof curHabit?.dataByDates[0] !== 'undefined'
        ? curHabit?.dataByDates[0].isDone
        : false,
    );
    setColor(curHabit?.color);
    newDataByDates = curHabit?.dataByDates.map(date => {
      date.isDone = doneToday;
      return date;
    });
  }, [curHabit]);

  const deleteHabit = async () => {
    if (doneToday) {
      dispatch(updateDoneToday(-1));
    }
    const response = await deleteHabitMutation(curHabit.id);
    if (!response) {
      dispatch(setModal({title: 'No Server Response', type: 'error'}));
      setTimeout(() => {
        dispatch(hideModal());
      }, 1500);
    } else {
      dispatch(deleteHabitById(curHabit.id));
      dispatch(updateNeedToBeDone(habitsWithoutFinished.length - 1));
      dispatch(hideForm());
      dispatch(setModal({title: 'habit deleted', type: 'success'}));
      setTimeout(() => {
        dispatch(hideModal());
      }, 1000);
    }
  };
  const toggleColorFunc = () => {
    setColor(randomColorGenerator());
  };
  const saveFunc = async () => {
    data = {
      id: curHabit.id,
      color: color,
      text: text,
      doneToday: doneToday,
      amountToFinish: Number(amountToFinish),
    };
    if (!amountToFinish || amountToFinish == 0) {
      dispatch(
        setModal({title: 'fill in days to complete field', type: 'error'}),
      );
      setTimeout(() => {
        dispatch(hideModal());
      }, 1500);
    } else {
      if (!doneToday && curHabit.doneToday == true) {
        data = {...data, amountDone: curHabit.amountDone - 1};
      } else if (doneToday && curHabit.doneToday == false) {
        data = {...data, amountDone: curHabit.amountDone + 1};
      }
      if (curHabit.amountDone == amountToFinish) {
        data = {...data, isFinished: true};
      }
      const response = await editHabitMutation(data);
      if (response.error) {
        dispatch(setModal({title: 'Error occured', type: 'error'}));
        setTimeout(() => {
          dispatch(hideModal());
        }, 1500);
        console.log(response.error);
      } else {
        if (doneToday && curHabit.doneToday == false) {
          dispatch(updateDoneToday(1));
        } else if (!doneToday && curHabit.doneToday == true) {
          dispatch(updateDoneToday(-1));
        }
        newDataByDates = curHabit?.dataByDates.map(date => {
          date.isDone = doneToday;
          return date;
        });
        const newData = {...data, dataByDates: newDataByDates};
        dispatch(editHabit(newData));
        dispatch(hideForm());
        dispatch(setModal({title: 'habit updated', type: 'success'}));
        setTimeout(() => {
          dispatch(hideModal());
        }, 1500);
      }
    }
  };
  const hideFormFunc = () => {
    dispatch(hideForm());
  };

  if (isEditFormActive && curHabit) {
    return (
      <SlideUpView>
        <View style={styles.formContainer}>
          <View style={styles.titleDeleteContainer}>
            <View>
              <Text style={styles.title}>Edit Habit</Text>
              <View style={styles.underline}></View>
            </View>
            <TouchableOpacity style={styles.deleteBtn} onPress={deleteHabit}>
              <DeleteImg />
            </TouchableOpacity>
          </View>
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
            value={text}
            onChangeText={value => setText(value)}
            style={styles.titleInput}></TextInput>
          <View style={styles.doneBtnsContainer}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={[styles.doneBtn, doneToday && styles.activeBtn]}
              onPress={() => setDoneToday(true)}>
              <Text style={styles.doneBtnText}>Done</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              style={[styles.doneBtn, !doneToday && styles.activeBtn]}
              onPress={() => setDoneToday(false)}>
              <Text style={styles.doneBtnText}>Not done</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.daysToCompleteContainer}>
            <TextInput
              value={amountToFinish}
              onChangeText={value => setAmountToFinish(value)}
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

export default EditForm;

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
  titleDeleteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
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
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
  },
  deleteBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FF3939',
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
    paddingVertical: 13,
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 15,
    color: '#FFFFFF',
  },
  doneBtnsContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  doneBtn: {
    borderWidth: 3,
    borderRadius: 13,
    paddingVertical: 13,
    paddingHorizontal: 20,
    marginRight: 10,
    borderColor: '#96B8EB',
  },
  activeBtn: {
    borderColor: '#96B8EB',
    backgroundColor: '#0C1141',
  },
  doneBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
  daysToCompleteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  daysLeftInput: {
    borderWidth: 3,
    borderColor: '#96B8EB',
    borderRadius: 12,
    width: 50,
    height: 50,
    color: '#FFFFFF',
    paddingLeft: 13,
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
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
    marginTop: 25,
  },
});
