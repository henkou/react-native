import { AntDesign } from '@expo/vector-icons'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { View, Text, Easing, Animated, StyleSheet } from 'react-native'

interface Props {
  color?: string
}

const LoadingComponent: FunctionComponent<Props> = ({ color = 'black' }) => {
  const [rotateAnim, setRotateAnim] = useState(new Animated.Value(0))

  const startAnimation = () => {
    rotateAnim.setValue(0)
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      startAnimation()
    })
  }

  const RotateData = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  useEffect(() => {
    startAnimation()
  }, [])

  return (
    <Animated.View
      style={{
        transform: [
          {
            rotate: RotateData,
          },
        ],
      }}
    >
      <AntDesign name="loading1" size={24} color={color} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({})

export default LoadingComponent
