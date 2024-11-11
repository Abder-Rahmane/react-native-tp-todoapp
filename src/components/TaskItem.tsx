// src/components/TaskItem.tsx

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Modal,
  Vibration,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { toggleTask, deleteTask } from '../redux/actions/taskActions';
import { Task } from '../types/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
  task: Task;
}

const TaskItem: React.FC<Props> = ({ task }) => {
  const dispatch = useDispatch();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const detailScaleAnim = useRef(new Animated.Value(0)).current;

  const handleToggleTask = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    dispatch(toggleTask(task.id));
  };

  const handleDeleteTask = () => {
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      dispatch(deleteTask(task.id));
    });
  };

  const handleLongPressTask = () => {
    Vibration.vibrate(50);
    setDetailModalVisible(true);
  };

  useEffect(() => {
    if (detailModalVisible) {
      Animated.spring(detailScaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }).start();
    } else {
      detailScaleAnim.setValue(0);
    }
  }, [detailModalVisible]);

  return (
    <>
      <Animated.View style={[styles.container, { opacity: opacityAnim }]}>
        <TouchableOpacity
          style={styles.taskContent}
          onPress={handleToggleTask}
          onLongPress={handleLongPressTask}
        >
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <MaterialCommunityIcons
              name={
                task.completed
                  ? 'checkbox-marked-circle-outline'
                  : 'checkbox-blank-circle-outline'
              }
              size={25}
              color={task.completed ? '#000' : '#757575'}
            />
          </Animated.View>
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.taskText,
                task.completed && styles.completedText,
              ]}
            >
              {task.title}
            </Text>
            <Text
              style={[
                styles.priorityText,
                task.completed && styles.completedText,
              ]}
            >
              {`Priority ${task.priority}`}
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* Detail Modal */}
      <Modal
        visible={detailModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDetailModalVisible(false)}
      >
        <View style={styles.detailModalOverlay}>
          <Animated.View style={[styles.detailModalContent, { transform: [{ scale: detailScaleAnim }] }]}>
            <Text style={styles.detailTitle}>{task.title}</Text>
            <Text style={styles.detailDescription}>{task.description}</Text>
            <Text style={styles.detailDeadline}>Deadline: {task.deadline}</Text>
            <Text style={styles.detailPriority}>Priority: {task.priority}</Text>
            <TouchableOpacity onPress={() => setDetailModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            {task.completed && (
                <TouchableOpacity onPress={handleDeleteTask}>
                  <MaterialCommunityIcons
                    name="delete-outline"
                    size={24}
                    color="#757575"
                  />
                </TouchableOpacity>
              )}
          </Animated.View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
  },
  textContainer: {
    marginLeft: 20,
  },
  taskText: {
    fontSize: 14,
  },
  priorityText: {
    fontSize: 12,
    color: '#888',
    marginTop:3,
    textTransform:"uppercase"
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#9E9E9E',
  },
  detailModalOverlay: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailModalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailDescription: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  detailDeadline: {
    fontSize: 16,
    marginBottom: 10,
  },
  detailPriority: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TaskItem;
