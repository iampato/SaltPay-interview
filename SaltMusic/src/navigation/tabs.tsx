import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavouriteScreen from "../screens/favourite_screen";
import MdIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from "../screens/home_screen";

const Tab = createBottomTabNavigator();

function MyTabs(props: any) {
  const { navigation } = props
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = 'home';
          } else {
            iconName = 'bookmark';
          }
          return <MdIcons name={iconName} size={size} color={color} />;
        },
        "tabBarActiveTintColor": "#fff",
        "tabBarInactiveTintColor": "#8c8c8c",
        "tabBarActiveBackgroundColor": "#000000",
        "tabBarInactiveBackgroundColor": "#000000",
        "tabBarStyle": [
          {
            "display": "flex"
          },
          null
        ]
      })}
    >
      <Tab.Screen
        name="Home"
        children={() => <HomeScreen
          props={{
            navigation: navigation
          }}
        />}
      />
      <Tab.Screen
        name="Favourite"
        children={() => <FavouriteScreen
          props={{
            navigation: navigation
          }}
        />}
      />

    </Tab.Navigator >
  );
}
export default MyTabs;