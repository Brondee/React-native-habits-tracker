import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import boilerPlateStyles from '../styles/boilerPlateStyles';

import {hideAddForm} from '../store/addForm/addFormSlice';
import {setStats} from '../store/user/userSlice';

import StatsBlock from '../components/shared/StatsBlock';
import StatsHabit from '../components/shared/StatsHabit';
import AddForm from '../components/shared/AddForm';
import ModalCustom from '../components/shared/ModalCustom';

import {useGetUserInfoQuery} from '../store/user/userApiSlice';

const StatsScreen = () => {
  const {habits} = useSelector(state => state.habit);
  const dispatch = useDispatch();

  const {data, isLoading, isSuccess, isError, error} = useGetUserInfoQuery();
  if (isSuccess) {
    const {longestStreak, allHabitsDone, currentStreak} = data;
    dispatch(setStats(longestStreak, allHabitsDone, currentStreak));
  }

  // to filter only not finished habits for today
  const habitsWithoutFinished = habits.filter(
    habit => habit.isFinished == false,
  );

  const hideForm = () => {
    dispatch(hideAddForm());
  };

  return (
    <View style={boilerPlateStyles.main}>
      <TouchableOpacity activeOpacity={1} onPress={hideForm}>
        <ScrollView>
          <StatusBar
            animated={true}
            backgroundColor="#111111"
            barStyle="light-content"
          />
          <View style={boilerPlateStyles.body}>
            <View style={boilerPlateStyles.wrap}>
              <Text style={boilerPlateStyles.header}>Statistics</Text>
              <View style={styles.statsContainer}>
                <StatsBlock
                  title={`${data?.currentStreak} days`}
                  description="current streak"
                  bg="circle"
                />
                <StatsBlock
                  title={`${data?.allHabitsDone} days`}
                  description="all habits done"
                  bg="square"
                />
                <StatsBlock
                  title={`${data?.longestStreak} days`}
                  description="longest streak"
                  bg="polygon"
                />
              </View>
              <View style={styles.habitsContainer}>
                {!habitsWithoutFinished.length && (
                  <Text style={styles.noHabitsText}>No habits yet!</Text>
                )}
                {habits.map(habit => {
                  const {
                    id,
                    text,
                    color,
                    isFinished,
                    amountDone,
                    amountToFinish,
                  } = habit;
                  return (
                    <StatsHabit
                      key={id}
                      text={text}
                      color={color}
                      amountDone={amountDone}
                      amountToFinish={amountToFinish}
                      isFinished={isFinished}
                    />
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableOpacity>
      <ModalCustom />
      <AddForm />
    </View>
  );
};

export default StatsScreen;

const styles = StyleSheet.create({
  statsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  habitsContainer: {
    marginTop: 20,
    marginBottom: 100,
  },
  noHabitsText: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});
