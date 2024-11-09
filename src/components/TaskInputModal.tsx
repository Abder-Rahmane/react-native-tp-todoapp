// src/components/TaskInputModal.tsx
import React, { useState } from 'react';
import { View, Modal, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/actions/taskActions';
import FloatingActionButton from './FloatingActionButton';

const TaskInputModal: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const dispatch = useDispatch();

  const handleAddTask = () => {
    dispatch(addTask(taskTitle));
    setTaskTitle('');
    setModalVisible(false);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalView}>
          <TextInput
            placeholder="Enter task title"
            value={taskTitle}
            onChangeText={setTaskTitle}
            style={styles.textInput}
          />
          <Button title="Add Task" onPress={handleAddTask} />
        </View>
      </Modal>
      <FloatingActionButton onPress={() => setModalVisible(true)} />
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 20,
    padding: 10
  }
});

export default TaskInputModal;
