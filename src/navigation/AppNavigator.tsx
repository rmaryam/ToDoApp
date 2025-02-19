import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { useState } from 'react';


const AppNavigator = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return(
        <NavigationContainer>
            {isLoggedIn ? <AppStack/> : <AuthStack setIsLoggedIn={setIsLoggedIn}/>}
        </NavigationContainer>
    );
};

export default AppNavigator;
