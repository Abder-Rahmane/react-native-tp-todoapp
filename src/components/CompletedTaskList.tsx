// src/components/CompletedTaskList.tsx

import React from 'react';
import { useSelector } from 'react-redux';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import TaskItem from './TaskItem';
import { AppState } from '../redux/store';

const CompletedTaskList: React.FC = () => {
  const tasks = useSelector((state: AppState) => state.tasks.taskList);

  const completedTasks = tasks.filter((task) => task.completed);

  if (completedTasks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No completed tasks</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={completedTasks}
        renderItem={({ item }) => <TaskItem task={item} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 35,
    paddingTop: 10,
  },
  separator: {
    height: 10,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
});

export default CompletedTaskList;
