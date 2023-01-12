const coolColors = [
  '#CAAEF9',
  '#B7EDC9',
  '#97F2ED',
  '#97ABF2',
  '#506FDD',
  '#000000',
  '#906969',
  '#38685A',
  '#FFDA55',
  '#DD92EA',
  '#FF4040',
  '#FFA8A8',
];

const randomColorGenerator = () => {
  return coolColors[Math.floor(Math.random() * 10)];
};

export default randomColorGenerator;
