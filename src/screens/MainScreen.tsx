import { HeaderTitle } from '@react-navigation/stack'
import React, { FunctionComponent, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import ja from 'dayjs/locale/ja'
import EmptyTodoList from '../components/EmptyTodoList'
import TodoCard from '../components/TodoCard'
import axios from 'axios'

dayjs.extend(relativeTime)
dayjs.locale(ja)

interface Props {
  logout: any
}

export interface ITodo {
  id: string
  body: string
  completed: boolean
  createdAt: string
  updateAt: string
}

const MainScreen: FunctionComponent<Props> = ({ logout }) => {
  const [todoList, setTodoList] = React.useState<ITodo[]>([] as ITodo[])
  const [body, setBody] = React.useState('')

  const handleChangeBody = (value: string) => {
    setBody(value)
  }

  const addTodo = async () => {
    try {
      if (!body) {
        return alert('할 일을 입력해주세요.')
      }
      const response = await axios.post(
        `http://tamastudy-todo-api.herokuapp.com/api/todo`,
        {
          body,
        }
      )
      setTodoList([...todoList, response.data.result])
      setBody('')
    } catch (e) {
      console.log(e)
    }
  }

  const onClickCompleteTodo = ({
    id,
    completed,
  }: {
    id: string
    completed: boolean
  }) => async () => {
    try {
      const response = await axios.patch(
        `https://tamastudy-todo-api.herokuapp.com/api/todo/${id}`,
        {
          completed: !completed,
        }
      )
      const newTodoList = todoList.map((todo) =>
        todo.id === id ? response.data.result : todo
      )
      setTodoList(newTodoList)
    } catch (e) {
      console.log(e)
    }
  }

  const getTodoList = async () => {
    try {
      const response = await axios.get(
        `https://tamastudy-todo-api.herokuapp.com/api/todo`
      )
      setTodoList(response.data.result)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getTodoList()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#606060' }}>
      <View style={styles.form}>
        <TextInput
          style={[styles.defaultInput]}
          value={body}
          onChangeText={handleChangeBody}
          placeholder={'할 일을 입력해주세요.'}
          autoCapitalize={'none'}
          autoCorrect={false}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 20,
            top: '50%',
            transform: [{ translateY: -16 }],
            backgroundColor: '#606060',
          }}
          onPress={addTodo}
        >
          <Text style={{ padding: 8, color: 'white' }}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.todoList}>
        <FlatList
          data={todoList}
          keyExtractor={({ id }) => String(id)}
          renderItem={({ item }) => (
            <TodoCard
              id={item.id}
              completed={item.completed}
              content={item.body}
              createdAt={item.createdAt}
              onClickCompleteTodo={onClickCompleteTodo}
            />
          )}
          ListEmptyComponent={() => <EmptyTodoList />}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
    padding: 0,
    backgroundColor: 'blue',
    position: 'relative',
  },
  defaultInput: {
    backgroundColor: 'white',
    height: 40,
    borderColor: 'black',
    padding: 10,
    paddingLeft: 30,
    color: 'black',
    fontSize: 20,
  },
  todoList: {
    padding: 8,
  },
})
export default MainScreen
