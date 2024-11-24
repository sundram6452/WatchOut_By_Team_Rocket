import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
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
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color:'#3b5998',
    },
    input: {
      borderColor: '#ccc',
      borderWidth: 1,
      padding: 10,
      width: '100%',
      marginBottom: 15,
      borderRadius: 5,
    },
    loginButton: {
      backgroundColor: '#3b5998',
      padding: 15,
      borderRadius: 5,
      width: '100%',
      alignItems: 'center',
      marginVertical:10,
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
      marginBottom: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
    },
    messageContainer: {
      position: 'absolute',
      bottom: 10,
      left: 10,
      right: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    sendButton: {
      backgroundColor: '#3b5998',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 5,
    },
    sendButtonText: {
      color: 'white',
      fontSize: 16,
    },
    sentMessage: {
      marginVertical: 5,
      padding: 10,
      backgroundColor: '#e6e6e6',
      borderRadius: 5,
      alignSelf: 'flex-start',
    },
    contactItem: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    contactText: {
      fontSize: 18,
    },
    addContactContainer: {
      marginTop: 20,
      width: '100%',
    },
    addButton: {
      backgroundColor: '#3b5998',
      padding: 10,
      marginTop: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    addButtonText: {
      color: 'white',
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 20,
    },
    placeholderImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: '#ddd',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    placeholderText: {
      color: '#888',
    },
    buttonContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    photoButton: {
      backgroundColor: '#3b5998',
      padding: 10,
      borderRadius: 5,
      marginHorizontal: 5,
    },
    saveButton: {
      backgroundColor: '#3b5998',
      padding: 15,
      borderRadius: 5,
      width: '100%',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
    },
    saveButtonText: {
      color: 'white',
      fontSize: 16,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
    },
    emergencyMessage: {
      backgroundColor: 'rgba(59,89,152,0.5)',
      padding: 10,
      borderRadius: 10,
      marginVertical: 5,
    },
    emergencyText: {
      fontSize: 16,
      color: '#000',
    },
  });
export default styles;