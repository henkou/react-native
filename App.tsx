import 'react-native-gesture-handler'
import React, { useState } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import LoginScreen from './src/screens/LoginScreen'
import MainScreen from './src/screens/MainScreen'
import { enableScreens } from 'react-native-screens'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'

enableScreens()
const AuthStack = createNativeStackNavigator()
const MainStack = createNativeStackNavigator()

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = () => {
    setIsLoggedIn(true)
  }

  const logout = () => {
    setIsLoggedIn(false)
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <MainStack.Navigator>
          <MainStack.Screen
            name="Main"
            options={{
              headerShown: false,
            }}
          >
            {(props) => <MainScreen logout={logout} {...props} />}
          </MainStack.Screen>
        </MainStack.Navigator>
      ) : (
        <AuthStack.Navigator>
          <AuthStack.Screen
            name="Login"
            // 뒤로 가기 필요 없을 때 사용 login 삭제
            options={{
              headerShown: false,
            }}
          >
            {(props) => <MainScreen logout={logout} {...props} />}
          </AuthStack.Screen>
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  )
}

export default App
