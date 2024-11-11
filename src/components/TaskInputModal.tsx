import React, { useState } from 'react';
import {
  View,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/actions/taskActions';
import FloatingActionButton from './FloatingActionButton';
import { BlurView } from 'expo-blur';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const TaskInputModal: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState('Medium');
  const [taskDeadline, setTaskDeadline] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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
      setTaskDescription('');
      setTaskPriority('Medium');
      setTaskDeadline(new Date());
    });
  };

  const handleAddTask = () => {
    if (taskTitle) {
      dispatch(
        addTask({
          title: taskTitle,
          description: taskDescription,
          deadline: taskDeadline.toISOString().split('T')[0],
          priority: taskPriority,
        })
      );
      closeModal();
    }
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setTaskDeadline(selectedDate);
      setDatePickerVisibility(false); 
    }
  };

  return (
    <View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <BlurView style={styles.modalOverlay} intensity={50} tint="dark">
            <Animated.View style={[styles.modalView, { opacity: fadeAnim }]}>
              {/* Task Title Input */}
              <TextInput
                  placeholder="Enter task title"
                  placeholderTextColor="#888"
                  value={taskTitle}
                  onChangeText={setTaskTitle}
                  style={styles.textInput}
                  autoCorrect={true} 
                  autoCapitalize="sentences" 
                  keyboardType="default" 
                  textContentType="none" 
                  returnKeyType="done" 
                />
              {/* Task Description Input */}
              <TextInput
                 placeholder="Enter task description"
                 placeholderTextColor="#888"
                 value={taskDescription}
                 onChangeText={setTaskDescription}
                 style={styles.textArea}
                 multiline={true}
                 numberOfLines={4}
                 textAlignVertical="top"
                 autoCorrect={true}
                 autoCapitalize="sentences"
                 keyboardType="default"
               />
              {/* Inline Date Picker */}
              <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={styles.dateInput}>
                <Text style={styles.dateInputText}>
                  {taskDeadline ? `Deadline ${taskDeadline.toISOString().split('T')[0]}` : 'Select Deadline'}
                </Text>
              </TouchableOpacity>
              {isDatePickerVisible && (
                <DateTimePicker
                  value={taskDeadline}
                  mode="date"
                  display="inline"
                  onChange={handleDateChange}
                  minimumDate={new Date()}
                  style={styles.datePicker}
                  themeVariant="dark"
                />
              )}
              {/* Priority Picker */}
              <Picker
                selectedValue={taskPriority}
                style={styles.picker}
                onValueChange={(itemValue) => setTaskPriority(itemValue)}
                dropdownIconColor="#FFFFFF"
                selectionColor="#FFFFFF">
                <Picker.Item label="High" value="High" color="#FFFFFF" />
                <Picker.Item label="Medium" value="Medium" color="#FFFFFF" />
                <Picker.Item label="Low" value="Low" color="#FFFFFF" />
              </Picker>
            </Animated.View>
            {/* Add and Cancel Buttons */}
            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity
                style={[styles.addButton, { opacity: taskTitle ? 1 : 0.5 }]}
                onPress={handleAddTask}
                disabled={!taskTitle}>
                <Text style={styles.addButtonText}>Add Task</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeModal} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </TouchableWithoutFeedback>
      </Modal>
      <FloatingActionButton onPress={openModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 40,
  },
  addButton: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10, 
  },
  cancelButton: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10, 
  },
  textArea: {
    width: '100%',
    backgroundColor: '#8282823b',
    color: 'white',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 10,
    height: 100, 
  },
  picker: {
    width: '100%',
    marginVertical: 10,
    borderRadius: 8,
    color: '#FFF',
    marginBottom:10,
  },
  dateInput: {
    width: '100%',
    backgroundColor: '#8282823b',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  dateInputText: {
    color: '#FFF',
    fontSize: 16,
  },
  datePicker: {
    width: '100%',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#0000009e',
  },
  modalView: {
    width: '100%',
    borderRadius: 12,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
    backgroundColor: '#8282823b',
    color: 'white',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 10,
  },
  addButtonText: {
    color: '#1c1c1c',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButtonText: {
    color: '#888',
    fontSize: 16,
  },
});

export default TaskInputModal;
