import React from 'react';
import TabBar from './TabBar';
import { useTheme } from '../themes/themeProvider';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Load all components in for the navigation 
import { Home } from '../components/Home.js'
import { Map } from '../components/Map.js'
import { List } from '../components/List.js'
import { Settings } from '../components/Settings.js'
import { Form } from '../components/Form.js'
import { Edit } from '../components/Edit.js'

const Tab = createBottomTabNavigator ();

//Export for App.js and all navigation components
export function Navigation() {
  const {theme} = useTheme();
  
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} state={{...props.state, routes: props.state.routes.slice(0,4)}}/>}>
      <Tab.Screen 
        name="Home" 
        component={Home}
        options={{
          title: 'Hobby Reminder',
          headerStyle: {
            backgroundColor: theme.header.backgroundColor,
          },
          headerTintColor: theme.header.textColor,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />
      <Tab.Screen 
        name="Map" 
        component={Map}
        options={{
          title: 'Map',
          headerStyle: {
            backgroundColor: theme.header.backgroundColor,
          },
          headerTintColor: theme.header.textColor,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />
      <Tab.Screen 
        name="List" 
        component={List} 
        options={{
          title: 'Hotspot List',
          headerStyle: {
            backgroundColor: theme.header.backgroundColor,
          },
          headerTintColor: theme.header.textColor,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={Settings} 
        options={{
          title: 'Settings',
          headerStyle: {
            backgroundColor: theme.header.backgroundColor,
          },
          headerTintColor: theme.header.textColor,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen 
        name="Form" 
        component={Form} 
        options={{
          title: 'Add New Note',
          headerStyle: {
            backgroundColor: theme.header.backgroundColor,
          },
          headerTintColor: theme.header.textColor,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen 
        name="Edit" 
        component={Edit} 
        options={{
          title: 'Edit A Note',
          headerStyle: {
            backgroundColor: theme.header.backgroundColor,
          },
          headerTintColor: theme.header.textColor,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Tab.Navigator>
  );
}
