import { useNavigation } from '@react-navigation/native'
import React, { FunctionComponent } from 'react'
import {
  View,
  Text,
  Button,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

interface Props {
  login: any
}
const LoginScreen: FunctionComponent<Props> = ({ login }) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const navigation = useNavigation()

  const goToMainScreen = () => {
    navigation.navigate('Main')
  }

  const handleChangeEmail = (value: string) => {
    setEmail(value)
  }

  const handleChangePassword = (value: string) => {
    setPassword(value)
  }

  const handleSubmit = () => {
    if (!email || !password) {
      alert('아이디와 비밀번호를 입력해주세요.')
      return
    }
    if (email && password) {
      login()
      return
    }
  }
  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.wrapper}>
        <View style={styles.logo}>
          <Text style={styles.logoTitle}>TAMASTUDY</Text>
          <Text style={styles.logoSubTitle}>React Native Study</Text>
        </View>
        <View style={styles.form}>
          <TextInput
            style={[styles.defaultInput, styles.emailInput]}
            value={email}
            placeholder={'Input your Email...'}
            onChangeText={handleChangeEmail}
            autoCapitalize={'none'}
            autoCorrect={false}
          />
          <TextInput
            value={password}
            placeholder={'Input your Password...'}
            onChangeText={handleChangePassword}
            autoCapitalize={'none'}
            autoCorrect={false}
            secureTextEntry
            style={[styles.defaultInput, styles.passwordInput]}
          />
          <TouchableOpacity onPress={() => alert('clicked!')}>
            <Text style={{ color: 'white', textAlign: 'right' }}>
              For got your password?
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('clicked!')}>
            <Text style={{ color: 'white', textAlign: 'left' }}>
              Don`t have an account?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingLeft: 60,
    paddingRight: 60,
    backgroundColor: 'black',
  },
  // LOGO
  logo: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logoTitle: {
    textAlign: 'center',
    fontSize: 32,
    marginBottom: 10,
    marginLeft: 0,
    color: 'white',
    fontWeight: '700',
  },
  logoSubTitle: {
    fontSize: 17,
    marginLeft: -50,
    color: 'white',
  },
  // FORM
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  defaultInput: {
    padding: 8,
    borderWidth: 1,
    height: 40,
    borderColor: '#eaeaea',
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 15,
    marginBottom: 8,
  },
  emailInput: {},
  passwordInput: {},
  // buttons
  buttons: {
    flex: 1,
  },
  button: {
    marginBottom: 4,
    backgroundColor: 'red',
  },
  buttonText: {
    justifyContent: 'center',
    textAlign: 'center',
    borderColor: 'black',
    backgroundColor: 'red',
    color: 'white',
    padding: 15,
    fontWeight: '600',
  },
})

export default LoginScreen
