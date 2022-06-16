import React from 'react';
import TabBar from './TabBar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from '../Home.js'
import { Map } from '../Map.js'
import { List } from '../List.js'
import { Settings } from '../Settings.js'
import { Form } from '../Form.js'

const Tab = createBottomTabNavigator ();

export function Navigation() {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} state={{...props.state, routes: props.state.routes.slice(0,4)}}/>}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="List" component={List} />
      <Tab.Screen name="Settings" component={Settings} />
      <Tab.Screen name="Add note" component={Form} />
    </Tab.Navigator>
  );
}
