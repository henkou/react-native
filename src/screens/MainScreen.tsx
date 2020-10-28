import React, { FunctionComponent } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

interface Props {
  logout: any
}
const MainScreen: FunctionComponent<Props> = ({ logout }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.todo}>
        <TextInput placeholder={'할 일을 입력해주세요.'} />
      </View>
      <View style={styles.list}>
        <Text>ok</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
})
export default MainScreen
