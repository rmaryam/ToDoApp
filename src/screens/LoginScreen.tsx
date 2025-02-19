import React, {useState, memo, useCallback} from 'react';
import {View, TextInput, Button, Alert} from 'react-native';
import styles from '../styles';

interface LoginScreenProps {
    setIsLoggedIn: (value: boolean) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({setIsLoggedIn}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = useCallback(async () => {
        try{
            const response = await fetch('https://app.onestream.live/api/v2/account/email/authenticate', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email, password }),
            });
            if(response.ok){
                setIsLoggedIn(true);
            } else{
                Alert.alert('Login Failed');
            }
        } catch(error){
            Alert.alert('Error', 'Something went wrong!');
        }
    }, [email, password, setIsLoggedIn]);

    return (
        <View style={styles.centralizedContainer}>
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail}/>
            <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry/>
            <Button title="Login" onPress={handleLogin}/>
        </View>
    );
};

export default memo(LoginScreen);
