import { StyleSheet } from 'react-native';
const styles1 = StyleSheet.create({
    messageContainer: {
      flexDirection: 'row', // Align items in a row
      alignItems: 'center', // Center items vertically
      marginVertical: 10,
      padding: 10,
    },
    input: {
      flex: 1, // Takes up remaining space
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginRight: 10, // Add some space between input and button
    },
    sendButton: {
      backgroundColor: '#3b5998',
      paddingVertical: 10,
      paddingHorizontal: 18,
      borderRadius: 5,
    },
    sendButtonText: {
      color: '#fff',
      fontSize: 16,
    },
  });
  export default styles1;