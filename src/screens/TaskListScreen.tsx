// src/screens/TaskListScreen.tsx

import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Header from '../components/Header';
import TaskList from '../components/TaskList';
import UpcomingTaskList from '../components/UpcomingTaskList';
import TaskInputModal from '../components/TaskInputModal';
import { useNavigation } from '@react-navigation/native';

const TaskListScreen: React.FC = () => {
  const navigation = useNavigation();

  const navigateToCompletedTasks = () => {
    navigation.navigate('CompletedTasks');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onIconPress={navigateToCompletedTasks} iconName="check-circle-outline" />
      <View style={styles.mainContent}>
        <TaskList />
        <UpcomingTaskList />
      </View>
      <TaskInputModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
  },
});

export default TaskListScreen;
