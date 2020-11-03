import React, { FunctionComponent } from 'react'
import { View, Text, Dimensions } from 'react-native'

const windowHeight = Dimensions.get('window').height

interface Props {}

const EmptyTodoList: FunctionComponent<Props> = () => {
  return (
    <View
      style={{
        height: windowHeight - 80,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>할 일 목록이 존재하지 않습니다.</Text>
      <Text>할 일을 추가해주세요.</Text>
    </View>
  )
}

export default EmptyTodoList
