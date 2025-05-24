import React,{useState, useEffect} from "react";
import {NavigationContainer} from '@react-navigation/native'
import AuthStack from "./src/navigation/AuthStack";
import MainTabNavigator from "./src/navigation/MainTabNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App(){
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading,setLoading]  = useState(true)

useEffect(()=>{
const checkAuth = async () =>{
  const token = await AsyncStorage.getItem('userToken')
  setIsAuthenticated(!!token)
  setLoading(false)
}
checkAuth()
},[])

const handleAuthSuccess = async () =>{
  await AsyncStorage.setItem('userToken','dummy-token');
  setIsAuthenticated(true)
}

if(loading) return null

return(
  <NavigationContainer>
    {isAuthenticated ? (
      <MainTabNavigator/>
    ):  
    <AuthStack onAuthSuccess={handleAuthSuccess}/>
    }
  </NavigationContainer>
)

}