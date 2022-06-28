import React from 'react';
import TabBar from './TabBar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Load all components in for the navigation 
import { Home } from '../components/Home.js'
import { Map } from '../components/Map.js'
import { List } from '../components/List.js'
import { Settings } from '../components/Settings.js'
import { Form } from '../components/Form.js'

const Tab = createBottomTabNavigator ();

//Export for App.js and all navigation components
export function Navigation() {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} state={{...props.state, routes: props.state.routes.slice(0,4)}}/>}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="List" component={List} />
      <Tab.Screen name="Settings" component={Settings} />
      <Tab.Screen name="Form" component={Form} />
    </Tab.Navigator>
  );
}
