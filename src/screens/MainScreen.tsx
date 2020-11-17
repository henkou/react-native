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
import LoadingComponent from '../components/LoadingComponent'
dayjs.extend(relativeTime)
dayjs.locale(ja)

interface Props {
  logout: any
}

export interface ITodo {
  id: string
  body: string
  completed: boolean
  createdAt: Date
  updateAt: Date
}

const MainScreen: FunctionComponent<Props> = ({ logout }) => {
  const [todoList, setTodoList] = React.useState<ITodo[]>([] as ITodo[])
  const [body, setBody] = React.useState('')
  const [getListLoading, setGetListLoading] = React.useState(false)
  const [addLoading, setAddLoading] = React.useState(false)
  const [editLoading, setEditLoading] = React.useState(false)
  const [deleteLoading, setDeleteLoading] = React.useState(false)

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
      setAddLoading(false)
      setTodoList([response.data.result, ...todoList])
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
        //todo.id === id ? response.data.result : todo
        todo.id === id ? response.data.result : todo
      )
      setTodoList(newTodoList)
      setEditLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  const editTodo = async ({
    id,
    body,
    completed,
  }: {
    id: string
    body: string
    completed: boolean
  }) => {
    setEditLoading(true)
    try {
      const response = await axios.patch(
        `https://tamastudy-todo-api.herokuapp.com/api/todo/${id}`,
        {
          body,
          completed,
        }
      )
      const newTodoList = todoList.map((todo: ITodo) =>
        todo.id === id ? response.data.result : todo
      )
      setTodoList(newTodoList)
      setEditLoading(false)
    } catch (e) {
      setEditLoading(false)
      console.log(e)
    }
  }

  const onClickDeleteButton = (id: string) => async () => {
    setDeleteLoading(true)
    try {
      const response = await axios.delete(
        `https://tamastudy-todo-api.herokuapp.com/api/todo/${id}`
      )
      const newTodoList = todoList.filter((todo: ITodo) => todo.id !== id)
      setTodoList(newTodoList)
      setDeleteLoading(false)
    } catch (e) {
      setDeleteLoading(false)
      console.log(e)
    }
  }

  const getTodoList = async () => {
    setGetListLoading(true)
    try {
      const response = await axios.get(
        `https://tamastudy-todo-api.herokuapp.com/api/todo`
      )
      setTodoList(response.data.result)
      setGetListLoading(false)
    } catch (e) {
      setGetListLoading(false)
      console.log(e)
    }
  }

  useEffect(() => {
    getTodoList()
  }, [])

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.addForm}>
        <TextInput
          placeholder={'할 일을 입력해주세요. '}
          value={body}
          onChangeText={handleChangeBody}
          autoCorrect={false}
          autoCapitalize={'none'}
          style={[styles.defaultInput, styles.contentInput]}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addText}>
            {addLoading ? <LoadingComponent color={'#FFF'} /> : 'Add'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
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
              editTodo={editTodo}
              editLoading={editLoading}
              deleteLoading={deleteLoading}
              onClickDeleteButton={onClickDeleteButton}
            />
          )}
          ListEmptyComponent={() => <EmptyTodoList />}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#606060' },
  defaultInput: {
    backgroundColor: '#fff',
    borderColor: '#eaeaea',
    borderWidth: 1,
    fontSize: 20,
    color: '#000',
    padding: 16,
    height: 100,
  },
  contentInput: {
    flex: 1,
    marginRight: 'auto',
  },
  addForm: {
    marginTop: Platform.OS === 'android' ? 30 : 0,
    flexDirection: 'row',
    height: 100,
  },
  addButton: {
    backgroundColor: 'green',
    justifyContent: 'center',
    padding: 32,
  },
  addText: {
    color: 'white',
  },
  content: { marginBottom: 64 },
})

export default MainScreen
