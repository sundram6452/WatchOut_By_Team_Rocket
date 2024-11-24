import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Picker } from 'react-native';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student'); // Default role is Student

  const signup = () => {
    if (email && password && role) {
      // Replace 'Main' and pass contacts and role
      navigation.replace('Main', { contacts: [], role });
    } else {
      Alert.alert('Signup Failed', 'Please fill in all fields');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WatchOut</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      {/* Role Selection */}
      <Text style={styles.label}>Select Role:</Text>
      <Picker
        selectedValue={role}
        style={styles.picker}
        onValueChange={(itemValue) => setRole(itemValue)}
      >
        <Picker.Item label="Student" value="Student" />
        <Picker.Item label="Security" value="Security" />
      </Picker>

      <TouchableOpacity style={styles.loginButton} onPress={signup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;
