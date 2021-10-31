import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DetailScreen from '../screens/detail_screen';

import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import MyTabs from './tabs';

const Stack = createSharedElementStackNavigator();

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName="Tabs"
            >
                <Stack.Screen name="Tabs" component={MyTabs} />
                <Stack.Screen name="Detail" component={DetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default AppNavigation;