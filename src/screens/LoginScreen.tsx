import React, {useState, memo} from 'react';
import {View, TextInput, Button, Alert, StyleSheet} from 'react-native';

interface LoginScreenProps {
    setIsLoggedIn: (value: boolean) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({setIsLoggedIn}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async () => {
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
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail}/>
            <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry/>
            <Button title="Login" onPress={handleLogin}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
});

export default memo(LoginScreen);
