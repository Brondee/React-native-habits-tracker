import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import StatsScreen from './src/screens/StatsScreen';

import PlusSvg from './src/assets/img/plus-white.svg';
import HomeSvg from './src/assets/img/home-white.svg';
import ChartSvg from './src/assets/img/chart-white.svg';

import {Provider} from 'react-redux';
import {store} from './src/store/store';
import {useSelector, useDispatch} from 'react-redux';
import {openForm} from './src/store/addForm/addFormSlice';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNav = () => {
  const {isAddFormActive} = useSelector(state => state.addForm);
  const {isEditFormActive} = useSelector(state => state.editForm);
  dispatch = useDispatch();

  const openAddForm = () => {
    dispatch(openForm());
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarButton: props => (
          <TouchableOpacity {...props} activeOpacity={0.7} />
        ),
        tabBarStyle: [
          {
            borderTopWidth: 4,
            borderTopColor: '#96B8EB',
            borderWidth: 4,
            borderColor: '#96B8EB',
            width: 275,
            height: 73,
            position: 'absolute',
            left: '15%',
            backgroundColor: '#141C36',
            bottom: 15,
            borderRadius: 25,
            display: isAddFormActive || isEditFormActive ? 'none' : 'flex',
          },
        ],
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <HomeSvg width={28} height={28} />,
        }}
      />
      <Tab.Screen
        name="AddHabit"
        options={() => ({
          tabBarButton: props => <TouchableOpacity {...props} />,
          tabBarIcon: () => (
            <TouchableOpacity
              style={styles.plusContainer}
              activeOpacity={0.7}
              onPress={openAddForm}>
              <PlusSvg width={22} height={22} />
            </TouchableOpacity>
          ),
        })}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          tabBarIcon: () => <ChartSvg width={28} height={28} />,
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false, gestureEnabled: false}}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Tabs" component={TabNav} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  plusContainer: {
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    padding: 11,
    backgroundColor: '#4E60BE',
  },
});
