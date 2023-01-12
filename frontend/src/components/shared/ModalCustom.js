import {Text, View, Modal} from 'react-native';

import {useSelector} from 'react-redux';
import modalStyles from '../../styles/modalStyles';

const ModalCustom = ({}) => {
  const {isModalActive, modalTitle, modalType} = useSelector(
    state => state.modal,
  );
  return (
    <Modal animationType="fade" transparent={true} visible={isModalActive}>
      <View style={modalStyles.centeredView}>
        <View
          style={[
            modalType == 'success'
              ? modalStyles.modalSuccess
              : modalStyles.modalError,
            modalStyles.modalContainer,
          ]}>
          <Text style={modalStyles.title}>{modalTitle}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default ModalCustom;
