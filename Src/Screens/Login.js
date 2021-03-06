import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Button,TouchableOpacity,Image } from 'react-native';
import SnackBar from '../BasicComponents/SnackBar';
import BasicButton from '../BasicComponents/BaiscBtn';
import SignUpBtn from '../BasicComponents/SignUpBtn';
import app from '../Firebase/FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../Firebase/FirebaseConfig';

export default function Login({navigation}) {
    const [snackbarvisible,setSnackbarvisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState("");
    const [snackbartext,setSnackbartext] = useState("");
    const [snackbartype,setSnackbartype] = useState("");
    const [passwordVisibility,setPasswordVisibility] = useState(false);

    function toggle(){
        setPasswordVisibility(!passwordVisibility)
    }

    function displaySnackBar(type,text){
        setSnackbartext(text);
        setSnackbartype(type);
        setSnackbarvisible(true);
    }
    function hideSnackbar(){
        setSnackbarvisible(false);
    }
     //function to handle when login btn is clicked on
     async function handleLoginBtnClick() {
       
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async(userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log(user)
            await AsyncStorage.setItem("useremail",email)
            await AsyncStorage.setItem("userId",userCredential.user.uid)
            console.log("login clicked", email, password);
            navigation.navigate("Draw")
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);

           displaySnackBar("error",errorMessage);
        });
    }


    //function to handle when signup btn is clicked on
    function handleSignUpBtnClick() {
        console.log("signup clicked");
        navigation.navigate('SignUp');
    }

    //component rendering
    return (
        <>
        <ScrollView style={styles.container}>
            
            
            

            <Text style={styles.title}>Login</Text>
            <View style={styles.form}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                    style={styles.inputField}
                    keyboardType="email-address"
                    placeholder="Enter your registered email"
                    value={email}
                    onChangeText={(val) => setEmail(val)}
                />
                 <View style={styles.divider}></View>
                  <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.inputField}
                    secureTextEntry
                    placeholder="Enter password"
                    value={password}
                    onChangeText={(val) => setPassword(val)}
                />
              </View>
                    <View style={{position:'relative'}}>
                            <View >
                                <TextInput
                                style={styles.inputField}                    
                                secureTextEntry={passwordVisibility}
                                placeholder="Enter password"
                                value={password}
                                onChangeText={(password) => setPassword(password)}
                                />
                            </View>
                       
            </View>
              <BasicButton
                text="Login"
                onPress={handleLoginBtnClick}
              />

            {
                snackbarvisible?
                <SnackBar
                  isVisible = {snackbarvisible}
                  text = {snackbartext}
                  type = {snackbartype}
                  onClose = {hideSnackbar}
                ></SnackBar>
                :null
            }

             <SignUpBtn
                customStyle={styles.signup}
                text="Don???t have an account?"
                btnText="Sign up"
                onPress={handleSignUpBtnClick}
              />      
        </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 60,
        paddingHorizontal: 30,
    },
    title: {
        fontWeight: '500',
        fontSize: 20,
        letterSpacing: 0.1,
        color: '#2E2E2E',
    },
    form: {
        marginVertical: 35,
    },
    label: {
        fontSize: 16,
        lineHeight: 18,
        color: '#666666',
        marginBottom: 3,
    },

    inputField: {
        fontSize: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#BFBFBF',
        paddingVertical: 6,
    },

    divider: {
        paddingVertical: 12,
    },

    log: {
        textAlign: "center",
        marginVertical: 2,
    },

    signup: {
        marginTop: 40,
    }
    ,
    buttoncontainer: {
        backgroundColor: '#2B35E0',
        borderRadius: 8,
        padding: 10,
    },

    buttontext: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: "center",
    },
    button:{
       paddingLeft:340,
    },
});
