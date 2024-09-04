import React from 'react';
import {AUTH, COMMON} from './ROUTES';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Pressable, View, TouchableOpacity, Platform, Image} from 'react-native';
import {styles} from './styles';
import {useTheme} from '../config/theme';
import {createStackNavigator} from '@react-navigation/stack';
import {
  ChangePassword,
  Login,
  MyDetails,
  MyHubScreen,
  Notification,
  EmailVerification,
  ForgotPassword,
  ForgotPasswordCode,
  NewPassword,
  Signup,
  SignupForm,
  FAQS,
} from '../screens/auth';
import {AddressBook, AddAddressForm} from '../screens/auth';
import {
  BagScreen,
  Categories,
  Home,
  SearchTab,
  WishlistTab,
} from '../screens/common';
import {
  ProfileDisabled,
  ProfileEnabled,
  CategoriesDisabled,
  CategoriesEnabled,
  HomeDisaled,
  HomeEnabled,
  SearchDisabled,
  SearchEnabled,
  HeartDisabled,
  HeartEnabled,
} from '../assets';
import {useSelector} from 'react-redux';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Icon, Icons, Text} from '../components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgUri} from 'react-native-svg';

const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/** stack for my hub screen */
function MyHubStackScreen() {
  const colors = useTheme();
  const isLogedIn = useSelector(state => state.user.isLogedIn);
  const isRegister = useSelector(state => state.user.isUserRegister);
  const isVerified = useSelector(state => state.user.isEmailVerified);

  const initialRouteName = !isLogedIn
    ? isRegister && !isVerified
      ? AUTH.EMAIL_VERIFICATION
      : AUTH.LOGIN
    : AUTH.MYHUB_LOGEDIN;

  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      {!isLogedIn ? (
        <>
          <Stack.Screen
            name={AUTH.LOGIN}
            component={Login}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={AUTH.SIGNUP}
            component={Signup}
            options={() => ({
              title: '',
              headerStyle: {
                backgroundColor: colors.backgroundColor,
              },
              headerShadowVisible: false, // applied here
              headerBackTitleVisible: false,
              headerTintColor: colors.highemphasis,
            })}
          />

          <Stack.Screen
            name={AUTH.SIGNUP_FORM}
            component={SignupForm}
            options={() => ({
              title: '',
              headerStyle: {
                backgroundColor: colors.backgroundColor,
              },
              headerShadowVisible: false, // applied here
              headerBackTitleVisible: false,
              headerTintColor: colors.highemphasis,
            })}
          />

          {!isVerified && (
            <Stack.Screen
              name={AUTH.EMAIL_VERIFICATION}
              component={EmailVerification}
              options={() => ({
                title: ' ',
                headerStyle: {
                  backgroundColor: colors.backgroundColor,
                },
                headerShadowVisible: false, // applied here
                headerBackTitleVisible: false,
                headerTintColor: colors.highemphasis,
              })}
            />
          )}
        </>
      ) : (
        <>
          <Stack.Screen
            name={AUTH.MYHUB_LOGEDIN}
            component={MyHubScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={AUTH.ADDRESS_BOOK}
            component={AddressBook}
            options={() => ({
              title: 'ADDRESS BOOK',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: colors.backgroundColor,
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 14,
              },
              headerShadowVisible: false,
              headerBackTitleVisible: false,
              headerTintColor: colors.highemphasis,
            })}
          />

          <Stack.Screen
            name={AUTH.ADD_ADDRESS}
            component={AddAddressForm}
            options={() => ({
              title: 'ADD ADDRESS',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: colors.backgroundColor,
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 14,
              },
              headerShadowVisible: false, // applied here
              headerBackTitleVisible: false,
              headerTintColor: colors.highemphasis,
            })}
          />

          <Stack.Screen
            name={AUTH.MY_DETAILS}
            component={MyDetails}
            options={() => ({
              title: 'MY DETAILS',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: colors.backgroundColor,
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 14,
              },
              headerShadowVisible: false,
              headerBackTitleVisible: false,
              headerTintColor: colors.highemphasis,
            })}
          />
          <Stack.Screen
            name={AUTH.CHANGE_PASSWORD}
            component={ChangePassword}
            options={() => ({
              title: 'CHANGE PASSWORD',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: colors.backgroundColor,
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 14,
              },
              headerShadowVisible: false,
              headerBackTitleVisible: false,
              headerTintColor: colors.highemphasis,
            })}
          />
          <Stack.Screen
            name={AUTH.NOTIFICATION}
            component={Notification}
            options={() => ({
              title: 'Notification',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: colors.backgroundColor,
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 14,
              },
              headerShadowVisible: false,
              headerBackTitleVisible: false,
              headerTintColor: colors.highemphasis,
            })}
          />
          <Stack.Screen
            name={AUTH.FAQS}
            component={FAQS}
            options={() => ({
              title: 'FAQs',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: colors.backgroundColor,
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 14,
              },
              headerShadowVisible: false,
              headerBackTitleVisible: false,
              headerTintColor: colors.highemphasis,
            })}
          />
        </>
      )}
      <Stack.Screen
        name={AUTH.FORGOT_PASSWORD}
        component={ForgotPassword}
        options={() => ({
          title: ' ',
          headerStyle: {
            backgroundColor: colors.backgroundColor,
          },
          headerShadowVisible: false, // applied here
          headerBackTitleVisible: false,
          headerTintColor: colors.highemphasis,
        })}
      />
      <Stack.Screen
        name={AUTH.FORGOT_PASSWORD_CODE}
        component={ForgotPasswordCode}
        options={() => ({
          title: ' ',
          headerStyle: {
            backgroundColor: colors.backgroundColor,
          },
          headerShadowVisible: false, // applied here
          headerBackTitleVisible: false,
          headerTintColor: colors.highemphasis,
        })}
      />
      <Stack.Screen
        name={AUTH.NEW_PASSWORD}
        component={NewPassword}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

