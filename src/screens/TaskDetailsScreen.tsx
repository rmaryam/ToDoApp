import React, {useState} from 'react';
import { View, TextInput, Text, Switch, Button, Alert, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { updateTask, deleteTask } from '../services/api';

type TaskDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'TaskDetails'>;

const TaskDetailsScreen: React.FC<TaskDetailsScreenProps> = ({route, navigation}) => {
    const {task} = route.params;
    const [title, setTitle] = useState(task.title);
    const [isCompleted, setIsCompleted] = useState(task.completed);
    const [isSaving, setIsSaving] = useState(false);

    const handleUpdateTitle = async () => {
        if(!title.trim()){
            Alert.alert('Error', 'Title cannot be empty');
            return;
        }

        try {
            setIsSaving(true);
            await updateTask(task.id, {title}, isCompleted);
            Alert.alert('Success', 'Task Updated Successfully');
        } catch (error) {
            Alert.alert('Error', 'Failed to Update Task');
        } finally{
            setIsSaving(false);
        }
    };

    const handleToggleStatus = async () => {
        try {
            await updateTask(task.id, {title} , {completed: !isCompleted});
            setIsCompleted(!isCompleted);
        } catch (error) {
            Alert.alert('Error', 'Failed to update task');
        }
    };

    const handleDeleteTask = async () => {
        try {
            await deleteTask(task.id);
            Alert.alert('Success', 'Task deleted successfully');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to delete task');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Task Title:</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter Task Title"
            />
            <Button title="Save Title" onPress={handleUpdateTitle} disabled={isSaving || !title.trim()} />

            <View style={styles.row}>
                <Text>Status: {isCompleted ? 'Completed' : 'Incomplete'}</Text>
                <Switch value={isCompleted} onValueChange={handleToggleStatus}/>
            </View>

            <Button title="Delete Task" onPress={handleDeleteTask}/>

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
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 20,
    },
});

export default TaskDetailsScreen;
