import React, { useEffect, useState, useCallback } from 'react';
//import { Platform } from 'react-native';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { fetchTasks } from '../services/api';
import { RootStackParamList } from '../types';
import styles from '../styles';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

type IncompleteTasksScreenProps = NativeStackScreenProps<RootStackParamList, 'Incomplete'>;

const IncompleteTasksScreen: React.FC<IncompleteTasksScreenProps> = ({ navigation }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data.filter((task: Task) => !task.completed));
      } catch (error) {
        Alert.alert('Error', 'Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const navigateToAddTask = useCallback(() => navigation.navigate('AddTask'), [navigation]);
  const handleNavigate = useCallback((task: Task) => {
    navigation.navigate('TaskDetails', { task });
  }, [navigation]);

  if (loading) {return <ActivityIndicator size="large" color="blue" />;}

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleNavigate(item)}>
            <View style={styles.taskCard}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskStatus}>{item.completed ? '' : '❌ Incomplete'}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.fab} onPress={navigateToAddTask}/>
    </View>
  );
};

export default IncompleteTasksScreen;
