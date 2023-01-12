import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const PinkBtn = ({title, fontSize, marginRight, color, onPress}) => {
  return (
    <TouchableOpacity
      style={[{marginRight}, styles.btnContainer]}
      onPress={onPress}
      activeOpacity={0.7}>
      <Text style={[{fontSize, color}, styles.title]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PinkBtn;

const styles = StyleSheet.create({
  btnContainer: {
    borderWidth: 3,
    borderColor: '#96B8EB',
    borderRadius: 14,
    backgroundColor: '#0C1141',
    paddingHorizontal: 25,
    paddingVertical: 12,
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#FFFFFF',
  },
});
