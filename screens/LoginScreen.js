import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    if (email === '' || password === '') {
      Alert.alert("Please fill in both fields");
    } else {
      Alert.alert("Login successful!");
      // Navigate to another screen (e.g., Home Screen) after successful login
      navigation.navigate('HomeScreen');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>WatchOut</Text>
      <Text style={styles.logo1}>By Team Rocket</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        autoCapitalize="none"
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
          <Text style={styles.signupLink}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#3b5998',
  },
  logo1:{
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 8,
    color: '#333',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#3b5998',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signupText: {
    color: '#333',
  },
  signupLink: {
    color: '#3b5998',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default LoginScreen;
