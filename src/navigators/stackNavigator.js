import React from 'react';
import {View, StyleSheet} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Screen from '@screens'
const StackNavigator = () => {

    const Stack=createStackNavigator()

    const _addScreen=(name)=> {
        return (
            <Stack.Screen
                name={name}
                component={Screen[name]}
            />)
    }
    return (
            <Stack.Navigator>
                {_addScreen('SplashScreen')}
                {_addScreen('Quiz')}
                {_addScreen('Result')}
            </Stack.Navigator>
    );
}

const styles = StyleSheet.create({})

export default StackNavigator;
