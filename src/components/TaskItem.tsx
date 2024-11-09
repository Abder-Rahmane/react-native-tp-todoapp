import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useDispatch } from 'react-redux';
import { toggleTask, deleteTask } from '../redux/actions/taskActions';
import { Task } from '../types/types';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
  task: Task;
}

const TaskItem: React.FC<Props> = ({ task }) => {
  const dispatch = useDispatch();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleToggleTask = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.2, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();

    dispatch(toggleTask(task.id));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.taskContent} onPress={handleToggleTask}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Icon
            name={task.completed ? 'check-circle' : 'circle-o'}
            size={30}
            color={task.completed ? 'black' : 'gray'}
          />
        </Animated.View>
        <Text style={[styles.taskText, {
          color: task.completed ? 'gray' : 'black',
          fontWeight: task.completed ? '400' : '500',
        }]}>
          {task.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => dispatch(deleteTask(task.id))}>
        {task.completed && <Icon name="trash-o" size={24} color="grey" />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
  },
  taskText: {
    marginLeft: 30,
    fontSize: 18,
  },
});

export default TaskItem;
