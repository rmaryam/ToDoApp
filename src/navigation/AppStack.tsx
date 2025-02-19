import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AddTaskScreen from '../screens/AddTaskScreen';
import TaskDetailsScreen from '../screens/TaskDetailsScreen';
import AllTasksScreen from '../screens/AllTasksScreen';
import CompletedTasksScreen from '../screens/CompletedTasksScreen';
import IncompleteTasksScreen from '../screens/IncompleteTasksScreen';
import { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createMaterialTopTabNavigator<RootStackParamList>();

function TasksTab() {
    return(
        <Tab.Navigator>
            <Tab.Screen name="All" component={AllTasksScreen}/>
            <Tab.Screen name="Completed" component={CompletedTasksScreen}/>
            <Tab.Screen name="Incomplete" component={IncompleteTasksScreen}/>
        </Tab.Navigator>
    );
}

const AppStack: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName="Tasks">
            <Stack.Screen name="Tasks" component={TasksTab}/>
            <Stack.Screen name="AddTask" component={AddTaskScreen}/>
            <Stack.Screen name="TaskDetails" component={TaskDetailsScreen}/>
        </Stack.Navigator>
    );
};

export default AppStack;
