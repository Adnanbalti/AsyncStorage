import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [storedValue, setStoredValue] = useState('');
  const [secondInput, setSecondInput] = useState('');
  const [secondStoredValue, setSecondStoredValue] = useState('');

  const storeData = async (value, key) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log(`Data stored under ${key}`);
    } catch (e) {
      console.error('Failed to save data', e);
    }
  };

  const getData = async (key, setStateFunc) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        setStateFunc(value);
        console.log(`Data retrieved for ${key}`);
      }
    } catch (e) {
      console.error('Failed to retrieve data', e);
    }
  };

  const clearData = async (key, setStateFunc) => {
    try {
      await AsyncStorage.removeItem(key);
      setStateFunc('');
      console.log(`Data cleared for ${key}`);
    } catch (e) {
      console.error('Failed to clear data', e);
    }
  };

  useEffect(() => {
    getData('@storage_Key1', setStoredValue);
    getData('@storage_Key2', setSecondStoredValue);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>AsyncStorage Example</Text>

      {/* First Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter first value..."
        value={inputValue}
        onChangeText={setInputValue}
      />

      {/* Second Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter second value..."
        value={secondInput}
        onChangeText={setSecondInput}
      />

      <View style={styles.spacer}>
        <Button title="Store Data" onPress={() => {
          storeData(inputValue, '@storage_Key1');
          storeData(secondInput, '@storage_Key2');
          setInputValue('');
          setSecondInput('');
        }} />

        <Button title="Retrieve Data" onPress={() => {
          getData('@storage_Key1', setStoredValue);
          getData('@storage_Key2', setSecondStoredValue);
          setInputValue('');
          setSecondInput('');
        }} />

        <Button title="Clear Data" onPress={() => {
          clearData('@storage_Key1', setStoredValue);
          clearData('@storage_Key2', setSecondStoredValue);
          setInputValue('');
          setSecondInput('');
        }} />
      </View>

      <Text style={styles.text}>Stored First Value: {storedValue}</Text>
      <Text style={styles.text}>Stored Second Value: {secondStoredValue}</Text>
      <Text style={styles.text}>Second Input (Live): {secondInput}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
  },
  spacer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default App;
