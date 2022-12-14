import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../firebase";
import { WebView } from 'react-native-webview';

const HomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigation.replace("Login");
      }
    });

    return unsubscribe;
  }, [auth.currentUser]);

  const user = auth.currentUser;

  return (
    <WebView source={{ uri: "https://www.myntra.com/" }} />
    // <View style={styles.container}>
    //   <Text>Email: {user.email}</Text>
    //   <Text>refreshToken: {user.refreshToken}</Text>
    //   <TouchableOpacity onPress={handleSignOut} style={styles.button}>
    //     <Text style={styles.buttonText}>Sign out</Text>
    //   </TouchableOpacity>
    // </View>
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
