// src/components/UpcomingTaskList.tsx

import React from 'react';
import { useSelector } from 'react-redux';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import TaskItem from './TaskItem';
import { AppState } from '../redux/store';

const UpcomingTaskList: React.FC = () => {
  const tasks = useSelector((state: AppState) => state.tasks.taskList);

  const upcomingTasks = tasks.filter(
    (task) => !task.completed && new Date(task.deadline) > new Date()
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Upcoming Tasks</Text>
      <FlatList
        data={upcomingTasks}
        renderItem={({ item }) => <TaskItem task={item} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '40%',
    paddingHorizontal: 40,
    paddingVertical: 10,
    
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
    marginBottom: 50
  },
  separator: {
    height: 10,
  },
});

export default UpcomingTaskList;
