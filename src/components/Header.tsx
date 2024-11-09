// src/components/Header.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { AppState } from '../redux/store';
import moment from 'moment';

const Header: React.FC = () => {
  const tasks = useSelector((state: AppState) => state.tasks.taskList);
  const completedTasksCount = tasks.filter(task => task.completed).length;

  const formattedDay = moment().format('dddd'); 
  const formattedDate = moment().format('D'); 
  const formattedMonth = moment().format('MMM'); 

  const formatNumber = (number: number) => number < 10 ? `0${number}` : number.toString();

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.dateText}>
        <Text style={styles.boldText}>{formattedDay}, </Text>
        <Text style={styles.greyText}>{formatNumber(parseInt(formattedDate))} {formattedMonth}</Text>
      </Text>
      <View style={styles.taskInfoContainer}>
        <View>
          <Text style={styles.taskInfoNum}>{formatNumber(tasks.length)}</Text>
          <Text style={styles.taskInfoText}>Created tasks</Text>
        </View>
        <View>
          <Text style={styles.taskInfoNum}>{formatNumber(completedTasksCount)}</Text>
          <Text style={styles.taskInfoText}>Completed tasks</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 40,
  },
  dateText: {
    fontSize: 24,
    color: '#2D2D2D'
  },
  boldText: {
    fontWeight: '600'
  },
  greyText: {
    color: 'grey',
    fontWeight: '400'
  },
  taskInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50
  },
  taskInfoText: {
    paddingTop: 5,
    fontSize: 16,
    color: 'grey',
    fontWeight:'300'
  },
  taskInfoNum: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  }
});

export default Header;
