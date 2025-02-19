import React, {useState} from 'react';
import { View, TextInput, Button, Alert} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { addTask } from '../services/api';
import { RootStackParamList } from '../types';
import styles from '../styles';

type AddTaskScreenProps = NativeStackScreenProps<RootStackParamList, 'AddTask'>;

const AddTaskScreen: React.FC<AddTaskScreenProps> = ({navigation}) => {
    const [title, setTitle] = useState('');

    const handleAddTask = async () => {

        try {

            const newTask = {
                id: Math.floor(Math.random() * 1000) + 201,
                title,
                completed: false,
            };
            await addTask(title);
            Alert.alert('Success', 'Task added successfully');
            navigation.navigate('Tasks', {
                screen: 'All',
                params: {newTask},
            });
        } catch (error) {
            Alert.alert('Error', 'Failed to add task');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter Task Title"
                value={title}
                onChangeText={setTitle}
            />
            <Button title="Add Task" onPress={handleAddTask} disabled={!title.trim()}/>
        </View>
    );
};

export default AddTaskScreen;
