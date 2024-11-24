import React from 'react';
import { View, Image, TouchableOpacity, Linking, StyleSheet } from 'react-native';

const OfflineCampusMap= () => {
  const openLink = async () => {
    const url = 'https://www.google.co.in/maps/place/NIT+KURUKSHETRA/@29.9475546,76.8201345,17z/data=!3m1!4b1!4m6!3m5!1s0x390e3f422f5244e7:0x9c630c311d6349b8!8m2!3d29.94755!4d76.8227094!16zL20vMDZ3NmRk?entry=ttu&g_ep=EgoyMDI0MDkxMS4wIKXMDSoASAFQAw%3D%3D'; // Replace with your URL
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log(`Can't open URL: ${url}`);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openLink}>
        <Image
          source={require('../components/map.png')} // Replace with your image path
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 400,
    height: 400,
    resizeMode: 'contain', // You can adjust this as per your needs
  },
});

export default OfflineCampusMap;
