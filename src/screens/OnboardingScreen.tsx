import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface OnboardingScreenProps {
  onNext?: () => void;
  onSkip?: () => void;
}

export default function OnboardingScreen({ onNext, onSkip }: OnboardingScreenProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      {/* Иллюстрация (здесь можно заменить на твою картинку через require) */}
      <View style={styles.illustrationContainer}>
        <View style={styles.placeholderImage}>
          {/* Пример: <Image source={require('../../assets/favorite_food.png')} style={styles.image} /> */}
          <Text style={styles.placeholderText}>🍕 🍔 🍟</Text>
        </View>
      </View>

      {/* Текстовый блок */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>All your favorites</Text>
        <Text style={styles.subtitle}>
          Get all your loved foods in one once place, you just place the order we do the rest
        </Text>
      </View>

      {/* Индикатор пагинации (точки) */}
      <View style={styles.pagination}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      {/* Кнопка Next */}
      <TouchableOpacity style={styles.nextButton} onPress={onNext}>
        <Text style={styles.nextButtonText}>NEXT</Text>
      </TouchableOpacity>

      {/* Кнопка Skip */}
      <TouchableOpacity onPress={onSkip} style={styles.skipButton}>
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
    paddingHorizontal: 24,
  },
  illustrationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderImage: {
    width: 260,
    height: 260,
    backgroundColor: '#FFF5F2',
    borderRadius: 130,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 40,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2D3142',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#9095A0',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#E55B3C',
    width: 20,
  },
  nextButton: {
    width: '100%',
    height: 54,
    backgroundColor: '#E55B3C',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  skipButton: {
    paddingVertical: 8,
  },
  skipButtonText: {
    color: '#9095A0',
    fontSize: 14,
    fontWeight: '600',
  },
});     