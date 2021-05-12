import React from 'react';
import { Text, View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useStyles } from './styles';
import { register } from './Services'

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
  login: {
    paddingTop: 60,
    marginBottom: 500
  }
});

const Register = (props) => {
  const navigation = props.navigation;

  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [password1, setPassword1] = React.useState('');
  const [password2, setPassword2] = React.useState('');

  function openLogin () {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  }

  async function registerUser () {
    if (password1 != password2) {
      Alert.alert(
        "Invalid",
        "Passwords must match",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
      return;
    }
    let user = {
      username: username,
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: password1
    };
    await register(user);
    navigation.reset({
      index: 0,
      routes: [{ name: 'TabView' }],
    });
  }

    return (
      <ScrollView>
      <View style={formStyles.form}>
        <Text style={[useStyles.titleText, formStyles.title]}>Register</Text>
        <View>
        <TextInput
          label="Email"
          value={email}
          onChangeText={email => setEmail(email)}
          style={formStyles.input}
        />
        <TextInput
          label="Username"
          value={username}
          onChangeText={username => setUsername(username)}
          style={formStyles.input}
        />
        <TextInput
          label="First Name"
          value={firstname}
          onChangeText={firstname => setFirstname(firstname)}
          style={formStyles.input}
        />
        <TextInput
          label="Last Name"
          value={lastname}
          onChangeText={lastname => setLastname(lastname)}
          style={formStyles.input}
        />
        <TextInput
          label="Password"
          value={password1}
          onChangeText={password1 => setPassword1(password1)}
          style={formStyles.input}
          secureTextEntry={true}
        />
        <TextInput
          label="Repeat Password"
          value={password2}
          onChangeText={password2 => setPassword2(password2)}
          style={formStyles.input}
          secureTextEntry={true}
        />
        </View>
        <View style={formStyles.submit}>
        <Button mode="contained" onPress={() => registerUser(email, username, password1, password2)} style={useStyles.buttonStyle}>
          Create Account
        </Button>
        </View>
        <Button mode="text" onPress={() => openLogin()} color="#bf5700" style={formStyles.login}>
          Log In
        </Button>
      </View>
      </ScrollView>
    );
  }

  export { Register };