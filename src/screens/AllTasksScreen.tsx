import React, { useEffect, useState, useCallback } from 'react';
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

type AllTasksScreenProps = NativeStackScreenProps<RootStackParamList, 'All'>;

const AllTasksScreen: React.FC<AllTasksScreenProps> = ({ navigation, route }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        Alert.alert('Error', 'Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    if (route.params?.newTask) {
      console.log('task', route.params?.newTask);
      setTasks((prevTasks) => {
        const newTask = route?.params?.newTask;
        if (!newTask) {return prevTasks;}
        return [newTask, ...prevTasks];
      });
      navigation.setParams({ newTask: undefined });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params?.newTask]);

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
              <Text style={styles.taskStatus}>{item.completed ? '✅ Completed' : '❌ Incomplete'}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.fab} onPress={navigateToAddTask}/>
    </View>
  );
};

export default AllTasksScreen;
