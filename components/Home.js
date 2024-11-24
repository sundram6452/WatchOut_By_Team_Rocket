import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Alert, Linking, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

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

  const sendMessage = () => {
    if (message && contacts.length > 0) {
      const contactPhone = contacts[1].phone; // Send to first contact for simplicity
      Linking.openURL(`sms:${contactPhone}?body=${message}`);
      setSentMessages([...sentMessages, message]);
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

        <View style={styles1.messageContainer}>
          <TextInput
            style={styles1.input}
            placeholder="Type your message"
            value={message}
            onChangeText={(text) => setMessage(text)}
          />
          <TouchableOpacity style={styles1.sendButton} onPress={sendMessage}>
            <Text style={styles1.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Add styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent to show the map
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  toggleButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  sentMessage: {
    padding: 10,
    fontSize: 16,
  },
});

const styles1 = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeScreen;
