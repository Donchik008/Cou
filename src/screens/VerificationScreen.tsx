import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

interface VerificationScreenProps {
  onVerify?: () => void;
  onBack?: () => void;
}

export default function VerificationScreen({ onVerify, onBack }: VerificationScreenProps): React.JSX.Element {
  const [code, setCode] = useState<string[]>(['2', '0', '1', '5']);

  const handleKeyPress = (num: string) => {
    if (code.length < 4) {
      setCode([...code, num]);
    }
  };

  const handleDelete = () => {
    setCode(code.slice(0, -1));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Верхняя темная часть */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        
        <Text style={styles.title}>Verification</Text>
        <Text style={styles.subtitle}>
          We have sent a code to your email{'\n'}
          <Text style={styles.emailText}>example@gmail.com</Text>
        </Text>
      </View>

      {/* Белая нижняя часть */}
      <View style={styles.bodyContainer}>
        {/* Поле ввода кода и таймер */}
        <View style={styles.codeSection}>
          <View style={styles.codeLabelRow}>
            <Text style={styles.codeLabel}>CODE</Text>
            <Text style={styles.resendText}>Resend in <Text style={styles.timerText}>50sec</Text></Text>
          </View>

          <View style={styles.codeInputsRow}>
            {[0, 1, 2, 3].map((index) => (
              <View key={index} style={styles.codeBox}>
                <Text style={styles.codeDigit}>{code[index] || ''}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Кнопка Verify */}
        <TouchableOpacity style={styles.verifyButton} onPress={onVerify}>
          <Text style={styles.verifyButtonText}>VERIFY</Text>
        </TouchableOpacity>

        {/* Кастомная цифровая клавиатура */}
        <View style={styles.keypad}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <TouchableOpacity 
              key={num} 
              style={styles.key} 
              onPress={() => handleKeyPress(num)}
            >
              <Text style={styles.keyNumber}>{num}</Text>
            </TouchableOpacity>
          ))}
          <View style={styles.keyEmpty} />
          <TouchableOpacity style={styles.key} onPress={() => handleKeyPress('0')}>
            <Text style={styles.keyNumber}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.key} onPress={handleDelete}>
            <Text style={styles.keyNumber}>⌫</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E222B', // Темный фон для шапки
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 30,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.15),',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#9095A0',
    lineHeight: 20,
  },
  emailText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 30,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  codeSection: {
    marginBottom: 10,
  },
  codeLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  codeLabel: {
    fontSize: 12,
    color: '#9095A0',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  resendText: {
    fontSize: 12,
    color: '#9095A0',
  },
  timerText: {
    color: '#E55B3C',
    fontWeight: 'bold',
  },
  codeInputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  codeBox: {
    width: 70,
    height: 54,
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  codeDigit: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3142',
  },
  verifyButton: {
    width: '100%',
    height: 54,
    backgroundColor: '#E55B3C',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  key: {
    width: '31%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
  },
  keyEmpty: {
    width: '31%',
    height: 48,
  },
  keyNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3142',
  },
});