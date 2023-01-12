import {StyleSheet} from 'react-native';

const modalStyles = StyleSheet.create({
  centeredView: {
    position: 'absolute',
    width: '100%',
    bottom: 110,
    alignItems: 'center',
  },
  modalContainer: {
    paddingHorizontal: 27,
    paddingVertical: 12,
    borderRadius: 50,
    borderWidth: 3,
  },
  modalSuccess: {
    borderColor: '#96EBAE',
    backgroundColor: '#14361E',
  },
  modalError: {
    borderColor: '#EB9696',
    backgroundColor: '#361414',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default modalStyles;
