import {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useDispatch} from 'react-redux';
import {setCredentials} from '../store/auth/authSlice';
import {useLoginMutation} from '../store/auth/authApiSlice';

import ModalCustom from '../components/shared/ModalCustom';
import {setModal, hideModal} from '../store/modalSlice';

import boilerPlateStyles from '../styles/boilerPlateStyles';

const LoginScreen = () => {
  const navigation = useNavigation();
  dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, {isLoading}] = useLoginMutation();

  const sumbitFunc = async () => {
    if (!email || !password) {
      dispatch(setModal({title: 'Fill in all the fields', type: 'error'}));
      setTimeout(() => {
        dispatch(hideModal());
      }, 1500);
    } else {
      const response = await login({email, password});
      if (!response) {
        dispatch(setModal({title: 'No Server Response', type: 'error'}));
        setTimeout(() => {
          dispatch(hideModal());
        }, 1500);
      } else if (response.error) {
        const statusCode = response.error.data.statusCode;
        if (statusCode == 403) {
          dispatch(setModal({title: 'Сredentials incorrect', type: 'error'}));
          setTimeout(() => {
            dispatch(hideModal());
          }, 1500);
          console.log('Сredentials incorrect');
        } else if (statusCode == 401) {
          dispatch(setModal({title: 'Unauthorized', type: 'error'}));
          setTimeout(() => {
            dispatch(hideModal());
          }, 1500);
          console.log('Unauthorized');
        } else {
          dispatch(setModal({title: 'Login Failed', type: 'error'}));
          setTimeout(() => {
            dispatch(hideModal());
          }, 1500);
          console.log('Login Failed');
        }
      } else {
        dispatch(setCredentials({...response.data, email}));
        setEmail('');
        setPassword('');
        navigation.navigate('Tabs');
      }
    }
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <ScrollView style={boilerPlateStyles.main}>
      <StatusBar
        animated={true}
        backgroundColor="#111111"
        barStyle="light-content"
      />
      <View style={boilerPlateStyles.body}>
        <Image
          source={require('../assets/img/singinImg.jpg')}
          style={styles.img}
        />
        <View style={boilerPlateStyles.wrap}>
          <View style={styles.container}>
            {isLoading ? (
              <Text style={styles.title}>Loading...</Text>
            ) : (
              <Text style={styles.title}>Sing in</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#DBDBDB"
              value={email}
              onChangeText={value => setEmail(value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#DBDBDB"
              value={password}
              onChangeText={value => setPassword(value)}
              secureTextEntry={true}
            />
            <TouchableOpacity style={styles.submitBtn} onPress={sumbitFunc}>
              <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.questionText}>Don't have an account? </Text>
              <TouchableOpacity onPress={navigateToRegister}>
                <Text style={styles.linkText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <ModalCustom />
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  img: {
    width: '92%',
    borderRadius: 22,
    height: 310,
    marginTop: 10,
  },
  container: {
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 35,
    fontFamily: 'Montserrat-Bold',
    marginTop: 15,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderRadius: 25,
    borderWidth: 4,
    borderColor: '#96B8EB',
    backgroundColor: '#141C36',
    marginTop: 12,
    paddingVertical: 15,
    paddingHorizontal: 25,
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: '#FFFFFF',
  },
  submitBtn: {
    backgroundColor: '#252D72',
    borderColor: '#96B8EB',
    borderWidth: 4,
    borderRadius: 22,
    paddingHorizontal: 30,
    paddingVertical: 15,
    marginTop: 25,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 30,
  },
  questionText: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
    marginTop: 20,
  },
  linkText: {
    color: '#B3CBEF',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
    marginTop: 20,
  },
});
