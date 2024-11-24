import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    // Basic validation
    if (!email || !password || !confirmPassword) {
      Alert.alert('Please fill in all fields');
    } else if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
    } else {
      Alert.alert('Signup successful!');
      // After successful signup, navigate to login or home screen
      navigation.navigate('LoginScreen');
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

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        autoCapitalize="none"
        onChangeText={setConfirmPassword}
        value={confirmPassword}
      />

      <TouchableOpacity style={styles.signupBtn} onPress={handleSignup}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.loginLink}>Login</Text>
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
  signupBtn: {
    width: '80%',
    backgroundColor: '#3b5998',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  loginText: {
    color: '#333',
  },
  loginLink: {
    color: '#3b5998',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default SignupScreen;
