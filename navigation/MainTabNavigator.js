
import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LinksScreen from '../screens/LinksScreen';
import UpdatePostScreen from '../screens/UpdatePostScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Detail: DetailScreen,
  UpdatePost: UpdatePostScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Màn hình chính',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: LinksScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Thêm bài viết',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const StudysStack = createStackNavigator({
  Study: SettingsScreen,
});

StudysStack.navigationOptions = {
  tabBarLabel: 'Study',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};
export default createBottomTabNavigator({
  HomeStack,
  SettingsStack,
  StudysStack
});