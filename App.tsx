import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';

// Add navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Registration: undefined;
  Profile: { fullName: string; email: string; gender: string };
};

type RegistrationScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Registration'>;
};

function RegistrationScreen({ navigation }: RegistrationScreenProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    navigation.navigate('Profile', {
      fullName,
      email,
      gender,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registration Form</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          placeholder="Enter your name"
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          placeholder="Enter your email"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Enter password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          placeholder="Confirm password"
          secureTextEntry
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Gender</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[
              styles.genderButton,
              gender === 'Male' && { backgroundColor: '#4a90e2' }
            ]}
            onPress={() => setGender('Male')}
          >
            <Text style={[
              styles.genderText,
              gender === 'Male' && { color: '#fff', fontWeight: 'bold' }
            ]}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderButton,
              gender === 'Female' && { backgroundColor: '#4a90e2' }
            ]}
            onPress={() => setGender('Female')}
          >
            <Text style={[
              styles.genderText,
              gender === 'Female' && { color: '#fff', fontWeight: 'bold' }
            ]}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderButton,
              gender === 'Other' && { backgroundColor: '#4a90e2' }
            ]}
            onPress={() => setGender('Other')}
          >
            <Text style={[
              styles.genderText,
              gender === 'Other' && { color: '#fff', fontWeight: 'bold' }
            ]}>Other</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerText}>Register</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

function ProfileScreen({ route }: { route: { params: { fullName: string; email: string; gender: string } } }) {
  const { fullName, email, gender } = route.params;
  return (
    <View style={[styles.container, { justifyContent: 'center' }]}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.label}>Full Name: <Text style={{ fontWeight: 'bold' }}>{fullName}</Text></Text>
      <Text style={styles.label}>Email: <Text style={{ fontWeight: 'bold' }}>{email}</Text></Text>
      <Text style={styles.label}>Gender: <Text style={{ fontWeight: 'bold' }}>{gender}</Text></Text>
    </View>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Registration">
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    backgroundColor: '#f7f7fa',
    flexGrow: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 28,
    color: '#333',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  genderButton: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  genderText: {
    fontSize: 16,
    color: '#333',
  },
  registerButton: {
    backgroundColor: '#4a90e2',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  registerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});