import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  Animated,
} from 'react-native';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('Splash');
  const [code] = useState<string[]>(['2', '0', '1', '5']);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [pizzaSize, setPizzaSize] = useState('14"');
  const [pizzaCount, setPizzaCount] = useState(2);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [currentScreen]);

  useEffect(() => {
    if (currentScreen === 'Splash') {
      const timer = setTimeout(() => setCurrentScreen('Onboarding1'), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.container}>
        <Animated.View style={[styles.screenWrapperFlex, { opacity: fadeAnim }]}>
          
          {/* 1. SPLASH SCREEN */}
          {currentScreen === 'Splash' && (
            <View style={styles.splashContainer}>
              <Text style={styles.splashLogo}>🚚</Text>
              <Text style={styles.splashTitle}>Courier</Text>
            </View>
          )}

          {/* 2. ONBOARDING 1 */}
          {currentScreen === 'Onboarding1' && (
            <View style={styles.screenWrapper}>
              <View style={styles.onboardingContent}>
                <Text style={styles.onboardingEmoji}>🍔</Text>
                <Text style={styles.screenTitle}>Fast Delivery</Text>
                <Text style={styles.screenSubtitle}>Order your favorite food anytime, anywhere.</Text>
              </View>
              <View style={styles.buttonRow}>
                <TouchableOpacity onPress={() => setCurrentScreen('Login')}>
                  <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.primaryButtonSmall} onPress={() => setCurrentScreen('Onboarding2')}>
                  <Text style={styles.primaryButtonText}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* 3. ONBOARDING 2 */}
          {currentScreen === 'Onboarding2' && (
            <View style={styles.screenWrapper}>
              <View style={styles.onboardingContent}>
                <Text style={styles.onboardingEmoji}>👨‍🍳</Text>
                <Text style={styles.screenTitle}>Best Chefs</Text>
                <Text style={styles.screenSubtitle}>Cooked by professional and experienced chefs.</Text>
              </View>
              <View style={styles.buttonRow}>
                <TouchableOpacity onPress={() => setCurrentScreen('Login')}>
                  <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.primaryButtonSmall} onPress={() => setCurrentScreen('Onboarding3')}>
                  <Text style={styles.primaryButtonText}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* 4. ONBOARDING 3 */}
          {currentScreen === 'Onboarding3' && (
            <View style={styles.screenWrapper}>
              <View style={styles.onboardingContent}>
                <Text style={styles.onboardingEmoji}>🚀</Text>
                <Text style={styles.screenTitle}>Get Started</Text>
                <Text style={styles.screenSubtitle}>Enjoy lightning-fast delivery right to your door.</Text>
              </View>
              <TouchableOpacity style={styles.primaryButton} onPress={() => setCurrentScreen('Login')}>
                <Text style={styles.primaryButtonText}>GET STARTED</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* 5. LOGIN SCREEN */}
          {currentScreen === 'Login' && (
            <View style={styles.screenWrapperDark}>
              <View style={styles.headerContainer}>
                <Text style={styles.mainTitle}>Log In</Text>
                <Text style={styles.headerSubtitle}>Please sign in to your existing account</Text>
              </View>
              <ScrollView contentContainerStyle={styles.bodyContainer}>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>EMAIL</Text>
                  <TextInput style={styles.input} placeholder="example@gmail.com" placeholderTextColor="#C5C5C5" />
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
                    <TouchableOpacity style={styles.eyeIconContainer} onPress={() => setShowPassword(!showPassword)}>
                      <Text>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.rowBetween}>
                  <TouchableOpacity style={styles.rememberRow} onPress={() => setRememberMe(!rememberMe)}>
                    <View style={[styles.checkbox, rememberMe && styles.checkboxActive]} />
                    <Text style={styles.rememberText}>Remember me</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setCurrentScreen('ForgotPassword')}>
                    <Text style={styles.forgotText}>Forgot Password</Text>
                  </TouchableOpacity>
                </View>
                {/* Исправлено: теперь ведет на экран Location вместо alert */}
                <TouchableOpacity style={styles.primaryButton} onPress={() => setCurrentScreen('Location')}>
                  <Text style={styles.primaryButtonText}>LOG IN</Text>
                </TouchableOpacity>
                <View style={styles.signUpRow}>
                  <Text style={styles.noAccountText}>Don’t have an account? </Text>
                  <TouchableOpacity onPress={() => setCurrentScreen('SignUp')}>
                    <Text style={styles.signUpLinkText}>SIGN UP</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          )}

          {/* 6. SIGN UP SCREEN */}
          {currentScreen === 'SignUp' && (
            <View style={styles.screenWrapperDark}>
              <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen('Login')}>
                  <Text style={styles.backButtonText}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.mainTitle}>Sign Up</Text>
                <Text style={styles.headerSubtitle}>Please sign up to get started</Text>
              </View>
              <ScrollView contentContainerStyle={styles.bodyContainer}>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>NAME</Text>
                  <TextInput style={styles.input} placeholder="john doe" placeholderTextColor="#C5C5C5" />
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>EMAIL</Text>
                  <TextInput style={styles.input} placeholder="example@gmail.com" placeholderTextColor="#C5C5C5" />
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>PASSWORD</Text>
                  <TextInput style={styles.input} placeholder="••••••••••••" placeholderTextColor="#C5C5C5" secureTextEntry />
                </View>
                <TouchableOpacity style={styles.primaryButton} onPress={() => setCurrentScreen('Verification')}>
                  <Text style={styles.primaryButtonText}>SIGN UP</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          )}

          {/* 7. FORGOT PASSWORD */}
          {currentScreen === 'ForgotPassword' && (
            <View style={styles.screenWrapperDark}>
              <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen('Login')}>
                  <Text style={styles.backButtonText}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.mainTitle}>Forgot Password</Text>
                <Text style={styles.headerSubtitle}>Please enter your email to receive code</Text>
              </View>
              <View style={styles.bodyContainer}>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>EMAIL</Text>
                  <TextInput style={styles.input} placeholder="example@gmail.com" placeholderTextColor="#C5C5C5" />
                </View>
                <TouchableOpacity style={styles.primaryButton} onPress={() => setCurrentScreen('Verification')}>
                  <Text style={styles.primaryButtonText}>SEND CODE</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* 8. VERIFICATION SCREEN */}
          {currentScreen === 'Verification' && (
            <View style={styles.screenWrapperDark}>
              <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen('Login')}>
                  <Text style={styles.backButtonText}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.mainTitle}>Verification</Text>
                <Text style={styles.headerSubtitle}>We have sent a code to your email</Text>
              </View>
              <View style={styles.bodyContainer}>
                <View style={styles.codeInputsRow}>
                  {[0, 1, 2, 3].map((index) => (
                    <View key={index} style={styles.codeBox}>
                      <Text style={styles.codeDigit}>{code[index] || ''}</Text>
                    </View>
                  ))}
                </View>
                <TouchableOpacity style={styles.primaryButton} onPress={() => { setShowOfferModal(true); setCurrentScreen('Home'); }}>
                  <Text style={styles.primaryButtonText}>VERIFY</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* 9. ACCESS LOCATION SCREEN */}
          {currentScreen === 'Location' && (
            <View style={styles.screenWrapper}>
              <View style={styles.locationContent}>
                <Text style={styles.locationPin}>📍</Text>
                <Text style={styles.screenTitle}>Access Location</Text>
                <Text style={styles.screenSubtitle}>DFOOD will access your location only while using the app</Text>
              </View>
              <TouchableOpacity style={styles.primaryButton} onPress={() => { setShowOfferModal(true); setCurrentScreen('Home'); }}>
                <Text style={styles.primaryButtonText}>ACCESS LOCATION</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* 10. HOME SCREEN */}
          {currentScreen === 'Home' && (
            <View style={styles.screenWrapperWhite}>
              <View style={styles.homeHeaderRow}>
                <View>
                  <Text style={styles.deliverLabel}>DELIVER TO</Text>
                  <Text style={styles.deliverAddress}>Halal Lab office ▾</Text>
                </View>
                <View style={styles.cartIconBadge}>
                  <Text>🛒</Text>
                  <View style={styles.badgeRed}><Text style={styles.badgeText}>2</Text></View>
                </View>
              </View>

              <ScrollView contentContainerStyle={styles.homeScroll} showsVerticalScrollIndicator={false}>
                <Text style={styles.homeGreeting}>Hey Halal, Good Afternoon!</Text>

                <TouchableOpacity style={styles.searchBoxFake} onPress={() => setCurrentScreen('Search')}>
                  <Text style={styles.searchText}>🔍 Search dishes, restaurants</Text>
                </TouchableOpacity>

                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.sectionTitle}>All Categories</Text>
                  <Text style={styles.seeAllText}>See All &gt;</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
                  <TouchableOpacity style={[styles.catCard, styles.catCardActive]}>
                    <Text style={styles.catEmoji}>🔥</Text><Text style={styles.catTextActive}>All</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.catCard} onPress={() => setCurrentScreen('Restaurant')}>
                    <Text style={styles.catEmoji}>🌭</Text><Text style={styles.catText}>Hot Dog</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.catCard} onPress={() => setCurrentScreen('DishDetails')}>
                    <Text style={styles.catEmoji}>🍕</Text><Text style={styles.catText}>Pizza</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.catCard} onPress={() => setCurrentScreen('Restaurant')}>
                    <Text style={styles.catEmoji}>🍔</Text><Text style={styles.catText}>Burger</Text>
                  </TouchableOpacity>
                </ScrollView>

                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.sectionTitle}>Open Restaurants</Text>
                  <Text style={styles.seeAllText}>See All &gt;</Text>
                </View>

                <TouchableOpacity style={styles.restaurantCard} onPress={() => setCurrentScreen('Restaurant')}>
                  <View style={styles.restaurantImagePlace}><Text style={styles.restImgEmoji}>🥗</Text></View>
                  <Text style={styles.restaurantName}>Rose Garden Restaurant</Text>
                  <Text style={styles.restaurantDesc}>Burger • Chicken • Riche • Wings</Text>
                  <View style={styles.restaurantMetaRow}>
                    <Text style={styles.metaText}>⭐ 4.7</Text>
                    <Text style={styles.metaText}>🚚 Free</Text>
                    <Text style={styles.metaText}>⏱️ 20 min</Text>
                  </View>
                </TouchableOpacity>
              </ScrollView>

              {showOfferModal && (
                <View style={styles.modalOverlay}>
                  <View style={styles.offerModalCard}>
                    <TouchableOpacity style={styles.modalClose} onPress={() => setShowOfferModal(false)}>
                      <Text style={styles.modalCloseText}>✕</Text>
                    </TouchableOpacity>
                    <Text style={styles.offerTitle}>Hurry Offers!</Text>
                    <View style={styles.promoCodeBox}>
                      <Text style={styles.promoCodeText}>#1243CD2</Text>
                    </View>
                    <Text style={styles.offerDesc}>Use the coupon get 25% discount</Text>
                    <TouchableOpacity style={styles.primaryButtonModal} onPress={() => setShowOfferModal(false)}>
                      <Text style={styles.primaryButtonText}>GOT IT</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          )}

          {/* 11. SEARCH SCREEN */}
          {currentScreen === 'Search' && (
            <View style={styles.screenWrapperWhite}>
              <View style={styles.topBarRow}>
                <TouchableOpacity onPress={() => setCurrentScreen('Home')} style={styles.backButtonDark}>
                  <Text style={styles.backDarkText}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.topBarTitle}>Search</Text>
              </View>
              <ScrollView contentContainerStyle={styles.homeScroll}>
                <View style={styles.searchBoxActive}>
                  <TextInput style={styles.searchInputReal} placeholder="Pizza" defaultValue="Pizza" />
                </View>
                <Text style={styles.sectionTitle}>Recent Keywords</Text>
                <View style={styles.keywordsRow}>
                  <View style={styles.keywordChip}><Text>Burger</Text></View>
                  <View style={styles.keywordChip}><Text>Sandwich</Text></View>
                  <View style={styles.keywordChip}><Text>Pizza</Text></View>
                </View>
                <Text style={styles.sectionTitle}>Suggested Restaurants</Text>
                <TouchableOpacity style={styles.suggestedItem} onPress={() => setCurrentScreen('Restaurant')}>
                  <Text>Pansy Restaurant ⭐ 4.7</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.suggestedItem} onPress={() => setCurrentScreen('Restaurant')}>
                  <Text>American Spicy Burger Shop ⭐ 4.3</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          )}

          {/* 12. RESTAURANT VIEW SCREEN */}
          {currentScreen === 'Restaurant' && (
            <View style={styles.screenWrapperWhite}>
              <View style={styles.topBarRow}>
                <TouchableOpacity onPress={() => setCurrentScreen('Home')} style={styles.backButtonDark}>
                  <Text style={styles.backDarkText}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.topBarTitle}>Restaurant View</Text>
              </View>
              <ScrollView contentContainerStyle={styles.homeScroll}>
                <View style={styles.restaurantBannerLarge}>
                  <Text style={styles.bannerEmoji}>👨‍🍳</Text>
                </View>
                <Text style={styles.restaurantTitle}>Spicy Restaurant</Text>
                <Text style={styles.restaurantSubDesc}>
                  Maecenas sed diam eget risus varius blandit sit amet non magna...
                </Text>
                <View style={styles.restaurantMetaRow}>
                  <Text style={styles.metaText}>⭐ 4.7</Text>
                  <Text style={styles.metaText}>🚚 Free</Text>
                  <Text style={styles.metaText}>⏱️ 20 min</Text>
                </View>

                <View style={styles.dishGrid}>
                  <TouchableOpacity style={styles.dishCard} onPress={() => setCurrentScreen('DishDetails')}>
                    <Text style={styles.dishEmoji}>🍔</Text>
                    <Text style={styles.dishName}>Burger Ferguson</Text>
                    <Text style={styles.dishPrice}>$40</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.dishCard} onPress={() => setCurrentScreen('DishDetails')}>
                    <Text style={styles.dishEmoji}>🍔</Text>
                    <Text style={styles.dishName}>Rockin’ Burgers</Text>
                    <Text style={styles.dishPrice}>$40</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          )}

          {/* 13. DISH DETAILS SCREEN */}
          {currentScreen === 'DishDetails' && (
            <View style={styles.screenWrapperWhite}>
              <View style={styles.topBarRow}>
                <TouchableOpacity onPress={() => setCurrentScreen('Restaurant')} style={styles.backButtonDark}>
                  <Text style={styles.backDarkText}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.topBarTitle}>Details</Text>
              </View>
              <ScrollView contentContainerStyle={styles.homeScroll}>
                <View style={styles.dishDetailBanner}>
                  <Text style={styles.bannerEmoji}>🍕</Text>
                </View>
                <Text style={styles.detailRestName}>Uttora Coffe House</Text>
                <Text style={styles.detailTitle}>Pizza Calzone European</Text>
                <Text style={styles.detailDesc}>Prosciutto e funghi is a pizza variety that is topped with tomato souce</Text>

                <View style={styles.restaurantMetaRow}>
                  <Text style={styles.metaText}>⭐ 4.7</Text>
                  <Text style={styles.metaText}>🚚 Free</Text>
                  <Text style={styles.metaText}>⏱️ 20 min</Text>
                </View>

                <Text style={styles.sectionTitle}>SIZE:</Text>
                <View style={styles.sizeRow}>
                  {['10"', '14"', '16"'].map((size) => (
                    <TouchableOpacity 
                      key={size} 
                      style={[styles.sizeBtn, pizzaSize === size && styles.sizeBtnActive]}
                      onPress={() => setPizzaSize(size)}
                    >
                      <Text style={[styles.sizeText, pizzaSize === size && styles.sizeTextActive]}>{size}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={styles.detailBottomRow}>
                  <Text style={styles.priceBig}>$32</Text>
                  <View style={styles.counterBox}>
                    <TouchableOpacity onPress={() => setPizzaCount(Math.max(1, pizzaCount - 1))}>
                      <Text style={styles.counterBtn}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.counterNum}>{pizzaCount}</Text>
                    <TouchableOpacity onPress={() => setPizzaCount(pizzaCount + 1)}>
                      <Text style={styles.counterBtn}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>
          )}

        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, height: Platform.OS === 'web' ? '100vh' : '100%', backgroundColor: '#1E222B' },
  container: { flex: 1 },
  screenWrapperFlex: { flex: 1 },
  splashContainer: { flex: 1, backgroundColor: '#1E222B', alignItems: 'center', justifyContent: 'center' },
  splashLogo: { fontSize: 60, marginBottom: 10 },
  splashTitle: { fontSize: 32, fontWeight: 'bold', color: '#FFFFFF' },
  screenWrapper: { flex: 1, backgroundColor: '#FFFFFF', padding: 24, justifyContent: 'space-between' },
  screenWrapperDark: { flex: 1, backgroundColor: '#1E222B' },
  screenWrapperWhite: { flex: 1, backgroundColor: '#FFFFFF' },
  onboardingContent: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  onboardingEmoji: { fontSize: 80, marginBottom: 20 },
  screenTitle: { fontSize: 26, fontWeight: 'bold', color: '#2D3142', marginBottom: 10, textAlign: 'center' },
  screenSubtitle: { fontSize: 15, color: '#9095A0', textAlign: 'center', paddingHorizontal: 20 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  skipText: { fontSize: 16, color: '#9095A0', fontWeight: '600' },
  primaryButtonSmall: { backgroundColor: '#E55B3C', paddingVertical: 14, paddingHorizontal: 30, borderRadius: 16 },
  primaryButton: { backgroundColor: '#E55B3C', height: 54, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginVertical: 15, marginHorizontal: 24 },
  primaryButtonModal: { backgroundColor: '#E55B3C', height: 50, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginTop: 15 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
  headerContainer: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 24 },
  backButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255, 255, 255, 0.15)', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  backButtonText: { color: '#FFFFFF', fontSize: 24, marginTop: -2 },
  mainTitle: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 6 },
  headerSubtitle: { fontSize: 14, color: '#9095A0' },
  bodyContainer: { flex: 1, backgroundColor: '#FFFFFF', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: 24, paddingTop: 30, paddingBottom: 30 },
  formGroup: { marginBottom: 16 },
  label: { fontSize: 12, color: '#9095A0', fontWeight: 'bold', letterSpacing: 0.5, marginBottom: 8 },
  input: { height: 52, backgroundColor: '#F7F7F7', borderRadius: 12, paddingHorizontal: 16, fontSize: 15, color: '#2D3142', borderWidth: 1, borderColor: '#EFEFEF' },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F7F7F7', borderRadius: 12, borderWidth: 1, borderColor: '#EFEFEF' },
  passwordInput: { flex: 1, height: 52, paddingHorizontal: 16, fontSize: 15, color: '#2D3142' },
  eyeIconContainer: { paddingHorizontal: 16, justifyContent: 'center', alignItems: 'center' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 12 },
  rememberRow: { flexDirection: 'row', alignItems: 'center' },
  checkbox: { width: 18, height: 18, borderRadius: 4, borderWidth: 1.5, borderColor: '#C5C5C5', marginRight: 8 },
  checkboxActive: { backgroundColor: '#E55B3C', borderColor: '#E55B3C' },
  rememberText: { fontSize: 13, color: '#9095A0' },
  forgotText: { fontSize: 13, color: '#E55B3C', fontWeight: '600' },
  signUpRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
  noAccountText: { fontSize: 14, color: '#9095A0' },
  signUpLinkText: { fontSize: 14, color: '#E55B3C', fontWeight: 'bold' },
  codeInputsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  codeBox: { width: 70, height: 54, backgroundColor: '#F7F7F7', borderRadius: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#EFEFEF' },
  codeDigit: { fontSize: 20, fontWeight: 'bold', color: '#2D3142' },
  locationContent: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  locationPin: { fontSize: 70, marginBottom: 20 },
  homeHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 15, paddingBottom: 10 },
  deliverLabel: { fontSize: 10, color: '#E55B3C', fontWeight: 'bold' },
  deliverAddress: { fontSize: 14, fontWeight: 'bold', color: '#2D3142' },
  cartIconBadge: { width: 40, height: 40, backgroundColor: '#F7F7F7', borderRadius: 20, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  badgeRed: { position: 'absolute', top: 6, right: 6, width: 14, height: 14, backgroundColor: '#E55B3C', borderRadius: 7, alignItems: 'center', justifyContent: 'center' },
  badgeText: { color: '#FFF', fontSize: 9, fontWeight: 'bold' },
  homeScroll: { paddingHorizontal: 24, paddingBottom: 40 },
  homeGreeting: { fontSize: 18, fontWeight: 'bold', color: '#2D3142', marginVertical: 10 },
  searchBoxFake: { backgroundColor: '#F7F7F7', height: 50, borderRadius: 12, justifyContent: 'center', paddingHorizontal: 16, marginVertical: 10 },
  searchText: { color: '#9095A0', fontSize: 14 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15, marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#2D3142' },
  seeAllText: { fontSize: 13, color: '#9095A0' },
  catScroll: { flexDirection: 'row', marginBottom: 10 },
  catCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F7F7F7', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, marginRight: 10 },
  catCardActive: { backgroundColor: '#E55B3C' },
  catEmoji: { fontSize: 18, marginRight: 6 },
  catText: { color: '#2D3142', fontWeight: '600' },
  catTextActive: { color: '#FFF', fontWeight: '600' },
  restaurantCard: { backgroundColor: '#FFF', borderRadius: 16, marginBottom: 15, marginTop: 5 },
  restaurantImagePlace: { height: 130, backgroundColor: '#F2F2F2', borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  restImgEmoji: { fontSize: 40 },
  restaurantName: { fontSize: 16, fontWeight: 'bold', color: '#2D3142' },
  restaurantDesc: { fontSize: 13, color: '#9095A0', marginVertical: 2 },
  restaurantMetaRow: { flexDirection: 'row', marginTop: 4 },
  metaText: { fontSize: 12, color: '#9095A0', marginRight: 15 },
  modalOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center', zIndex: 100 },
  offerModalCard: { width: '85%', backgroundColor: '#FFE600', borderRadius: 24, padding: 24, alignItems: 'center', position: 'relative' },
  modalClose: { position: 'absolute', top: 12, right: 12, width: 28, height: 28, backgroundColor: '#FFF', borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  modalCloseText: { fontWeight: 'bold', color: '#333' },
  offerTitle: { fontSize: 24, fontWeight: 'bold', color: '#2D3142', marginBottom: 15 },
  promoCodeBox: { backgroundColor: '#FFF', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: '#DDD', borderStyle: 'dashed' },
  promoCodeText: { fontSize: 20, fontWeight: 'bold', color: '#E55B3C', letterSpacing: 2 },
  offerDesc: { fontSize: 14, color: '#2D3142', marginBottom: 15, textAlign: 'center' },
  topBarRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 15 },
  backButtonDark: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#F7F7F7', alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  backDarkText: { fontSize: 22, color: '#2D3142', marginTop: -2 },
  topBarTitle: { fontSize: 18, fontWeight: 'bold', color: '#2D3142' },
  searchBoxActive: { backgroundColor: '#F7F7F7', height: 50, borderRadius: 12, justifyContent: 'center', paddingHorizontal: 16, marginBottom: 15, borderWidth: 1, borderColor: '#E55B3C' },
  searchInputReal: { fontSize: 14, color: '#2D3142' },
  keywordsRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20, marginTop: 5 },
  keywordChip: { backgroundColor: '#F7F7F7', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, marginRight: 10, marginBottom: 10 },
  suggestedItem: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F2F2F2' },
  restaurantBannerLarge: { height: 160, backgroundColor: '#F7F7F7', borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  bannerEmoji: { fontSize: 50 },
  restaurantTitle: { fontSize: 20, fontWeight: 'bold', color: '#2D3142', marginBottom: 4 },
  restaurantSubDesc: { fontSize: 13, color: '#9095A0', lineHeight: 18, marginBottom: 8 },
  dishGrid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  dishCard: { width: '48%', backgroundColor: '#F7F7F7', borderRadius: 16, padding: 12, alignItems: 'center', marginBottom: 15 },
  dishEmoji: { fontSize: 35, marginVertical: 8 },
  dishName: { fontSize: 14, fontWeight: 'bold', color: '#2D3142', textAlign: 'center' },
  dishPrice: { fontSize: 14, color: '#E55B3C', fontWeight: 'bold', marginTop: 4 },
  dishDetailBanner: { height: 220, backgroundColor: '#FFEBB3', borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 15 },
  detailRestName: { fontSize: 12, color: '#E55B3C', fontWeight: 'bold', marginBottom: 4 },
  detailTitle: { fontSize: 22, fontWeight: 'bold', color: '#2D3142', marginBottom: 8 },
  detailDesc: { fontSize: 14, color: '#9095A0', lineHeight: 20, marginBottom: 10 },
  sizeRow: { flexDirection: 'row', marginTop: 8, marginBottom: 15 },
  sizeBtn: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: '#F7F7F7', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  sizeBtnActive: { backgroundColor: '#E55B3C' },
  sizeText: { color: '#2D3142', fontWeight: 'bold' },
  sizeTextActive: { color: '#FFF' },
  detailBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 30 },
  priceBig: { fontSize: 26, fontWeight: 'bold', color: '#2D3142' },
  counterBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E222B', borderRadius: 25, paddingHorizontal: 12, paddingVertical: 6 },
  counterBtn: { color: '#FFF', fontSize: 18, fontWeight: 'bold', paddingHorizontal: 10 },
  counterNum: { color: '#FFF', fontSize: 16, fontWeight: 'bold', paddingHorizontal: 5 },
});  