/** categories screen stack */
function CategoriesStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CATEGORIES"
        component={Categories}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="subcategoryscreen"
        component={Subcategories}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
}

/** toptabbar component  */
function MyTopTabBar({state, descriptors, navigation}) {
  const colors = useTheme();
  const isDarkMode = useSelector(state => state.user.clientDarkMode);

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 16,
        height: 48,
        alignItems: 'center',
        backgroundColor: isDarkMode && colors.headerGray,
      }}
    >
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <>
            {label === 'WISHLIST' && !isFocused && (
              <Pressable
                onPress={() => navigation.goBack()}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 22,
                }}
              >
                <Icon
                  name={Icons.ARROW_LEFT}
                  type={'ant'}
                  size={20}
                  color={colors.highemphasis}
                />
              </Pressable>
            )}
            <TouchableOpacity
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                marginRight: 25,
              }}
            >
              <View style={{}}>
                {!isFocused ? (
                  <Text body2 regular lowemphasis>
                    {label}
                  </Text>
                ) : (
                  <Text body2 bold highemphasis>
                    {label}
                  </Text>
                )}
                {isFocused && (
                  <View
                    style={{
                      height: 1,
                      backgroundColor: colors.highemphasis,
                      alignSelf: 'center',
                      width: label === 'WISHLIST' ? 27 : 15,
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
          </>
        );
      })}
    </View>
  );
}

/** wishlist tabs stack */
const WishlistTabs = () => {
  return (
    <TopTab.Navigator tabBar={props => <MyTopTabBar {...props} />}>
      <TopTab.Screen
        options={{
          tabBarLabel: `WISHLIST`,
        }}
        name={COMMON.WISHLIST_SCREEN}
        component={WishlistTab}
      />
      <TopTab.Screen
        options={{
          tabBarLabel: `BAG`,
        }}
        name={COMMON.BAG_SCREEN}
        component={BagScreen}
      />
    </TopTab.Navigator>
  );
};

