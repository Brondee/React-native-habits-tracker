import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import boilerPlateStyles from '../styles/boilerPlateStyles';

import DateBtn from '../components/shared/DateBtn';
import ProgressBar from '../components/shared/ProgressBar';
import Habit from '../components/shared/Habit';
import EditForm from '../components/shared/EditForm';
import AddForm from '../components/shared/AddForm';
import ModalCustom from '../components/shared/ModalCustom';

import {updateNeedToBeDone, updateDoneToday} from '../store/progressSlice';
import {hideForm} from '../store/editFormSlice';
import {hideAddForm} from '../store/addForm/addFormSlice';
import {setHabits} from '../store/habit/habitSlice';

import {useGetHabitsByDateQuery} from '../store/habit/habitApiSlice';

const HomeScreen = () => {
  // get all the habits
  const {habits} = useSelector(state => state.habit);
  const progressBarInfo = useSelector(state => state.progress);
  const {dates, curDate} = useSelector(state => state.dates);
  const dispatch = useDispatch();

  const {data, isLoading, isSuccess, isError, error} =
    useGetHabitsByDateQuery(curDate);
  if (isSuccess) {
    if (habits.length == 0) {
      dispatch(setHabits(data));
      console.log({isLoading});
    }
  } else if (isError) {
    console.log(error);
  }

  // to filter only not finished habits for today
  const habitsWithoutFinished = habits?.filter(
    habit => habit.isFinished == false,
  );
  const correctedHabits = habits.map(habit => {
    if (typeof habit.dataByDates[0] !== 'undefined') {
      habit.doneToday = habit.dataByDates[0].isDone;
    } else {
      habit.doneToday = false;
    }
    return habit;
  });
  const completedToday = correctedHabits.filter(
    habit => habit.doneToday == true,
  ).length;
  // pass only unfinished habits to the progress bar slice,
  // where later it will calculate percentage of done habits
  if (progressBarInfo.doneToday == 0 && progressBarInfo.needToBeDone == 0) {
    dispatch(updateNeedToBeDone(habitsWithoutFinished?.length));
    dispatch(updateDoneToday(completedToday));
  }

  const hideEditForm = () => {
    dispatch(hideForm());
    dispatch(hideAddForm());
  };

  return (
    <View style={boilerPlateStyles.main}>
      <TouchableOpacity onPress={hideEditForm} activeOpacity={1}>
        <ScrollView>
          <StatusBar
            animated={true}
            backgroundColor="#111111"
            barStyle="light-content"
          />
          <View style={boilerPlateStyles.body}>
            <View style={boilerPlateStyles.wrap}>
              <Text style={boilerPlateStyles.header}>My habits</Text>
              <View style={styles.datesContainer}>
                {dates.map(date => {
                  const {
                    dateNumber,
                    dayTitle,
                    isActive,
                    dayNumber,
                    isClickable,
                  } = date;
                  return (
                    <DateBtn
                      key={dayNumber}
                      dateNumber={dateNumber}
                      dayNumber={dayNumber}
                      dayTitle={dayTitle}
                      isActive={isActive}
                      isClickable={isClickable}
                    />
                  );
                })}
              </View>
              <ProgressBar />
              <View style={styles.habitsContainer}>
                {!habitsWithoutFinished?.length && (
                  <Text style={styles.noHabitsText}>No habits yet!</Text>
                )}
                {isLoading && <Text>Loading...</Text>}
                {habits?.map(habit => {
                  const {
                    id,
                    text,
                    color,
                    amountDone,
                    amountToFinish,
                    isFinished,
                    dataByDates,
                  } = habit;
                  return (
                    !isFinished && (
                      <Habit
                        key={id}
                        id={id}
                        text={text}
                        color={color}
                        doneToday={
                          typeof dataByDates[0] !== 'undefined'
                            ? dataByDates[0].isDone
                            : false
                        }
                        amountDone={amountDone}
                        amountToFinish={amountToFinish}
                        isFinished={isFinished}
                      />
                    )
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableOpacity>
      <ModalCustom />
      <EditForm />
      <AddForm />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  datesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  habitsContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#141C36',
    borderWidth: 4,
    borderColor: '#96B8EB',
    borderRadius: 33,
    paddingVertical: 20,
    marginTop: 30,
    marginBottom: 100,
  },
  noHabitsText: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  },
});
