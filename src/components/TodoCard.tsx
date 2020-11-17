import React, { FunctionComponent } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet,
} from 'react-native'
import dayjs from 'dayjs'
import { AntDesign } from '@expo/vector-icons'
import relativeTime from 'dayjs/plugin/relativeTime'
import ko from 'dayjs/locale/ko'
import { ITodo } from '../screens/MainScreen'
import Swipeout from 'react-native-swipeout'
import { TextInput } from 'react-native-gesture-handler'
import LoadingComponent from './LoadingComponent'
dayjs.extend(relativeTime)
dayjs.locale(ko)

interface Props {
  id: string
  content: string
  completed: boolean
  createdAt: Date
  onClickCompleteTodo: any
  editTodo: any
  onClickDeleteButton: any
  editLoading: boolean
  deleteLoading: boolean
}

const TodoCard: FunctionComponent<Props> = ({
  id,
  content,
  completed,
  createdAt,
  onClickCompleteTodo,
  editTodo,
  onClickDeleteButton,
  editLoading,
  deleteLoading,
}) => {
  const [editMode, setEditMode] = React.useState(false)
  const [editBody, setEditBody] = React.useState(content)

  const handleChangeEditBody = (value: String) => {
    setEditBody(value)
  }

  const onClickEdit = async () => {
    await editTodo({ id, body: editBody, completed })
    setEditMode(false)
  }

  const swipeoutButtons = [
    {
      text: 'Edit',
      backgroundColor: 'green',
      component: (
        <View style={styles.swipeoutButtonComponent}>
          <AntDesign name="edit" size={24} color="white" />
          <Text style={styles.swipeoutButtonComponentText}>Edit</Text>
        </View>
      ),
      onPress: () => setEditMode(true),
    },
    {
      text: 'Delete',
      backgroundColor: 'red',
      component: (
        <View style={styles.swipeoutButtonComponent}>
          <AntDesign name="delete" size={24} color="white" />
          <Text style={styles.swipeoutButtonComponentText}>Delete</Text>
        </View>
      ),
      onPress: () => onClickDeleteButton(id),
    },
  ]

  if (editMode) {
    return (
      <View style={styles.editModeWrapper}>
        <View style={styles.editModeForm}>
          <TextInput
            style={styles.editModeInput}
            value={editBody}
            onChangeText={handleChangeEditBody}
          />
        </View>
        <TouchableOpacity onPress={onClickEdit} style={styles.editModeButton}>
          {editLoading ? (
            <LoadingComponent />
          ) : (
            <AntDesign name="edit" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <Swipeout autoClose right={swipeoutButtons} style={styles.swipeout}>
      <View style={styles.wrapper}>
        <View style={styles.contents}>
          <Text style={styles.body}>{content}</Text>
          <Text>{dayjs(createdAt).fromNow()}</Text>
        </View>
        <TouchableOpacity
          onPress={onClickCompleteTodo({ id, completed })}
          style={styles.completeButton}
        >
          {completed ? (
            <AntDesign name="checkcircle" size={24} color="black" />
          ) : (
            <AntDesign name="checkcircleo" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
    </Swipeout>
  )
}
const styles = StyleSheet.create({
  swipeoutButtonComponent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeoutButtonComponentText: { color: 'white', marginTop: 4 },
  // edit mode
  editModeWrapper: {
    marginTop: 16,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  editModeForm: { flex: 1, marginRight: 'auto', padding: 16 },
  editModeInput: {
    padding: 16,
    borderWidth: 1,
    borderColor: 'black',
  },
  editModeButton: { padding: 16, marginRight: 8 },
  // Card
  swipeout: { marginTop: 16 },
  wrapper: {
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  contents: { flex: 3, padding: 16 },
  body: { fontWeight: '900', fontSize: 24, marginBottom: 8 },
  completeButton: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})
export default TodoCard
