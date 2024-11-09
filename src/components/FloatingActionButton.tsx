// src/components/FloatingActionButton.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  onPress: () => void;
}

const FloatingActionButton: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom:10,
    right: 20,
    backgroundColor: 'green',
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 25,
    color: 'white'
  }
});

export default FloatingActionButton;
