import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Line, Path } from 'react-native-svg';

export default function SplashScreen(): React.JSX.Element {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    // Небольшая задержка перед появлением веера в правом нижнем углу
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          useNativeDriver: true,
        }),
      ]).start();
    }, 400);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      {/* Декоративный фоновый элемент в левом верхнем углу */}
      <View style={styles.topLeftPattern}>
        <Svg height="120" width="120" viewBox="0 0 100 100">
          {Array.from({ length: 12 }).map((_, i) => (
            <Line
              key={i}
              x1="0"
              y1="0"
              x2={100 * Math.cos((i * 7.5 * Math.PI) / 180)}
              y2={100 * Math.sin((i * 7.5 * Math.PI) / 180)}
              stroke="#E0E0E0"
              strokeWidth="1.5"
            />
          ))}
        </Svg>
      </View>

      {/* Центральный логотип "Food" */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>
          F
          <View style={styles.oContainer}>
            <Text style={styles.orangeText}>o</Text>
            {/* Иконка крышки блюда над второй буквой 'o' */}
            <Svg height="14" width="14" viewBox="0 0 24 24" style={styles.clocheIcon}>
              <Path
                d="M12 3a1 1 0 0 0-1 1v1.07A8.001 8.001 0 0 0 4 13v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1a8.001 8.001 0 0 0-7-7.93V4a1 1 0 0 0-1-1zm-7 13h14v2H5v-2z"
                fill="#E55B3C"
              />
            </Svg>
          </View>
          <Text style={styles.orangeText}>o</Text>
          d
        </Text>
      </View>

      {/* Оранжевый веер снизу справа (анимируется) */}
      <Animated.View
        style={[
          styles.bottomRightPattern,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Svg height="200" width="200" viewBox="0 0 100 100">
          {Array.from({ length: 18 }).map((_, i) => (
            <Line
              key={i}
              x1="100"
              y1="100"
              x2={100 - 100 * Math.cos((i * 5 * Math.PI) / 180)}
              y2={100 - 100 * Math.sin((i * 5 * Math.PI) / 180)}
              stroke="#E55B3C"
              strokeWidth="2.5"
            />
          ))}
        </Svg>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  topLeftPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.4,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 44,
    fontWeight: '800',
    color: '#2D3142',
    letterSpacing: -0.5,
  },
  oContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  clocheIcon: {
    position: 'absolute',
    top: -6,
  },
  orangeText: {
    color: '#E55B3C',
  },
  bottomRightPattern: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});