import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';
import CheckIns from '~/pages/CheckIns';
import HelpOrders from '~/pages/HelpOrders';
import Order from '~/pages/Order';
import NewOrder from '~/pages/NewOrder';

export default (signed = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        LogIn: SignIn,
        App: createBottomTabNavigator(
          {
            CheckIns,
            ManageOrders: {
              screen: createStackNavigator(
                {
                  HelpOrders,
                  Order,
                  NewOrder,
                },
                {
                  defaultNavigationOptions: {
                    headerTransparent: true,
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                      marginBottom: 10,
                    },
                  },
                },
              ),
              navigationOptions: {
                tabBarVisible: true,
                tabBarLabel: 'Pedir ajuda',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="message" size={20} color={tintColor} />
                ),
              },
            },
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#000',
              inactiveTintColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        ),
      },
      {
        initialRouteName: signed === false ? 'LogIn' : 'App',
      },
    ),
  );
