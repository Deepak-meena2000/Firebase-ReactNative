import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../firebase";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';


const API_KEY = "AIzaSyBOcDysjLEGH0ylbx2D47FUO95RmD1nbqs";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('firebase_uid');
      console.log("fbuid", value);
      // if(value !== null) {
      //   // value previously stored
      // }
      return value;
    } catch(e) {
      // error reading value
      console.log("asyncstorage error", e.message);
    }
  }

  useEffect(() => {
    // check async storage
    // if uid then gen token
    // login with token
    getData()
      .then((uid) => {
        console.log("uid in useeffect", uid);
      })
      .catch((error) => {
        console.log("error in useeffect", error.message)
      })
    
    // otherwise email pwd login
  }, [])

  const handleUserLogin = () => {
    navigation.replace("Home");
    // store uid in async storage
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        handleUserLogin();
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = async () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
      })
      .catch((error) => console.log(error.message));
  };

  const handleLogin = async () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
      })
      .catch((error) => console.log(error.message));
    // try {
    //   const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    //   const response = await axios.post(url, {
    //     email: email,
    //     password: password,
    //     returnSecureToken: true,
    //   });
    //   const token = response.data.idToken;
    //   console.log("****TOKEN****", token);
    //   const user = await auth.signInWithCustomToken(token);
    //   console.log("******USER*****", user);
    // } catch (error) {
    //   console.log("error:", error);
    // }
  };

  return (
    <SafeAreaView style={styles.container} >
      <Image 
        source={{
          uri: "https://www.tmrw.in/wp-content/uploads/2022/11/TMRW_Logo-1-2.gif",
        }}
        style={styles.image}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: '100%',
    backgroundColor: '#65696c',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "#e6e8e9",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "#e6e8e9",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
