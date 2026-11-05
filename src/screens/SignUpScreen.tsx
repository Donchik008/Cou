import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

interface SignUpScreenProps {
  onSignUp?: () => void;
  onBack?: () => void;
}

export default function SignUpScreen({ onSignUp, onBack }: SignUpScreenProps): React.JSX.Element {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* Верхняя темная часть */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Please sign up to get started</Text>
      </View>

      {/* Нижняя белая часть */}
      <ScrollView contentContainerStyle={styles.bodyContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>NAME</Text>
          <TextInput 
            style={styles.input} 
            placeholder="john doe" 
            placeholderTextColor="#C5C5C5"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>EMAIL</Text>
          <TextInput 
            style={styles.input} 
            placeholder="example@gmail.com" 
            placeholderTextColor="#C5C5C5"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>PASSWORD</Text>
          <TextInput 
            style={styles.input} 
            placeholder="••••••••••••" 
            placeholderTextColor="#C5C5C5"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>RE-TYPE PASSWORD</Text>
          <TextInput 
            style={styles.input} 
            placeholder="••••••••••••" 
            placeholderTextColor="#C5C5C5"
            secureTextEntry
            value={rePassword}
            onChangeText={setRePassword}
          />
        </View>

        {/* Кнопка Sign Up */}
        <TouchableOpacity style={styles.signUpButton} onPress={onSignUp}>
          <Text style={styles.signUpButtonText}>SIGN UP</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E222B', // Темный фон шапки
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 24,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    marginTop: -2,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#9095A0',
  },
  bodyContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 40,
    flexGrow: 1,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: '#9095A0',
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  input: {
    width: '100vw' as any, // Для кроссплатформенности лучше использовать 100%, заменим на:
    height: 52,
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#2D3142',
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  signUpButton: {
    width: '100%',
    height: 54,
    backgroundColor: '#E55B3C',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});