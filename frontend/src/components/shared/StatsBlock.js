import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SquareBg from '../../assets/img/squareBg.svg';
import CircleBg from '../../assets/img/circleBg.svg';
import PolygonBg from '../../assets/img/polygonBg.svg';

const StatsBlock = ({title, description, bg}) => {
  return (
    <View style={styles.bgContainer}>
      {bg == 'circle' && <CircleBg style={styles.bg} />}
      {bg == 'square' && <SquareBg style={styles.bg} />}
      {bg == 'polygon' && <PolygonBg style={styles.bg} />}
      <View style={styles.statsContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

export default StatsBlock;

const styles = StyleSheet.create({
  statsContainer: {
    width: 105,
    height: 105,
    borderRadius: 18,
    borderColor: '#4A79C0',
    borderWidth: 3,
    paddingLeft: 14,
    paddingVertical: 15,
  },
  bg: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 3,
  },
  description: {
    color: '#D0D0D0',
    fontSize: 13,
    fontFamily: 'Montserrat-SemiBold',
    lineHeight: 14,
  },
});
