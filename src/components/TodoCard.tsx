import React, { FunctionComponent } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import dayjs from 'dayjs'
import { AntDesign } from '@expo/vector-icons'
import relativeTime from 'dayjs/plugin/relativeTime'
import ko from 'dayjs/locale/ko'
import { ITodo } from '../screens/MainScreen'

dayjs.extend(relativeTime)
dayjs.locale(ko)

interface Props {
  id: string
  content: string
  completed: boolean
  createdAt: string
  onClickCompleteTodo: any
}

const TodoCard: FunctionComponent<Props> = ({
  id,
  content,
  completed,
  createdAt,
  onClickCompleteTodo,
}) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        flexDirection: 'row',
        marginLeft: 16,
        marginRight: 16,
      }}
    >
      <View
        style={{
          flex: 3,
          padding: 16,
        }}
      >
        <Text style={{ fontWeight: '900', fontSize: 24, marginBottom: 8 }}>
          {content}
        </Text>
        <Text>{dayjs(createdAt).fromNow()}</Text>
      </View>
      <TouchableOpacity
        onPress={onClickCompleteTodo({ id, completed })}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        {completed ? (
          <AntDesign name="checkcircle" size={24} color="black" />
        ) : (
          <AntDesign name="checkcircleo" size={24} color="black" />
        )}
      </TouchableOpacity>
    </View>
  )
}
export default TodoCard
