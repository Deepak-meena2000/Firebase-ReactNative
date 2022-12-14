import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../firebase";
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const navigation = useNavigation();
  const user = auth.currentUser;
  // console.log("userobjkeys", Object.keys(user));

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('firebase_uid', value)
    } catch (e) {
      // saving error
      console.log("asyncstorage error", error.message);
    }
  }

  useEffect(() => {
    // store uid in async storage
    storeData(user.uid);
  }, [])

  const handleUserLogout = () => {
    navigation.replace("Login");
    // remove uid from async storage
    AsyncStorage.removeItem('firebase_uid');
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        handleUserLogout();
      }
    });

    return unsubscribe;
  }, [auth.currentUser]);

  return (
    // <WebView source={{ uri: "https://www.myntra.com/" }} />
    <View style={styles.container}>
      <Text>Email: {user.email}</Text>
      <Text>Uid: {[user.uid, typeof(user.uid)]}</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
