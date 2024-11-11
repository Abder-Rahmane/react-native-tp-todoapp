// src/screens/CompletedTasksScreen.tsx

import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Header from '../components/Header';
import CompletedTaskList from '../components/CompletedTaskList';
import { useNavigation } from '@react-navigation/native';



const CompletedTasksScreen: React.FC = () => {

    const navigation = useNavigation();

    const navigateBack = () => {
      navigation.goBack();
    };
    
  return (
    <SafeAreaView style={styles.container}>
      <Header 
        onIconPress={navigateBack}
        iconName="arrow-left-circle-outline"
        title="Completed Tasks"
      />  
      <CompletedTaskList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CompletedTasksScreen;
