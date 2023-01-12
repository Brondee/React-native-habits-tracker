import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  habits: [],
};

const habitSlice = createSlice({
  name: 'habit',
  initialState,
  reducers: {
    setHabits: (state, action) => {
      state.habits = action.payload;
    },
    addHabit: (state, action) => {
      const newHabits = [...state.habits, action.payload];
      state.habits = newHabits;
    },
    markDoneHabit: (state, action) => {
      const newState = state.habits.map(habit => {
        if (habit.id == action.payload) {
          habit.doneToday = true;
          habit.dataByDates = [
            {
              date: new Date().getDate(),
              isDone: true,
            },
          ];
          habit.amountDone += 1;
          if (habit.amountToFinish == habit.amountDone) {
            habit.isFinished = true;
          }
        }
        return habit;
      });
      state.habits = newState;
    },
    editHabit: (state, action) => {
      const {id, color, text, doneToday, amountToFinish, amountDone} =
        action.payload;
      const newHabits = state.habits.map(habit => {
        if (habit.id == id) {
          habit.color = color;
          habit.text = text;
          habit.amountDone = amountDone;
          habit.doneToday = doneToday;
          habit.amountToFinish = amountToFinish;
        }
        return habit;
      });
      state.habits = newHabits;
    },
    deleteHabitById: (state, action) => {
      const newState = state.habits.filter(habit => habit.id != action.payload);
      state.habits = newState;
    },
  },
});

export const {markDoneHabit, editHabit, setHabits, addHabit, deleteHabitById} =
  habitSlice.actions;

export default habitSlice.reducer;
