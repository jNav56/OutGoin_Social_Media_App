import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useStyles } from './styles';
import { authenticate } from './Services';

const formStyles = StyleSheet.create({
  form: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 120,
  },
  title: {
    textAlign: 'center',
    paddingBottom: 40
  },
  submit: {
    paddingTop: 20
  },
  input: {
    marginBottom: 20
  },
  register: {
    paddingTop: 60
  }
});

const Login = (props) => {
  const navigation = props.navigation;
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  async function loginUser (username, password) {
    console.log("Logging In User: ", username);
    const result = await authenticate({"username": username, "password": password});
    console.log("Logged In User: ", username);
    console.log("hi", result);
    if (result) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'TabView' }],
      });
    }
  }

  function openRegistration () {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Register' }],
    });
  }

  return (
    <View style={formStyles.form}>
      <Text style={[useStyles.titleText, formStyles.title]}>Login</Text>
      <View>
      <TextInput
        label="Username"
        value={username}
        onChangeText={username => setUsername(username)}
        style={formStyles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={password => setPassword(password)}
        style={formStyles.input}
        secureTextEntry={true}
      />
      </View>
      <View style={formStyles.submit}>
      <Button mode="contained" onPress={() => loginUser(username, password)} style={useStyles.buttonStyle}>
        Login
      </Button>
      </View>
      <Button mode="text" onPress={() => openRegistration()} color="#bf5700" style={formStyles.register}>
        Register
      </Button>
    </View>
  );
}

  export { Login };