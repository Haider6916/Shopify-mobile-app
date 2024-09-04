import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  ProductDetail,
  ProductsScreen,
  Splash,
  Checkout,
  OrderHistory,
  TermsConditions,
  OrderComplete,
  Subcategories,
} from '../screens/common';
import {COMMON} from './ROUTES';
import {createStackNavigator} from '@react-navigation/stack';
import MyTabs from './MyTabs';
import {useTheme} from '../config/theme';
import {useDispatch, useSelector} from 'react-redux';
import {View, StatusBar, Platform, SafeAreaView, Vibration} from 'react-native';
import {
  checkInternetConnection,
  offlineActionCreators,
} from 'react-native-offline';
import {NoInternetModal, WishListBag} from '../components';
import {UserActions} from '../redux/actions';

const Stack = createStackNavigator();

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

/** custom status bar */
const MyStatusBar = ({backgroundColor, isDarkMode, ...props}) => (
  <View
  // style={[{height: STATUSBAR_HEIGHT, backgroundColor}]}
  >
    <SafeAreaView>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        // backgroundColor={backgroundColor}
        // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        // {...props}
      />
    </SafeAreaView>
  </View>
);

/** main navigator */
const Navigator = ({}) => {
  const colors = useTheme();
  const dispatch = useDispatch();

  const isDarkMode = useSelector(state => state.user.clientDarkMode);
  const showBag = useSelector(state => state.user.showBag);
  const itmesInBag = useSelector(state => state.user.itemInBag);
  const isConnected = useSelector(state => state.network.isConnected);

  const [retrying, setRetrying] = useState(false);

  /** function called on press of retry button */
  const onRetry = async () => {
    setRetrying(true);
    const ic = await checkInternetConnection();
    const {connectionChange} = offlineActionCreators;
    dispatch(connectionChange(ic));
    setTimeout(() => {
      setRetrying(false);
    }, 500);
  };

  return (
    <>
      {/* status bar */}
      <MyStatusBar
        backgroundColor={colors.statusBarGray}
        isDarkMode={isDarkMode}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />

      {/* no internet modal */}
      <NoInternetModal
        visible={!isConnected}
        testID={`_noInternetModal`}
        primaryAction={onRetry}
        retrying={retrying}
      />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={COMMON.SPLASH}
            component={Splash}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={COMMON.MY_TABS}
            component={MyTabs}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={COMMON.CHECK_OUT}
            component={Checkout}
            options={() => ({
              title: 'CHECKOUT',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: colors.backgroundColor,
                height: 45,
              },
              headerTitleStyle: {
                fontWeight: '600',
                fontSize: 12,
                color: colors.highemphasis,
              },
              headerShadowVisible: false, // applied here
              headerBackTitleVisible: false,
            })}
          />

          <Stack.Screen
            name={COMMON.PRODUCTS}
            component={ProductsScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={COMMON.PRODUCTS_DETAIL}
            component={ProductDetail}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={COMMON.ORDER_HISTORY}
            component={OrderHistory}
            options={() => ({
              title: 'ORDER HISTORY',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: colors.backgroundColor,
              },
              headerTitleStyle: {
                fontWeight: '700',
                fontSize: 14,
                color: colors.highemphasis,
              },
              headerShadowVisible: false, // applied here
              headerBackTitleVisible: false,
              headerTintColor: colors.highemphasis,
            })}
          />

          <Stack.Screen
            name={COMMON.TERMS_CONDITIONS}
            component={TermsConditions}
            options={() => ({
              title: 'TERMS & CONDITIONS',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: colors.backgroundColor,
              },
              headerTitleStyle: {
                fontWeight: '700',
                fontSize: 14,
                color: colors.highemphasis,
              },
              headerShadowVisible: false, // applied here
              headerBackTitleVisible: false,
              headerTintColor: colors.highemphasis,
            })}
          />

          <Stack.Screen
            name={COMMON.ORDER_COMPLETE}
            component={OrderComplete}
            options={() => ({
              title: 'CHECKOUT',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: colors.backgroundColor,
                height: 45,
              },
              headerTitleStyle: {
                fontWeight: '600',
                fontSize: 12,
                color: colors.highemphasis,
              },
              headerShadowVisible: false, // applied here
              headerBackTitleVisible: false,
              headerLeft: null,
            })}
          />

          <Stack.Screen
            name={COMMON.SUB_CATEGORY}
            component={Subcategories}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
        {/* {showBag && itmesInBag > 0 ? (
          <WishListBag
            onLongPress={() => {
              Vibration.vibrate(300);
              dispatch(UserActions.onSetAllowScroll(false));
            }}
            onRelease={() => {
              dispatch(UserActions.onSetAllowScroll(true));
            }}
            onShortPressRelease={() => {
              console.log('short');
              // navigation.navigate(COMMON.WISHLIST, {
              //   screen: COMMON.BAG_SCREEN,
              // });
            }}
            count={itmesInBag}
            bottom={150}
          />
        ) : (
          <></>
        )} */}
      </NavigationContainer>
    </>
  );
};

export default Navigator;
