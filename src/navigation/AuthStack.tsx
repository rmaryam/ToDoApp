import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';

interface AuthStackProps {
    setIsLoggedIn: (value: boolean) => void;
}

const Stack = createNativeStackNavigator();

const AuthStack: React.FC<AuthStackProps> = ({setIsLoggedIn}) => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login">
                {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn}/>}

            </Stack.Screen>

        </Stack.Navigator>
    );
};

export default AuthStack;
