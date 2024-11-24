import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.message}>Welcome to Watchout</Text>
      <TouchableOpacity style={styles.toggleButton} onPress={() => setIsOn(!isOn)}>
        <Text style={styles.buttonText}>{isOn ? 'Turn Off' : 'Turn On'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const ContactListScreen = () => {
  const contacts = [
    { id: '1', name: 'Police', phone: '100' },
    { id: '2', name: 'Fire Department', phone: '101' },
    { id: '3', name: 'Ambulance', phone: '102' },
    { id: '4', name: 'Saumya', phone: '7895725200' },
    { id: '5', name: 'Sundram', phone: '9264205018' },
  ];

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
    </View>
  );
};

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <Text>No new notifications</Text>
    </View>
  );
};

const MoreScreen = () => {
  const option=[
    {id:'1',name:'Connection'},
    {id:'2',name:'Profile'},
    {id:'3',name:'Settings'},
    {id:'4',name:'Help'},
    {id:'4',name:'LogOut'},
  ];
  return (
    <View style={styles.container}>
        <FlatList
        data={option}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.contactItem}>
            <Text style={styles.contactText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'md-home';
            } else if (route.name === 'Contacts') {
              iconName = 'ios-call';
            } else if (route.name === 'Notifications') {
              iconName = 'ios-notifications';
            } else if (route.name === 'More') {
              iconName = 'ios-menu';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Contacts" component={ContactListScreen} />
        <Tab.Screen name="Notifications" component={NotificationScreen} />
        <Tab.Screen name="More" component={MoreScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    marginBottom:20,
    fontSize: 30,
  },
  toggleButton: {
    backgroundColor: 'tomato',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  contactItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactText: {
    fontSize: 18,
  },
});
