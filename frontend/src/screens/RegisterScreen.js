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
import {useSignupMutation} from '../store/auth/authApiSlice';

import ModalCustom from '../components/shared/ModalCustom';
import {setModal, hideModal} from '../store/modalSlice';

import boilerPlateStyles from '../styles/boilerPlateStyles';

const RegisterScreen = () => {
  const navigation = useNavigation();
  dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [signup, {isLoading}] = useSignupMutation();

  const submit = async () => {
    if (!email || !password || !name) {
      dispatch(setModal({title: 'Fill in all the fields', type: 'error'}));
      setTimeout(() => {
        dispatch(hideModal());
      }, 1500);
    } else {
      const response = await signup({name, email, password});
      if (!response) {
        dispatch(setModal({title: 'No Server Response', type: 'error'}));
        setTimeout(() => {
          dispatch(hideModal());
        }, 1500);
      } else if (response.error) {
        const statusCode = response.error.data.statusCode;
        if (statusCode == 403) {
          dispatch(setModal({title: 'Сredentials are taken', type: 'error'}));
          setTimeout(() => {
            dispatch(hideModal());
          }, 1500);
          console.log('Сredentials are taken');
        } else {
          dispatch(setModal({title: 'Register Failed', type: 'error'}));
          setTimeout(() => {
            dispatch(hideModal());
          }, 1500);
          console.log('Register Failed');
        }
      } else {
        dispatch(setCredentials({...response.data, email}));
        setName('');
        setEmail('');
        setPassword('');
        navigation.navigate('Tabs');
      }
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
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
          source={require('../assets/img/registerImg.jpg')}
          style={styles.img}
        />
        <View style={boilerPlateStyles.wrap}>
          <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
              value={name}
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#DBDBDB"
              onChangeText={value => setName(value)}
            />
            <TextInput
              value={email}
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#DBDBDB"
              onChangeText={value => setEmail(value)}
            />
            <TextInput
              value={password}
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#DBDBDB"
              onChangeText={value => setPassword(value)}
              secureTextEntry={true}
            />
            <TouchableOpacity style={styles.submitBtn} onPress={submit}>
              <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.questionText}>Have an account? </Text>
              <TouchableOpacity onPress={navigateToLogin}>
                <Text style={styles.linkText}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <ModalCustom />
    </ScrollView>
  );
};

export default RegisterScreen;

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
    borderRadius: 22,
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
