import React from 'react';
import TabBar from './TabBar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from '../Home.js'
import { Map } from '../Map.js'
import { List } from '../List.js'
import { Settings } from '../Settings.js'

const Tab = createBottomTabNavigator ();

export function Navigation() {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="List" component={List} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