/** bottom tabbar component */
function MyTabBar(props) {
  const colors = useTheme();
  const {state, descriptors, navigation} = props;
  return (
    <View
      style={{
        backgroundColor: colors.backgroundColor,
        height: Platform.OS === 'android' ? 64 : 70,
        justifyContent: 'center',
        paddingBottom: Platform.OS === 'android' ? 0 : 10,
        paddingHorizontal: 16,
      }}
    >
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              activeOpacity={0.1}
              key={index.toString()}
              accessibilityRole="button"
              accessibilityStates={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{alignItems: 'center', justifyContent: 'center'}}
            >
              {options.tabBarIcon(isFocused)}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

/** tabbar stack */
const MyTabs = ({initialRouteName = COMMON.HOME}) => {
  const isDarkMode = useSelector(state => state.user.clientDarkMode);
  const appLogo = useSelector(state =>
    isDarkMode ? state.user.appLogoDark : state.user.appLogo,
  );
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const statusbarHeight = insets.top;

  /** bottom tabs list */
  const Tabs = [
    {
      name: COMMON.MY_HUB,
      component: MyHubStackScreen,
      title: `MY HUB`,
      iconValue: `MY HUB`,
      icon: <ProfileDisabled fill={colors.lowemphasis} />,
      iconSelected: (
        <ProfileEnabled
          fill={isDarkMode ? colors.whiteColor : colors.blackColor}
        />
      ),
    },
    {
      name: COMMON.CATEGORIES,
      component: CategoriesStackScreen,
      title: `CATEGORIES`,
      iconValue: `CATEGORIES`,
      icon: <CategoriesDisabled fill={colors.lowemphasis} />,
      iconSelected: (
        <CategoriesEnabled
          fill={isDarkMode ? colors.whiteColor : colors.blackColor}
        />
      ),
    },
    {
      name: COMMON.HOME,
      component: Home,
      title: `HOME`,
      iconValue: `HOME`,
      icon: <HomeDisaled fill={colors.lowemphasis} />,
      iconSelected: (
        <HomeEnabled
          fill={isDarkMode ? colors.whiteColor : colors.blackColor}
        />
      ),
    },
    {
      name: COMMON.SEARCH,
      component: SearchTab,
      title: `SEARCH`,
      iconValue: `SEARCH`,
      icon: <SearchDisabled fill={colors.lowemphasis} />,
      iconSelected: (
        <SearchEnabled
          fill={isDarkMode ? colors.whiteColor : colors.blackColor}
        />
      ),
    },
    {
      name: COMMON.WISHLIST,
      component: WishlistTabs,
      title: `WISHLIST`,
      iconValue: `WISHLIST`,
      icon: <HeartDisabled fill={colors.lowemphasis} />,
      iconSelected: (
        <HeartEnabled
          fill={isDarkMode ? colors.whiteColor : colors.blackColor}
        />
      ),
    },
  ];

  /**
   * function to render app logo
   * @param {*} logo logo url
   * @returns React Component
   */
  const getAppLogo = logo => {
    var type = [];
    if (logo !== '') {
      type = logo.split('.');
      return (
        <>
          {type[type.length - 1].includes('svg') ? (
            <SvgUri width={185} height={40} uri={logo} />
          ) : (
            <Image
              style={{height: 40, width: 185}}
              source={{
                uri: logo,
              }}
            />
          )}
        </>
      );
    }
  };

  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      initialRouteName={initialRouteName}
      screenOptions={() => ({
        // headerShown: false,
      })}
    >
      {Tabs.map(item => {
        return (
          <Tab.Screen
            key={item.name}
            name={item.name}
            component={item.component}
            options={{
              header: props => (
                <View
                  style={{
                    height: 48,
                    backgroundColor: colors.lightGray,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: Platform.OS === 'ios' ? statusbarHeight : 0,
                  }}
                >
                  {getAppLogo(appLogo)}
                </View>
              ),
              tabBarLabel: '',
              tabBarIcon: isFocused => (
                <View style={[styles.tabIconName]}>
                  {isFocused ? item.iconSelected : item.icon}
                  <Text
                    overline
                    style={[
                      styles.titleName,
                      {
                        color: isFocused
                          ? colors.highemphasis
                          : colors.lowemphasis,
                      },
                    ]}
                  >
                    {item.iconValue}
                  </Text>
                </View>
              ),
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default MyTabs;
