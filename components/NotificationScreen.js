import React from "react";
import { StyleSheet,View,Text } from "react-native";
// Notification Screen
export default function NotificationScreen(){
    return (
      <View style={styles.container}>
        <Text>No new notifications</Text>
      </View>
    );
  };
  const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
  })
  

  