import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

interface LoginScreenProps {
  onLogin?: () => void;
  onSignUp?: () => void;
  onForgotPassword?: () => void;
}

export default function LoginScreen({ onLogin, onSignUp, onForgotPassword }: LoginScreenProps): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Верхняя темная часть */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Log In</Text>
        <Text style={styles.subtitle}>Please sign in to your existing account</Text>
      </View>

      {/* Нижняя белая часть */}
      <ScrollView contentContainerStyle={styles.bodyContainer} showsVerticalScrollIndicator={false}>
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
          <View style={styles.passwordContainer}>
            <TextInput 
              style={styles.passwordInput} 
              placeholder="••••••••••••" 
              placeholderTextColor="#C5C5C5"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity 
              style={styles.eyeIconContainer} 
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.eyeIconText}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Чекбокс и Забыли пароль */}
        <View style={styles.rowBetween}>
          <TouchableOpacity style={styles.rememberRow} onPress={() => setRememberMe(!rememberMe)}>
            <View style={[styles.checkbox, rememberMe && styles.checkboxActive]} />
            <Text style={styles.rememberText}>Remember me</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onForgotPassword}>
            <Text style={styles.forgotText}>Forgot Password</Text>
          </TouchableOpacity>
        </View>

        {/* Кнопка Log In */}
        <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
          <Text style={styles.loginButtonText}>LOG IN</Text>
        </TouchableOpacity>

        {/* Ссылка на Sign Up */}
        <View style={styles.signUpRow}>
          <Text style={styles.noAccountText}>Don’t have an account? </Text>
          <TouchableOpacity onPress={onSignUp}>
            <Text style={styles.signUpLinkText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>

        {/* Разделитель Or */}
        <Text style={styles.orText}>Or</Text>

        {/* Соцсети */}
        <View style={styles.socialRow}>
          <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#3b5998' }]}>
            <Text style={styles.socialIconText}>f</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#1da1f2' }]}>
            <Text style={styles.socialIconText}>t</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#000000' }]}>
            <Text style={styles.socialIconText}></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E222B',
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 24,
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
    height: 52,
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#2D3142',
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  passwordInput: {
    flex: 1,
    height: 52,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#2D3142',
  },
  eyeIconContainer: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIconText: {
    fontSize: 16,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#C5C5C5',
    marginRight: 8,
  },
  checkboxActive: {
    backgroundColor: '#E55B3C',
    borderColor: '#E55B3C',
  },
  rememberText: {
    fontSize: 13,
    color: '#9095A0',
  },
  forgotText: {
    fontSize: 13,
    color: '#E55B3C',
    fontWeight: '600',
  },
  loginButton: {
    width: '100%',
    height: 54,
    backgroundColor: '#E55B3C',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  noAccountText: {
    fontSize: 14,
    color: '#9095A0',
  },
  signUpLinkText: {
    fontSize: 14,
    color: '#E55B3C',
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    color: '#9095A0',
    fontSize: 14,
    marginBottom: 16,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  socialIconText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});