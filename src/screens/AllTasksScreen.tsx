import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { fetchTasks } from '../services/api';
import { RootStackParamList } from '../types';

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

  if (loading) {return <ActivityIndicator size="large" color="blue" />;}

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('TaskDetails', { task: item })}>
            <View style={styles.taskCard}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskStatus}>{item.completed ? '✅ Completed' : '❌ Incomplete'}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddTask')}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  taskCard: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskStatus: {
    fontSize: 14,
    color: 'gray',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default AllTasksScreen;
