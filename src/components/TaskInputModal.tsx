import React, { useState } from 'react';
import { View, Modal, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/actions/taskActions';
import FloatingActionButton from './FloatingActionButton';

const TaskInputModal: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const dispatch = useDispatch();
  const fadeAnim = useState(new Animated.Value(0))[0];

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      setTaskTitle('');
    });
  };

  const handleAddTask = () => {
    if (taskTitle) {
      dispatch(addTask(taskTitle));
      closeModal();
    }
  };

  return (
    <View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalView, { opacity: fadeAnim }]}>
            <Text style={styles.title}>Nouvelle Tâche</Text>
            <TextInput
              placeholder="Entrer le titre de la tâche"
              placeholderTextColor="#888"
              value={taskTitle}
              onChangeText={setTaskTitle}
              style={styles.textInput}
            />
            <TouchableOpacity
              style={[styles.addButton, { opacity: taskTitle ? 1 : 0.5 }]}
              onPress={handleAddTask}
              disabled={!taskTitle}>
              <Text style={styles.addButtonText}>Ajouter</Text>
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity onPress={closeModal} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Annuler</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <FloatingActionButton onPress={openModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalView: {
    width: '100%',
    borderRadius: 12,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  textInput: {
    width: '100%',
    backgroundColor: '#1c1c1c',
    color: '#FFF',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginBottom: 15,
  },
  addButtonText: {
    color: '#1c1c1c',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    position: 'absolute',
    bottom: 40,
  },
  cancelButtonText: {
    color: '#888',
    fontSize: 16,
  },
});

export default TaskInputModal;
