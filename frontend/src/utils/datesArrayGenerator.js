let dates = [
  {
    dateNumber: 0,
    dayTitle: 'Su',
    isActive: false,
    dayNumber: 0,
    isClickable: false,
  },
  {
    dateNumber: 1,
    dayTitle: 'Mo',
    isActive: false,
    dayNumber: 1,
    isClickable: false,
  },
  {
    dateNumber: 2,
    dayTitle: 'Tu',
    isActive: false,
    dayNumber: 2,
    isClickable: false,
  },
  {
    dateNumber: 3,
    dayTitle: 'We',
    isActive: false,
    dayNumber: 3,
    isClickable: false,
  },
  {
    dateNumber: 4,
    dayTitle: 'Th',
    isActive: false,
    dayNumber: 4,
    isClickable: false,
  },
  {
    dateNumber: 5,
    dayTitle: 'Fr',
    isActive: false,
    dayNumber: 5,
    isClickable: false,
  },
  {
    dateNumber: 6,
    dayTitle: 'Sa',
    isActive: false,
    dayNumber: 6,
    isClickable: false,
  },
];
const datesArrayGenerator = (curDay, curDate) => {
  dates = dates.map(date => {
    if (date.dayNumber < curDay) {
      date.dateNumber = curDate - (curDay - date.dayNumber);
      date.isClickable = true;
    } else if (date.dayNumber > curDay) {
      date.dateNumber = curDate + (date.dayNumber - curDay);
    }
    date.isActive = false;
    return date;
  });
  dates[curDay].isActive = true;
  dates[curDay].dateNumber = curDate;
  dates[curDay].isClickable = true;
  return dates;
};

export default datesArrayGenerator;
