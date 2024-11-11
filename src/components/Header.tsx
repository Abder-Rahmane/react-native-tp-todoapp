// src/components/Header.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { AppState } from '../redux/store';
import moment from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface HeaderProps {
  onIconPress?: () => void;
  iconName?: string;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ onIconPress, iconName, title }) => {
  const tasks = useSelector((state: AppState) => state.tasks.taskList);
  const completedTasksCount = tasks.filter(task => task.completed).length;

  const formattedDay = moment().format('dddd');
  const formattedDate = moment().format('D');
  const formattedMonth = moment().format('MMM');

  const formatNumber = (number: number) => number < 10 ? `0${number}` : number.toString();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerTopRow}>
        {title ? (
          <Text style={styles.dateText}>
            <Text style={styles.boldText}>{title}</Text>
          </Text>
        ) : (
          <Text style={styles.dateText}>
            <Text style={styles.boldText}>{formattedDay}, </Text>
            <Text style={styles.greyText}>{formatNumber(parseInt(formattedDate))} {formattedMonth}</Text>
          </Text>
        )}
      {onIconPress && iconName ? (
        <TouchableOpacity onPress={onIconPress} style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={iconName}
            size={28}
            color="#2D2D2D"
          />
        </TouchableOpacity>
      ) : null}
      </View>
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
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 24,
    color: '#2D2D2D',
  },
  boldText: {
    fontWeight: '600',
  },
  greyText: {
    color: 'grey',
    fontWeight: '400',
  },
  iconContainer: {
    padding: 5,
  },
  taskInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  taskInfoText: {
    paddingTop: 5,
    fontSize: 16,
    color: 'grey',
    fontWeight:'300',
  },
  taskInfoNum: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Header;
