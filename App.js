import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, FlatList, Linking, Alert,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import RadioGroup from 'react-native-radio-buttons-group';
import MapView, { Marker } from 'react-native-maps';
// Notification Screen
import NotificationScreen from './components/NotificationScreen';
// About WatchOut Screen
import AboutWatchOutScreen from './components/AboutWatchOutScreen';
//map
import OfflineCampusMap from './components/OfflineCampusMap';
//styles
import styles from './components/styles';
//styles1
import styles1 from './components/styles1.';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

//HomeScreen
const HomeScreen = ({ contacts }) => {
  const [isOn, setIsOn] = useState(false);
  const [message, setMessage] = useState('');
  const [sentMessages, setSentMessages] = useState([]);
  const [region, setRegion] = useState({
    latitude: 37.78825, // Default location
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Predefined emergency messages
  const emergencyMessages = [
    "Help! I'm in danger, need immediate assistance!",
    "I've witnessed an emergency, please send help!",
    "I'm feeling unsafe, please track my location.",
    "There is an emergency, contact campus security!"
  ];

  const sendMessage = (msg) => {
    const messageToSend = msg || message; // Either use predefined or typed message

    if (messageToSend && contacts.length > 0) {
      const contactPhone = contacts[1].phone; // Send to first contact for simplicity
      Linking.openURL(`sms:${contactPhone}?body=${messageToSend}`);
      setSentMessages([...sentMessages, messageToSend]);
      setMessage('');
    } else {
      Alert.alert('No contact available', 'Please add a contact to send a message.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Conditionally show the map based on the isOn state */}
      {isOn && (
        <MapView
          style={StyleSheet.absoluteFillObject} // Full background
          region={region}
          onRegionChangeComplete={(region) => setRegion(region)}
        >
          <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
        </MapView>
      )}

      {/* Content over the map */}
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to WatchOut</Text>

        <TouchableOpacity style={styles.toggleButton} onPress={() => setIsOn(!isOn)}>
          <Text style={styles.buttonText}>{isOn ? 'Turn Off' : 'Turn On'}</Text>
        </TouchableOpacity>

        <FlatList
          data={sentMessages}
          renderItem={({ item }) => <Text style={styles.sentMessage}>{item}</Text>}
          keyExtractor={(item, index) => index.toString()}
          style={{ flex: 1 }}
        />

        {/* Display emergency messages */}
        <Text style={styles.subtitle}>Campus Safety Emergency Messages:</Text>
        {emergencyMessages.map((msg, index) => (
          <TouchableOpacity key={index} style={styles.emergencyMessage} onPress={() => sendMessage(msg)}>
            <Text style={styles.emergencyText}>{msg}</Text>
          </TouchableOpacity>
        ))}

        <View style={styles1.messageContainer}>
          <TextInput
            style={styles1.input}
            placeholder="Type your message"
            value={message}
            onChangeText={(text) => setMessage(text)}
          />
          <TouchableOpacity style={styles1.sendButton} onPress={() => sendMessage()}>
            <Text style={styles1.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Contact List Screen
const ContactListScreen = () => {
  const [contacts, setContacts] = useState([
    { id: '1', name: 'Police', phone: '100' },
    { id: '2', name: 'Fire Department', phone: '101' },
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

// More Screen
const MoreScreen = ({ navigation }) => {
  const Option = [
    { id: '1', name: 'Profile', action: () => navigation.navigate('Profile') },
    { id: '2', name: 'About WatchOut', action: () => navigation.navigate('AboutWatchOut') },
    { id: '3', name: 'Settings', action: () => Alert.alert('Settings', 'Settings screen not implemented yet.') },
    { id: '4', name: 'Offline Campus Map', action: () => navigation.navigate('OfflineCampusMap')},
    { id: '5', name: 'Logout', action: () => navigation.replace('Signup') },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={Option}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.contactItem} onPress={item.action}>
            <Text style={styles.contactText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
// Profile Screen
const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const saveProfile = () => {
    Alert.alert('Profile Saved', `Name: ${name}, Email: ${email} , Phone Number:${contact}`);
  };

  // Function to handle image selection
  const selectImage = () => {
    launchImageLibrary({}, (response) => {
      if (response.assets && response.assets.length > 0) {
        setProfilePhoto(response.assets[0].uri);
      }
    });
  };

  // Function to handle image capture
  const takePhoto = () => {
    launchCamera({}, (response) => {
      if (response.assets && response.assets.length > 0) {
        setProfilePhoto(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <TouchableOpacity onPress={selectImage}>
        {profilePhoto ? (
          <Image source={{ uri: profilePhoto }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>Profile Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Your Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Your Phone Number"
        value={contact}
        onChangeText={(text) => setContact(text)}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.photoButton} onPress={selectImage}>
          <Text style={styles.buttonText}>Choose from Gallery</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
        <Text style={styles.saveButtonText}>Save Profile</Text>
      </TouchableOpacity>
    </View>
  );
};



// Tab Navigator for main app screens
const TabNavigator = ({ route }) => {
  const { contacts } = route.params || { contacts: [] };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Contacts') {
            iconName = 'call';
          } else if (route.name === 'Notifications') {
            iconName = 'notifications';
          } else if (route.name === 'More') {
            iconName = 'menu';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#3b5998',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home">
        {() => <HomeScreen contacts={contacts} />}
      </Tab.Screen>
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
 
  const login = () => {
    if (email === 'test@example.com' && password === 'password') {
      navigation.replace('Main', { contacts: [] });
    } else {
      Alert.alert('Login Failed', 'Invalid email or password');
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
      <TouchableOpacity style={styles.loginButton} onPress={login}>
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
  const [role, setRole] = useState('Student');
  const radioButtonsData = [
    { id: '1', label: 'Student', value: 'Student' },
    { id: '2', label: 'Security', value: 'Security' },
  ];

  const signup = () => {
    if (email && password && role) {
      navigation.replace('Main', { contacts: [] },role);
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
       <RadioGroup
        radioButtons={radioButtonsData}
        layout="row"
      />
      <TouchableOpacity style={styles.loginButton} onPress={signup}>
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
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="AboutWatchOut" component={AboutWatchOutScreen} />
        <Stack.Screen name="OfflineCampusMap" component={OfflineCampusMap} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}




