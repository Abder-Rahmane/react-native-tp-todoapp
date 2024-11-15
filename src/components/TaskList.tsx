// src/components/TaskList.tsx

import React from 'react';
import { useSelector } from 'react-redux';
import { FlatList, View, StyleSheet } from 'react-native';
import TaskItem from './TaskItem';
import { AppState } from '../redux/store';

const TaskList: React.FC = () => {
  const tasks = useSelector((state: AppState) => state.tasks.taskList);

  const activeTasks = tasks.filter(
    (task) =>
      (!task.completed && task.isVisible !== false && new Date(task.deadline).toDateString() === new Date().toDateString()) ||
      (task.completed && task.isVisible)
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={activeTasks}
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
    paddingHorizontal: 40,
  },
  separator: {
    height: 10,
  },
});

export default TaskList;
