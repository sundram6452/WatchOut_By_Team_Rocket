import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, FlatList, Linking, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import Geolocation from 'react-native-geolocation-service';  // For location

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Email and SMS confirmation placeholder function
const sendConfirmationEmail = (email) => {
  Alert.alert('Email Sent', `A confirmation email has been sent to ${email}`);
};

const sendSMSToContact = (phone, message) => {
  Alert.alert('SMS Sent', `A message was sent to ${phone}: "${message}"`);
};

// Home Screen
const HomeScreen = () => {
  const [isOn, setIsOn] = useState(false);
  const [location, setLocation] = useState(null);
  const [message, setMessage] = useState('');
  const [sentMessages, setSentMessages] = useState([]);

  const sendMessage = () => {
    if (message) {
      setSentMessages([...sentMessages, message]);
      setMessage('');
    }
  };

  const toggleOn = () => {
    setIsOn(!isOn);
    if (!isOn) {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`Lat: ${latitude}, Long: ${longitude}`);
        },
        (error) => {
          console.log(error);
          setLocation('Unable to retrieve location');
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } else {
      setLocation(null);
    }
  };

  useEffect(() => {
    if (isOn && location) {
      sendSMSToContact('100', `Emergency at location: ${location}`);
    }
  }, [location]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Watchout</Text>
      
      <TouchableOpacity style={styles.toggleButton} onPress={toggleOn}>
        <Text style={styles.buttonText}>{isOn ? 'Turn Off' : 'Turn On'}</Text>
      </TouchableOpacity>

      {location && <Text style={styles.locationText}>{location}</Text>}

      <View style={styles.messageContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message"
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={sentMessages}
        renderItem={({ item }) => <Text style={styles.sentMessage}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

// Contact List Screen
const ContactListScreen = () => {
  const [contacts, setContacts] = useState([
    { id: '1', name: 'Police', phone: '100' },
    { id: '2', name: 'Fire Department', phone: '101' },
    { id: '3', name: 'Ambulance', phone: '102' },
  ]);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');

  const addContact = () => {
    if (newContactName && newContactPhone) {
      const newContact = {
        id: (contacts.length + 1).toString(),
        name: newContactName,
        phone: newContactPhone,
      };
      setContacts([...contacts, newContact]);
      setNewContactName('');
      setNewContactPhone('');
    }
  };

  const makeCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.contactItem} onPress={() => makeCall(item.phone)}>
            <Text style={styles.contactText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.addContactContainer}>
        <TextInput
          style={styles.input}
          placeholder="Contact Name"
          value={newContactName}
          onChangeText={(text) => setNewContactName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Phone"
          value={newContactPhone}
          onChangeText={(text) => setNewContactPhone(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={addContact}>
          <Text style={styles.addButtonText}>Add Contact</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Notification Screen
const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <Text>No new notifications</Text>
    </View>
  );
};

// More Screen
const MoreScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Connection</Text>
      <Text>Profile</Text>
      <Text>Settings</Text>
    </View>
  );
};

// Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'md-home';
          } else if (route.name === 'Contacts') {
            iconName = 'md-call';
          } else if (route.name === 'Notifications') {
            iconName = 'md-notifications';
          } else if (route.name === 'More') {
            iconName = 'md-menu';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#3b5998',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Contacts" component={ContactListScreen} />
      <Tab.Screen name="Notifications" component={NotificationScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
};

// Login Screen
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      sendConfirmationEmail(email);  // Send confirmation email placeholder
      navigation.replace('Main');
    } else {
      Alert.alert('Error', 'Please enter valid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

// Signup Screen
const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if (email && password) {
      sendConfirmationEmail(email);  // Send confirmation email placeholder
      navigation.replace('Main');
    } else {
      Alert.alert('Error', 'Please fill all fields');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
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
      <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

// Stack Navigator to handle login/signup flow
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    width: '100%',
    marginBottom: 10,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: '#3b5998',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  linkText: {
    color: '#3b5998',
    marginTop: 20,
  },
  toggleButton: {
    backgroundColor: '#3b5998',
    padding: 15,
    borderRadius: 10,
  },
  locationText: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
  },
  messageContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  sendButton: {
    backgroundColor: '#3b5998',
    padding: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: 'white',
  },
  contactItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  addButton: {
    backgroundColor: '#3b5998',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});
