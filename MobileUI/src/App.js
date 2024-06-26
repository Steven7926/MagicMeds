import React, { useState,  useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import MainUIPage from './pages/MainUIPage';
import LoadingPage from './pages/LoadingPage';
import { NativeRouter, Route, Switch, Redirect, useHistory } from "react-router-native";
import { StyleSheet, Text, View, TextInput, Modal, TouchableOpacity, Picker, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';



function App() {

    const [isLoading, setIsLoading] = useState(true);
    const [usersData, setUserData] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user_data').then((udata) => {
            setIsLoading(false);
            if (udata != null) {
                setUserData(udata)
                AsyncStorage.setItem('user_logged', "1");
            }
            else 
                setUserData(null)
        });
    }, [])
   

    if (isLoading) {
        return (
            <LoadingPage/>
        );
    }
    else {
        if (usersData == null) {
            return (
                <NativeRouter >
                    <Switch>
                        <Route exact path="/" >
                            <LoginPage />
                        </Route>
                        <Route exact path="/pillmastermain" >
                            <MainUIPage />
                        </Route>
                        <Redirect to="/" />
                    </Switch>
                </NativeRouter>
            );
        }
        else {
            return (                    
                <NativeRouter >
                    <Switch>
                        <Route exact path="/" >
                            <MainUIPage />
                        </Route>
                        <Route exact path="/pillmastermain" >
                            <LoginPage />
                        </Route>
                        <Redirect to="/pillmastermain" />
                    </Switch>
                </NativeRouter>
            );
        }
    }
}
export default App;