import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';

interface ForgotPasswordScreenProps {
  onSendCode?: () => void;
  onBack?: () => void;
}

export default function ForgotPasswordScreen({ onSendCode, onBack }: ForgotPasswordScreenProps): React.JSX.Element {
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* Верхняя темная часть */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>Please sign in to your existing account</Text>
      </View>

      {/* Нижняя белая часть */}
      <View style={styles.bodyContainer}>
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

        {/* Кнопка Send Code */}
        <TouchableOpacity style={styles.sendButton} onPress={onSendCode}>
          <Text style={styles.sendButtonText}>SEND CODE</Text>
        </TouchableOpacity>
      </View>
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
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 40,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    color: '#9095A0',
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  input: {
    height: 52,
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#2D3142',
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  sendButton: {
    width: '100%',
    height: 54,
    backgroundColor: '#E55B3C',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});