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

  // Состояния для новых экранов из Figma
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRestCat, setSelectedRestCat] = useState('Burger');
  const [pizzaSize, setPizzaSize] = useState('14"');
  const [pizzaCount, setPizzaCount] = useState(2);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 280,
      useNativeDriver: true,
    }).start();
  }, [currentScreen]);

  useEffect(() => {
    if (currentScreen === 'Splash') {
      const timer = setTimeout(() => setCurrentScreen('Onboarding1'), 1800);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.container}>
        <Animated.View style={[styles.flex1, { opacity: fadeAnim }]}>

          {/* 1. SPLASH SCREEN */}
          {currentScreen === 'Splash' && (
            <View style={styles.splashContainer}>
              <Text style={styles.splashLogo}>🚚</Text>
              <Text style={styles.splashTitle}>Courier</Text>
            </View>
          )}

          {/* 2. ONBOARDING 1 */}
          {currentScreen === 'Onboarding1' && (
            <View style={styles.whitePadded}>
              <View style={styles.centerContent}>
                <Text style={styles.bigEmoji}>🍔</Text>
                <Text style={styles.titleDark}>Fast Delivery</Text>
                <Text style={styles.subtitleGray}>Order your favorite food anytime, anywhere.</Text>
              </View>
              <View style={styles.rowBetween}>
                <TouchableOpacity onPress={() => setCurrentScreen('Login')}>
                  <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.orangeBtnSmall} onPress={() => setCurrentScreen('Onboarding2')}>
                  <Text style={styles.btnTextWhite}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* 3. ONBOARDING 2 */}
          {currentScreen === 'Onboarding2' && (
            <View style={styles.whitePadded}>
              <View style={styles.centerContent}>
                <Text style={styles.bigEmoji}>👨‍🍳</Text>
                <Text style={styles.titleDark}>Best Chefs</Text>
                <Text style={styles.subtitleGray}>Cooked by professional and experienced chefs.</Text>
              </View>
              <View style={styles.rowBetween}>
                <TouchableOpacity onPress={() => setCurrentScreen('Login')}>
                  <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.orangeBtnSmall} onPress={() => setCurrentScreen('Onboarding3')}>
                  <Text style={styles.btnTextWhite}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* 4. ONBOARDING 3 */}
          {currentScreen === 'Onboarding3' && (
            <View style={styles.whitePadded}>
              <View style={styles.centerContent}>
                <Text style={styles.bigEmoji}>🚀</Text>
                <Text style={styles.titleDark}>Get Started</Text>
                <Text style={styles.subtitleGray}>Enjoy lightning-fast delivery right to your door.</Text>
              </View>
              <TouchableOpacity style={styles.orangeBtnFull} onPress={() => setCurrentScreen('Login')}>
                <Text style={styles.btnTextWhite}>GET STARTED</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* 5. LOGIN SCREEN */}
          {currentScreen === 'Login' && (
            <View style={styles.darkContainer}>
              <View style={styles.darkHeader}>
                <Text style={styles.titleWhite}>Log In</Text>
                <Text style={styles.subtitleGray}>Please sign in to your existing account</Text>
              </View>
              <ScrollView contentContainerStyle={styles.whiteSheet}>
                <Text style={styles.inputLabel}>EMAIL</Text>
                <TextInput style={styles.inputField} placeholder="example@gmail.com" placeholderTextColor="#A0A5BA" />

                <Text style={styles.inputLabel}>PASSWORD</Text>
                <View style={styles.passwordWrap}>
                  <TextInput
                    style={styles.passwordField}
                    placeholder="••••••••••••"
                    placeholderTextColor="#A0A5BA"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPassword(!showPassword)}>
                    <Text>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                  </TouchableOpacity>
                </View>

                <View style={[styles.rowBetween, { marginVertical: 16 }]}>
                  <TouchableOpacity style={styles.rowCenter} onPress={() => setRememberMe(!rememberMe)}>
                    <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]} />
                    <Text style={styles.graySmallText}>Remember me</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setCurrentScreen('ForgotPassword')}>
                    <Text style={styles.orangeLinkText}>Forgot Password</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.orangeBtnFull} onPress={() => setCurrentScreen('Location')}>
                  <Text style={styles.btnTextWhite}>LOG IN</Text>
                </TouchableOpacity>

                <View style={[styles.rowCenter, { justifyContent: 'center', marginTop: 18 }]}>
                  <Text style={styles.graySmallText}>Don’t have an account? </Text>
                  <TouchableOpacity onPress={() => setCurrentScreen('SignUp')}>
                    <Text style={styles.orangeBoldText}>SIGN UP</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          )}

          {/* 6. SIGN UP SCREEN */}
          {currentScreen === 'SignUp' && (
            <View style={styles.darkContainer}>
              <View style={styles.darkHeader}>
                <TouchableOpacity style={styles.backCircleDark} onPress={() => setCurrentScreen('Login')}>
                  <Text style={styles.backArrowWhite}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.titleWhite}>Sign Up</Text>
                <Text style={styles.subtitleGray}>Please sign up to get started</Text>
              </View>
              <ScrollView contentContainerStyle={styles.whiteSheet}>
                <Text style={styles.inputLabel}>NAME</Text>
                <TextInput style={styles.inputField} placeholder="john doe" placeholderTextColor="#A0A5BA" />
                <Text style={styles.inputLabel}>EMAIL</Text>
                <TextInput style={styles.inputField} placeholder="example@gmail.com" placeholderTextColor="#A0A5BA" />
                <Text style={styles.inputLabel}>PASSWORD</Text>
                <TextInput style={styles.inputField} placeholder="••••••••••••" placeholderTextColor="#A0A5BA" secureTextEntry />
                <TouchableOpacity style={[styles.orangeBtnFull, { marginTop: 15 }]} onPress={() => setCurrentScreen('Verification')}>
                  <Text style={styles.btnTextWhite}>SIGN UP</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          )}

          {/* 7. FORGOT PASSWORD */}
          {currentScreen === 'ForgotPassword' && (
            <View style={styles.darkContainer}>
              <View style={styles.darkHeader}>
                <TouchableOpacity style={styles.backCircleDark} onPress={() => setCurrentScreen('Login')}>
                  <Text style={styles.backArrowWhite}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.titleWhite}>Forgot Password</Text>
                <Text style={styles.subtitleGray}>Please enter your email to receive code</Text>
              </View>
              <View style={styles.whiteSheet}>
                <Text style={styles.inputLabel}>EMAIL</Text>
                <TextInput style={styles.inputField} placeholder="example@gmail.com" placeholderTextColor="#A0A5BA" />
                <TouchableOpacity style={[styles.orangeBtnFull, { marginTop: 15 }]} onPress={() => setCurrentScreen('Verification')}>
                  <Text style={styles.btnTextWhite}>SEND CODE</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* 8. VERIFICATION SCREEN */}
          {currentScreen === 'Verification' && (
            <View style={styles.darkContainer}>
              <View style={styles.darkHeader}>
                <TouchableOpacity style={styles.backCircleDark} onPress={() => setCurrentScreen('Login')}>
                  <Text style={styles.backArrowWhite}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.titleWhite}>Verification</Text>
                <Text style={styles.subtitleGray}>We have sent a code to your email</Text>
              </View>
              <View style={styles.whiteSheet}>
                <View style={styles.codeRow}>
                  {code.map((digit, i) => (
                    <View key={i} style={styles.codeCell}>
                      <Text style={styles.codeText}>{digit}</Text>
                    </View>
                  ))}
                </View>
                <TouchableOpacity
                  style={styles.orangeBtnFull}
                  onPress={() => {
                    setShowOfferModal(true);
                    setCurrentScreen('Home');
                  }}
                >
                  <Text style={styles.btnTextWhite}>VERIFY</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* 9. ACCESS LOCATION SCREEN (Фото 6343 слева) */}
          {currentScreen === 'Location' && (
            <View style={styles.whitePadded}>
              <View style={styles.centerContent}>
                <View style={styles.mapCirclePlaceholder}>
                  <Text style={{ fontSize: 60 }}>📍</Text>
                </View>
                <TouchableOpacity
                  style={[styles.orangeBtnFull, { width: '100%', marginTop: 30 }]}
                  onPress={() => {
                    setShowOfferModal(true);
                    setCurrentScreen('Home');
                  }}
                >
                  <Text style={styles.btnTextWhite}>ACCESS LOCATION  ⌖</Text>
                </TouchableOpacity>
                <Text style={[styles.subtitleGray, { marginTop: 20 }]}>
                  DFOOD WILL ACCESS YOUR LOCATION ONLY WHILE USING THE APP
                </Text>
              </View>
            </View>
          )}

          {/* 10. HOME SCREEN (Фото 6343, 6344, 6348, 6349) */}
          {currentScreen === 'Home' && (
            <View style={styles.whiteContainer}>
              {/* Шапка с меню, адресом и корзиной */}
              <View style={styles.topHeader}>
                <View style={styles.rowCenter}>
                  <TouchableOpacity style={styles.iconCircleGray} onPress={() => setShowOfferModal(true)}>
                    <Text style={styles.menuLines}>☰</Text>
                  </TouchableOpacity>
                  <View style={{ marginLeft: 12 }}>
                    <Text style={styles.deliverToLabel}>DELIVER TO</Text>
                    <Text style={styles.deliverOfficeText}>Halal Lab office ▾</Text>
                  </View>
                </View>
                <View style={styles.cartDarkCircle}>
                  <Text style={{ fontSize: 16 }}>🛍️</Text>
                  <View style={styles.orangeBadge}>
                    <Text style={styles.badgeNum}>2</Text>
                  </View>
                </View>
              </View>

              <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Text style={styles.greetingText}>
                  Hey Halal, <Text style={{ fontWeight: 'bold' }}>Good Afternoon!</Text>
                </Text>

                {/* Поисковая строка */}
                <TouchableOpacity style={styles.searchBarGray} onPress={() => setCurrentScreen('Search')}>
                  <Text style={styles.searchPlaceholder}>🔍  Search dishes, restaurants</Text>
                </TouchableOpacity>

                {/* All Categories (Pill-кнопки как на фото 6343) */}
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionHeading}>All Categories</Text>
                  <TouchableOpacity onPress={() => setCurrentScreen('CategoryBurgers')}>
                    <Text style={styles.seeAllLink}>See All &gt;</Text>
                  </TouchableOpacity>
                </View>

                <ScrollView
                  horizontal
                  nestedScrollEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  style={{ marginBottom: 16 }}
                >
                  {[
                    { name: 'All', emoji: '🔥', action: () => setSelectedCategory('All') },
                    { name: 'Hot Dog', emoji: '🌭', action: () => setSelectedCategory('Hot Dog') },
                    { name: 'Burger', emoji: '🍔', action: () => setCurrentScreen('CategoryBurgers') },
                    { name: 'Pizza', emoji: '🍕', action: () => setCurrentScreen('DishDetails') },
                  ].map((cat) => {
                    const active = selectedCategory === cat.name;
                    return (
                      <TouchableOpacity
                        key={cat.name}
                        style={[styles.pillCategory, active && styles.pillCategoryActive]}
                        onPress={cat.action}
                      >
                        <View style={styles.pillIconCircle}>
                          <Text style={{ fontSize: 18 }}>{cat.emoji}</Text>
                        </View>
                        <Text style={[styles.pillText, active && styles.pillTextActive]}>{cat.name}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>

                {/* Квадратные карточки категорий со стартовой ценой (как на фото 6344 и 6348) */}
                <ScrollView
                  horizontal
                  nestedScrollEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  style={{ marginBottom: 22 }}
                >
                  <TouchableOpacity style={styles.priceCatCard} onPress={() => setCurrentScreen('DishDetails')}>
                    <View style={styles.foodCircleThumb}><Text style={{ fontSize: 42 }}>🍕</Text></View>
                    <Text style={styles.priceCatTitle}>Pizza</Text>
                    <View style={styles.rowBetween}>
                      <Text style={styles.startingLabel}>Starting</Text>
                      <Text style={styles.startingPrice}>$70</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.priceCatCard} onPress={() => setCurrentScreen('CategoryBurgers')}>
                    <View style={styles.foodCircleThumb}><Text style={{ fontSize: 42 }}>🍔</Text></View>
                    <Text style={styles.priceCatTitle}>Burger</Text>
                    <View style={styles.rowBetween}>
                      <Text style={styles.startingLabel}>Starting</Text>
                      <Text style={styles.startingPrice}>$50</Text>
                    </View>
                  </TouchableOpacity>
                </ScrollView>

                {/* Open Restaurants */}
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionHeading}>Open Restaurants</Text>
                  <TouchableOpacity onPress={() => setCurrentScreen('Restaurant')}>
                    <Text style={styles.seeAllLink}>See All &gt;</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.restCardLarge} onPress={() => setCurrentScreen('Restaurant')}>
                  <View style={styles.restCoverPlaceholder}>
                    <Text style={{ fontSize: 55 }}>🥗🥑</Text>
                  </View>
                  <Text style={styles.restNameTitle}>Rose Garden Restaurant</Text>
                  <Text style={styles.restTags}>Burger - Chiken - Riche - Wings</Text>
                  <View style={styles.metaRow}>
                    <Text style={styles.metaBold}>⭐ 4.7</Text>
                    <Text style={styles.metaRegular}>🚚 Free</Text>
                    <Text style={styles.metaRegular}>🕒 20 min</Text>
                  </View>
                </TouchableOpacity>
              </ScrollView>

              {/* Модальное окно Hurry Offers! (Фото 6349) */}
              {showOfferModal && (
                <View style={styles.modalBackdrop}>
                  <View style={styles.offerBox}>
                    <TouchableOpacity style={styles.closeModalCircle} onPress={() => setShowOfferModal(false)}>
                      <Text style={styles.closeModalX}>✕</Text>
                    </TouchableOpacity>
                    <Text style={styles.hurryTitle}>Hurry Offers!</Text>
                    <Text style={styles.couponCodeBig}>#1243CD2</Text>
                    <Text style={styles.couponSubText}>Use the cupon get 25% discount</Text>
                    <TouchableOpacity style={styles.gotItOutlineBtn} onPress={() => setShowOfferModal(false)}>
                      <Text style={styles.gotItText}>GOT IT</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          )}

          {/* 11. SEARCH SCREEN (Фото 6345) */}
          {currentScreen === 'Search' && (
            <View style={styles.whiteContainer}>
              <View style={styles.topHeader}>
                <View style={styles.rowCenter}>
                  <TouchableOpacity style={styles.iconCircleGray} onPress={() => setCurrentScreen('Home')}>
                    <Text style={styles.backArrowDark}>‹</Text>
                  </TouchableOpacity>
                  <Text style={styles.pageTitle}>Search</Text>
                </View>
                <View style={styles.cartDarkCircle}>
                  <Text style={{ fontSize: 16 }}>🛍️</Text>
                  <View style={styles.orangeBadge}><Text style={styles.badgeNum}>2</Text></View>
                </View>
              </View>

              <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.searchActiveRow}>
                  <Text style={{ marginRight: 8 }}>🔍</Text>
                  <TextInput style={styles.searchInput} defaultValue="Pizza" placeholder="Search..." />
                  <Text style={{ color: '#A0A5BA' }}>⊗</Text>
                </View>

                <Text style={styles.sectionHeading}>Recent Keywords</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 12 }}>
                  {['Burger', 'Sandwich', 'Pizza', 'Sanwich'].map((word, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={styles.keywordPill}
                      onPress={() => setCurrentScreen(word === 'Burger' ? 'CategoryBurgers' : 'DishDetails')}
                    >
                      <Text style={styles.keywordText}>{word}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <Text style={[styles.sectionHeading, { marginTop: 10 }]}>Suggested Restaurants</Text>
                {[
                  { name: 'Pansi Restaurant', rate: '4.7', emoji: '🥘' },
                  { name: 'American Spicy Burger Shop', rate: '4.3', emoji: '🍔' },
                  { name: 'Cafenio Coffee Club', rate: '4.0', emoji: '☕' },
                ].map((item) => (
                  <TouchableOpacity
                    key={item.name}
                    style={styles.suggestedRestRow}
                    onPress={() => setCurrentScreen('Restaurant')}
                  >
                    <View style={styles.suggestedThumb}><Text style={{ fontSize: 24 }}>{item.emoji}</Text></View>
                    <View>
                      <Text style={styles.suggestedName}>{item.name}</Text>
                      <Text style={styles.metaBold}>⭐ {item.rate}</Text>
                    </View>
                  </TouchableOpacity>
                ))}

                <Text style={[styles.sectionHeading, { marginTop: 20 }]}>Popular Fast Food</Text>
                <View style={styles.gridTwoCol}>
                  <TouchableOpacity style={styles.fastFoodCard} onPress={() => setCurrentScreen('DishDetails')}>
                    <Text style={{ fontSize: 44, marginBottom: 8 }}>🍕</Text>
                    <Text style={styles.cardFoodTitle}>European Pizza</Text>
                    <Text style={styles.cardRestSub}>Uttora Coffe House</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.fastFoodCard} onPress={() => setCurrentScreen('DishDetails')}>
                    <Text style={{ fontSize: 44, marginBottom: 8 }}>🍕</Text>
                    <Text style={styles.cardFoodTitle}>Buffalo Pizza.</Text>
                    <Text style={styles.cardRestSub}>Cafenio Coffee Club</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          )}

          {/* 12. CATEGORY BURGERS SCREEN (Фото 6346) */}
          {currentScreen === 'CategoryBurgers' && (
            <View style={styles.whiteContainer}>
              <View style={styles.topHeader}>
                <View style={styles.rowCenter}>
                  <TouchableOpacity style={styles.iconCircleGray} onPress={() => setCurrentScreen('Home')}>
                    <Text style={styles.backArrowDark}>‹</Text>
                  </TouchableOpacity>
                  <View style={styles.dropdownPill}>
                    <Text style={styles.dropdownPillText}>BURGER ▾</Text>
                  </View>
                </View>
                <View style={styles.rowCenter}>
                  <TouchableOpacity style={styles.darkSearchCircle} onPress={() => setCurrentScreen('Search')}>
                    <Text style={{ color: '#FFF', fontSize: 14 }}>🔍</Text>
                  </TouchableOpacity>
                  <View style={[styles.iconCircleGray, { marginLeft: 8 }]}>
                    <Text style={{ fontSize: 14 }}>🎚️</Text>
                  </View>
                </View>
              </View>

              <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionHeading}>Popular Burgers</Text>
                <View style={styles.gridTwoCol}>
                  {[
                    { name: 'Burger Bistro', rest: 'Rose Garden', price: '$40' },
                    { name: "Smokin' Burger", rest: 'Cafenio Restaurant', price: '$60' },
                    { name: 'Buffalo Burgers', rest: 'Kaji Firm Kitchen', price: '$75' },
                    { name: 'Bullseye Burgers', rest: 'Kabab Restaurant', price: '$94' },
                  ].map((burger) => (
                    <TouchableOpacity
                      key={burger.name}
                      style={styles.burgerGridCard}
                      onPress={() => setCurrentScreen('DishDetails')}
                    >
                      <Text style={{ fontSize: 46, alignSelf: 'center', marginVertical: 6 }}>🍔</Text>
                      <Text style={styles.cardFoodTitle}>{burger.name}</Text>
                      <Text style={styles.cardRestSub}>{burger.rest}</Text>
                      <View style={[styles.rowBetween, { marginTop: 10 }]}>
                        <Text style={styles.priceBold}>{burger.price}</Text>
                        <View style={styles.plusOrangeCircle}>
                          <Text style={styles.plusWhite}>+</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={[styles.sectionHeading, { marginTop: 10 }]}>Open Resturants</Text>
                <TouchableOpacity style={styles.restCardLarge} onPress={() => setCurrentScreen('Restaurant')}>
                  <View style={styles.restCoverPlaceholder}>
                    <Text style={{ fontSize: 52 }}>🍱🍓</Text>
                  </View>
                  <Text style={styles.restNameTitle}>Tasty Treat Gallery</Text>
                  <View style={styles.metaRow}>
                    <Text style={styles.metaBold}>⭐ 4.7</Text>
                    <Text style={styles.metaRegular}>🚚 Free</Text>
                    <Text style={styles.metaRegular}>🕒 20 min</Text>
                  </View>
                </TouchableOpacity>
              </ScrollView>
            </View>
          )}

          {/* 13. RESTAURANT VIEW SCREEN (Фото 6350 и 6351) */}
          {currentScreen === 'Restaurant' && (
            <View style={styles.whiteContainer}>
              <View style={styles.topHeader}>
                <View style={styles.rowCenter}>
                  <TouchableOpacity style={styles.iconCircleGray} onPress={() => setCurrentScreen('Home')}>
                    <Text style={styles.backArrowDark}>‹</Text>
                  </TouchableOpacity>
                  <Text style={styles.pageTitle}>Restaurant View</Text>
                </View>
                <View style={styles.iconCircleGray}>
                  <Text style={{ fontWeight: 'bold' }}>•••</Text>
                </View>
              </View>

              <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.restBannerBig}>
                  <Text style={{ fontSize: 60 }}>👨‍🍳🍳</Text>
                </View>
                <Text style={styles.restNameTitle}>Spicy Restaurant</Text>
                <Text style={styles.restDescription}>
                  Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
                </Text>

                <View style={[styles.metaRow, { marginVertical: 12 }]}>
                  <Text style={styles.metaBold}>⭐ 4.7</Text>
                  <Text style={styles.metaRegular}>🚚 Free</Text>
                  <Text style={styles.metaRegular}>🕒 20 min</Text>
                </View>

                {/* Табы категорий внутри ресторана */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 10 }}>
                  {['Burger', 'Sandwich', 'Pizza', 'Sanwich'].map((tab) => {
                    const active = selectedRestCat === tab;
                    return (
                      <TouchableOpacity
                        key={tab}
                        style={[styles.restTabPill, active && styles.restTabPillActive]}
                        onPress={() => setSelectedRestCat(tab)}
                      >
                        <Text style={[styles.restTabText, active && styles.restTabTextActive]}>{tab}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>

                <Text style={[styles.sectionHeading, { marginVertical: 12 }]}>{selectedRestCat} (10)</Text>

                <View style={styles.gridTwoCol}>
                  <TouchableOpacity style={styles.burgerGridCard} onPress={() => setCurrentScreen('DishDetails')}>
                    <Text style={{ fontSize: 44, alignSelf: 'center', marginVertical: 6 }}>🍔</Text>
                    <Text style={styles.cardFoodTitle}>Burger Ferguson</Text>
                    <Text style={styles.cardRestSub}>Spicy Restaurant</Text>
                    <View style={[styles.rowBetween, { marginTop: 10 }]}>
                      <Text style={styles.priceBold}>$40</Text>
                      <View style={styles.plusOrangeCircle}><Text style={styles.plusWhite}>+</Text></View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.burgerGridCard} onPress={() => setCurrentScreen('DishDetails')}>
                    <Text style={{ fontSize: 44, alignSelf: 'center', marginVertical: 6 }}>🍔</Text>
                    <Text style={styles.cardFoodTitle}>Rockin’ Burgers</Text>
                    <Text style={styles.cardRestSub}>Cafecafachino</Text>
                    <View style={[styles.rowBetween, { marginTop: 10 }]}>
                      <Text style={styles.priceBold}>$40</Text>
                      <View style={styles.plusOrangeCircle}><Text style={styles.plusWhite}>+</Text></View>
                    </View>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          )}

          {/* 14. DISH DETAILS SCREEN (Фото 6347) */}
          {currentScreen === 'DishDetails' && (
            <View style={styles.whiteContainer}>
              <View style={styles.topHeader}>
                <View style={styles.rowCenter}>
                  <TouchableOpacity style={styles.iconCircleGray} onPress={() => setCurrentScreen('Home')}>
                    <Text style={styles.backArrowDark}>‹</Text>
                  </TouchableOpacity>
                  <Text style={styles.pageTitle}>Details</Text>
                </View>
              </View>

              <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.pizzaHeroCard}>
                  <Text style={{ fontSize: 95 }}>🍕</Text>
                  <View style={styles.heartCircle}>
                    <Text style={{ color: '#FFF', fontSize: 16 }}>♡</Text>
                  </View>
                </View>

                <View style={styles.restChipOutline}>
                  <Text style={styles.restChipText}>🏪  Uttora Coffe House</Text>
                </View>

                <Text style={styles.detailDishTitle}>Pizza Calzone European</Text>
                <Text style={styles.restDescription}>
                  Prosciutto e funghi is a pizza variety that is topped with tomato sauce.
                </Text>

                <View style={[styles.metaRow, { marginVertical: 14 }]}>
                  <Text style={styles.metaBold}>⭐ 4.7</Text>
                  <Text style={styles.metaRegular}>🚚 Free</Text>
                  <Text style={styles.metaRegular}>🕒 20 min</Text>
                </View>

                {/* Выбор размера */}
                <View style={[styles.rowCenter, { marginVertical: 10 }]}>
                  <Text style={styles.sizeLabel}>SIZE:</Text>
                  {['10"', '14"', '16"'].map((size) => {
                    const active = pizzaSize === size;
                    return (
                      <TouchableOpacity
                        key={size}
                        style={[styles.sizeCircle, active && styles.sizeCircleActive]}
                        onPress={() => setPizzaSize(size)}
                      >
                        <Text style={[styles.sizeCircleText, active && styles.sizeCircleTextActive]}>{size}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* Ингредиенты (как на фото 6347) */}
                <Text style={[styles.sizeLabel, { marginTop: 14, marginBottom: 10 }]}>INGRIDENTS</Text>
                <View style={styles.rowBetween}>
                  {['🧂', '🍗', '🧅', '🧄', '🌶️'].map((ing, idx) => (
                    <View key={idx} style={styles.ingCircle}>
                      <Text style={{ fontSize: 20 }}>{ing}</Text>
                    </View>
                  ))}
                </View>
              </ScrollView>

              {/* Нижняя панель с ценой и счетчиком */}
              <View style={styles.bottomCheckoutBar}>
                <View style={styles.rowBetween}>
                  <Text style={styles.checkoutPrice}>${32 * pizzaCount}</Text>
                  <View style={styles.darkCounterPill}>
                    <TouchableOpacity
                      style={styles.counterRoundBtn}
                      onPress={() => setPizzaCount(Math.max(1, pizzaCount - 1))}
                    >
                      <Text style={styles.counterSymbol}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.counterValueText}>{pizzaCount}</Text>
                    <TouchableOpacity
                      style={styles.counterRoundBtn}
                      onPress={() => setPizzaCount(pizzaCount + 1)}
                    >
                      <Text style={styles.counterSymbol}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity style={[styles.orangeBtnFull, { marginTop: 14 }]} onPress={() => setCurrentScreen('Home')}>
                  <Text style={styles.btnTextWhite}>ADD TO CART</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, height: Platform.OS === 'web' ? '100vh' : '100%', backgroundColor: '#121223' },
  container: { flex: 1, maxWidth: 460, width: '100%', alignSelf: 'center', backgroundColor: '#FFFFFF' },
  flex1: { flex: 1 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rowCenter: { flexDirection: 'row', alignItems: 'center' },

  // Splash & Onboarding
  splashContainer: { flex: 1, backgroundColor: '#121223', alignItems: 'center', justifyContent: 'center' },
  splashLogo: { fontSize: 64, marginBottom: 12 },
  splashTitle: { fontSize: 34, fontWeight: 'bold', color: '#FFFFFF' },
  whitePadded: { flex: 1, backgroundColor: '#FFFFFF', padding: 24, justifyContent: 'space-between' },
  centerContent: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  bigEmoji: { fontSize: 80, marginBottom: 20 },
  titleDark: { fontSize: 24, fontWeight: 'bold', color: '#181C2E', marginBottom: 10, textAlign: 'center' },
  subtitleGray: { fontSize: 14, color: '#646982', textAlign: 'center', lineHeight: 20 },
  skipText: { fontSize: 15, color: '#646982', fontWeight: '600' },
  orangeBtnSmall: { backgroundColor: '#FF7622', paddingVertical: 14, paddingHorizontal: 32, borderRadius: 12 },
  orangeBtnFull: { backgroundColor: '#FF7622', height: 56, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  btnTextWhite: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold', letterSpacing: 1 },

  // Auth Dark Screens
  darkContainer: { flex: 1, backgroundColor: '#121223' },
  darkHeader: { paddingHorizontal: 24, paddingTop: 28, paddingBottom: 28, alignItems: 'center' },
  backCircleDark: { position: 'absolute', left: 24, top: 24, width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  backArrowWhite: { color: '#181C2E', fontSize: 24, fontWeight: 'bold', marginTop: -2 },
  titleWhite: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 6 },
  whiteSheet: { flexGrow: 1, backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24 },
  inputLabel: { fontSize: 12, fontWeight: 'bold', color: '#32343E', marginBottom: 8, marginTop: 12 },
  inputField: { height: 56, backgroundColor: '#F0F5FA', borderRadius: 10, paddingHorizontal: 16, fontSize: 14, color: '#181C2E' },
  passwordWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F5FA', borderRadius: 10 },
  passwordField: { flex: 1, height: 56, paddingHorizontal: 16, fontSize: 14, color: '#181C2E' },
  eyeBtn: { paddingHorizontal: 16 },
  checkbox: { width: 18, height: 18, borderRadius: 4, borderWidth: 1.5, borderColor: '#E3EBF2', marginRight: 8 },
  checkboxChecked: { backgroundColor: '#FF7622', borderColor: '#FF7622' },
  graySmallText: { fontSize: 13, color: '#7E8A97' },
  orangeLinkText: { fontSize: 13, color: '#FF7622' },
  orangeBoldText: { fontSize: 13, color: '#FF7622', fontWeight: 'bold' },
  codeRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 24 },
  codeCell: { width: 64, height: 60, backgroundColor: '#F0F5FA', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  codeText: { fontSize: 20, fontWeight: 'bold', color: '#181C2E' },
  mapCirclePlaceholder: { width: 180, height: 180, borderRadius: 90, backgroundColor: '#98A8B8', alignItems: 'center', justifyContent: 'center' },

  // Main White Screens
  whiteContainer: { flex: 1, backgroundColor: '#FFFFFF' },
  topHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  iconCircleGray: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#ECF0F4', alignItems: 'center', justifyContent: 'center' },
  menuLines: { fontSize: 16, color: '#181C2E' },
  backArrowDark: { fontSize: 24, color: '#181C2E', marginTop: -2 },
  pageTitle: { fontSize: 17, fontWeight: '600', color: '#181C2E', marginLeft: 14 },
  deliverToLabel: { fontSize: 11, fontWeight: 'bold', color: '#FC6E2A' },
  deliverOfficeText: { fontSize: 14, color: '#676767', fontWeight: '500' },
  cartDarkCircle: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#181C2E', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  orangeBadge: { position: 'absolute', top: -2, right: -2, width: 20, height: 20, borderRadius: 10, backgroundColor: '#FF7622', alignItems: 'center', justifyContent: 'center' },
  badgeNum: { color: '#FFFFFF', fontSize: 11, fontWeight: 'bold' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 30 },
  greetingText: { fontSize: 16, color: '#1E1D1D', marginVertical: 12 },
  searchBarGray: { height: 56, backgroundColor: '#F6F6F6', borderRadius: 10, justifyContent: 'center', paddingHorizontal: 16, marginBottom: 18 },
  searchPlaceholder: { color: '#676767', fontSize: 14 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionHeading: { fontSize: 18, fontWeight: '600', color: '#32343E' },
  seeAllLink: { fontSize: 14, color: '#333333' },

  // Pill Categories
  pillCategory: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', paddingVertical: 8, paddingLeft: 8, paddingRight: 18, borderRadius: 30, marginRight: 12, borderWidth: 1, borderColor: '#F0F0F0' },
  pillCategoryActive: { backgroundColor: '#FFD27C', borderColor: '#FFD27C' },
  pillIconCircle: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#98A8B8', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  pillText: { fontSize: 14, fontWeight: 'bold', color: '#32343E' },
  pillTextActive: { color: '#181C2E' },

  // Price Category Cards
  priceCatCard: { width: 148, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 14, marginRight: 14, borderWidth: 1, borderColor: '#F2F2F2' },
  foodCircleThumb: { width: 92, height: 92, borderRadius: 46, backgroundColor: '#F6F6F6', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  priceCatTitle: { fontSize: 16, fontWeight: 'bold', color: '#32343E', marginBottom: 6 },
  startingLabel: { fontSize: 13, color: '#646982' },
  startingPrice: { fontSize: 15, fontWeight: 'bold', color: '#32343E' },

  // Restaurant Cards
  restCardLarge: { marginBottom: 20 },
  restCoverPlaceholder: { height: 145, backgroundColor: '#98A8B8', borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  restNameTitle: { fontSize: 18, fontWeight: '600', color: '#181C2E', marginBottom: 4 },
  restTags: { fontSize: 13, color: '#A0A5BA', marginBottom: 8 },
  metaRow: { flexDirection: 'row', alignItems: 'center' },
  metaBold: { fontSize: 14, fontWeight: 'bold', color: '#181C2E', marginRight: 18 },
  metaRegular: { fontSize: 14, color: '#181C2E', marginRight: 18 },

  // Modal Hurry Offers
  modalBackdrop: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(24,28,46,0.65)', alignItems: 'center', justifyContent: 'center', padding: 24, zIndex: 50 },
  offerBox: { width: '100%', backgroundColor: '#FF9F1C', borderRadius: 28, paddingVertical: 32, paddingHorizontal: 24, alignItems: 'center', position: 'relative' },
  closeModalCircle: { position: 'absolute', top: -12, right: -6, width: 38, height: 38, borderRadius: 19, backgroundColor: '#FFE194', alignItems: 'center', justifyContent: 'center' },
  closeModalX: { color: '#EF761A', fontWeight: 'bold', fontSize: 16 },
  hurryTitle: { fontSize: 32, fontWeight: '900', color: '#FFFFFF', marginBottom: 20 },
  couponCodeBig: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', letterSpacing: 2, marginBottom: 10 },
  couponSubText: { fontSize: 15, fontWeight: '600', color: '#FFFFFF', marginBottom: 26 },
  gotItOutlineBtn: { width: '100%', height: 54, borderRadius: 12, borderWidth: 1.5, borderColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  gotItText: { color: '#FFFFFF', fontSize: 15, fontWeight: 'bold', letterSpacing: 1 },

  // Search Screen
  searchActiveRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F6F6F6', height: 54, borderRadius: 10, paddingHorizontal: 14, marginBottom: 18 },
  searchInput: { flex: 1, fontSize: 14, color: '#181C2E' },
  keywordPill: { borderWidth: 1, borderColor: '#EDEDED', borderRadius: 24, paddingVertical: 10, paddingHorizontal: 18, marginRight: 10 },
  keywordText: { fontSize: 14, color: '#181C2E' },
  suggestedRestRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F2F2F2' },
  suggestedThumb: { width: 54, height: 48, borderRadius: 10, backgroundColor: '#98A8B8', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  suggestedName: { fontSize: 15, color: '#32343E', marginBottom: 4 },

  // Grids
  gridTwoCol: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 10 },
  fastFoodCard: { width: '48%', backgroundColor: '#FFFFFF', borderRadius: 18, padding: 14, alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: '#F2F2F2' },
  burgerGridCard: { width: '48%', backgroundColor: '#FFFFFF', borderRadius: 18, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: '#F2F2F2' },
  cardFoodTitle: { fontSize: 15, fontWeight: 'bold', color: '#32343E', marginBottom: 2 },
  cardRestSub: { fontSize: 12, color: '#646982' },
  priceBold: { fontSize: 16, fontWeight: 'bold', color: '#32343E' },
  plusOrangeCircle: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#F58D1D', alignItems: 'center', justifyContent: 'center' },
  plusWhite: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginTop: -2 },

  // Category Top Bar
  dropdownPill: { borderWidth: 1, borderColor: '#E8E8E8', borderRadius: 22, paddingVertical: 8, paddingHorizontal: 16, marginLeft: 12 },
  dropdownPillText: { fontSize: 12, fontWeight: 'bold', color: '#181C2E' },
  darkSearchCircle: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#121223', alignItems: 'center', justifyContent: 'center' },

  // Restaurant View
  restBannerBig: { height: 165, borderRadius: 22, backgroundColor: '#98A8B8', alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  restDescription: { fontSize: 14, color: '#A0A5BA', lineHeight: 20 },
  restTabPill: { borderWidth: 1, borderColor: '#EDEDED', borderRadius: 24, paddingVertical: 10, paddingHorizontal: 20, marginRight: 10 },
  restTabPillActive: { backgroundColor: '#F58D1D', borderColor: '#F58D1D' },
  restTabText: { fontSize: 14, color: '#181C2E' },
  restTabTextActive: { color: '#FFFFFF', fontWeight: 'bold' },

  // Dish Details
  pizzaHeroCard: { height: 190, borderRadius: 26, backgroundColor: '#E5B85C', alignItems: 'center', justifyContent: 'center', marginBottom: 18, position: 'relative' },
  heartCircle: { position: 'absolute', bottom: 14, right: 14, width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center' },
  restChipOutline: { alignSelf: 'flex-start', borderWidth: 1, borderColor: '#EDEDED', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 14, marginBottom: 14 },
  restChipText: { fontSize: 13, color: '#181C2E' },
  detailDishTitle: { fontSize: 20, fontWeight: 'bold', color: '#181C2E', marginBottom: 8 },
  sizeLabel: { fontSize: 13, color: '#32343E', fontWeight: '600', marginRight: 14 },
  sizeCircle: { width: 46, height: 46, borderRadius: 23, backgroundColor: '#F0F5FA', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  sizeCircleActive: { backgroundColor: '#F58D1D' },
  sizeCircleText: { fontSize: 15, color: '#121223', fontWeight: '600' },
  sizeCircleTextActive: { color: '#FFFFFF', fontWeight: 'bold' },
  ingCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFEBE4', alignItems: 'center', justifyContent: 'center' },
  bottomCheckoutBar: { backgroundColor: '#F0F5FA', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20 },
  checkoutPrice: { fontSize: 26, fontWeight: 'bold', color: '#181C2E' },
  darkCounterPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#121223', borderRadius: 26, paddingVertical: 8, paddingHorizontal: 14 },
  counterRoundBtn: { width: 26, height: 26, borderRadius: 13, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center' },
  counterSymbol: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  counterValueText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', marginHorizontal: 16 },
});