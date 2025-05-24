import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ProductStack from "./ProductStack";
import DashboardScreen from "../screens/Dashboard/DashboardScreen";


const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowIcon: false,  
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Products" component={ProductStack} />
    </Tab.Navigator>
  );
}
