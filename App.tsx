// src/App.tsx
import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import TaskList from './src/components/TaskList';
import Header from './src/components/Header';
import TaskInputModal from './src/components/TaskInputModal';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Header />
        <TaskList />
        <TaskInputModal />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});

export default App;
