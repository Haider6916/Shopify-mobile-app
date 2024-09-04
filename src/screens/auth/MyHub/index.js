import React, {useEffect, useState} from 'react';
import {BackHandler, View} from 'react-native';
import {Text, SubCategoryCard, ConfirmationModal} from '../../../components';
import styles from './styles';
import {DarkModeColors, useTheme} from '../../../config/theme';
import {BaseStyle} from '../../../config/styles';
import {ScrollView, SafeAreaView} from 'react-native';
import {
  AddressIcon,
  FaqIcon,
  LogoutIcon,
  MyDetailsIcon,
  MyOrderIcon,
  NeedHelpIcon,
  PaymentMethodIcon,
  Back,
  OrderHistoryDark,
  MyDetailDark,
  AddressBookDark,
  PaymentMethodDark,
  TermsConditionDark,
  FAQsDark,
} from '../../../assets';
import {AUTH, COMMON} from '../../../navigation/ROUTES';
import {useDispatch, useSelector} from 'react-redux';
import {UserActions} from '../../../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import RNExitApp from 'react-native-exit-app';
import {Pressable} from 'react-native';

const MyHubScreen = ({navigation}) => {
  const colors = useTheme();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const isDarkMode = useSelector(state => state.user.clientDarkMode);

  const [userName, setUserName] = useState('');
  const [goForLogout, setGoForLogout] = useState(false);
  const [openConModal, setOpenConModal] = useState(false);

  /** useEffect for hardware back press */
  useEffect(() => {
    if (isFocused) {
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
      };
    }
  });

  // useEffect(() => {
  //   dispatch(UserActions.onSetShowBag(true));
  //   console.log('--------------hub-----------');
  // });

  /**
   * hardware back button handler
   * @returns true
   */
  const handleBackButton = () => {
    setOpenConModal(true);
    return true;
  };

  /** my hub screens list  */
  const MyHubScreensData = [
    {
      screenName: 'Order History',
      icon: MyOrderIcon,
      iconDark: <OrderHistoryDark />,
      navigateTo: () => navigation.navigate(COMMON.ORDER_HISTORY),
    },
    {
      screenName: 'My Details',
      icon: MyDetailsIcon,
      iconDark: <MyDetailDark />,
      navigateTo: () => navigation.navigate(AUTH.MY_DETAILS),
    },
    {
      screenName: 'Address Book',
      icon: AddressIcon,
      iconDark: <AddressBookDark />,
      navigateTo: () => navigation.navigate(AUTH.ADDRESS_BOOK),
    },
    // {
    //   screenName: 'Payment Methods',
    //   icon: PaymentMethodIcon,
    //   iconDark: <PaymentMethodDark />,
    //   navigateTo: () => console.log(''),
    // },
    {
      screenName: 'Terms & Conditions',
      icon: NeedHelpIcon,
      iconDark: <TermsConditionDark />,
      navigateTo: () => navigation.navigate(COMMON.TERMS_CONDITIONS),
    },
    {
      screenName: 'FAQs',
      icon: FaqIcon,
      iconDark: <FAQsDark />,
      navigateTo: () => navigation.navigate(AUTH.FAQS),
    },
    {
      screenName: 'Log out',
      icon: LogoutIcon,
      iconDark: <Back />,
      navigateTo: () => setGoForLogout(true),
    },
  ];

  /**
   * useEffect to get user Data
   */
  useEffect(() => {
    const getUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@userData');
        return (
          jsonValue != null && setUserName(JSON.parse(jsonValue).firstName)
        );
      } catch (e) {
        console.log('No Data Available', e);
        // error reading value
      }
    };
    getUserData();
  }, []);

  /** function called on press of logout */
  const onLogout = async () => {
    try {
      await AsyncStorage.removeItem('@userData');
      await AsyncStorage.removeItem('@userRegister');
      await AsyncStorage.removeItem('@emailVerified');
      await AsyncStorage.removeItem('@accessToken');
    } catch (e) {
      // saving error
    }
    dispatch(UserActions.onSetUserAccessToken(null));
    setGoForLogout(false);
    dispatch(UserActions.onSetIsEmailVerified(true));
    dispatch(UserActions.onSetIsLoggedIn(false));
  };

  return (
    <>
      <ConfirmationModal
        visible={goForLogout}
        title={`Log out of Negative Apparel?`}
        primaryText={`Cancel`}
        secondaryText={`Log out`}
        primaryAction={() => setGoForLogout(false)}
        secondaryAction={() => onLogout()}
      />
      <ConfirmationModal
        visible={openConModal}
        title={`Are you sure to Exit?`}
        primaryText={`No`}
        secondaryText={`Yes`}
        primaryAction={() => setOpenConModal(false)}
        secondaryAction={() => RNExitApp.exitApp()}
      />
      <SafeAreaView
        style={[
          BaseStyle.safeAreaView,
          {backgroundColor: colors.backgroundColor},
        ]}
      >
        <View
          style={[
            styles.livechatView,
            {
              backgroundColor: isDarkMode
                ? colors.txtInputDarkBack
                : colors.primaryDark,
            },
          ]}
        >
          <View style={styles.livechatView1}>
            <Text
              bold
              title3
              style={{
                color: isDarkMode
                  ? colors.whiteColor
                  : DarkModeColors.highemphasis,
              }}
              numberOfLines={1}
            >{`Hey there, ${userName}!`}</Text>
            <Text
              regular
              caption1
              style={{
                color: isDarkMode
                  ? colors.whiteColor
                  : DarkModeColors.mediumemphasis,
              }}
              numberOfLines={1}
            >{`Find everything related to your account here`}</Text>
          </View>

          {/* <View style={styles.livechatView2}>
            <Text
              bold
              overline
              style={{
                color: isDarkMode
                  ? colors.whiteColor
                  : DarkModeColors.mediumemphasis,
              }}
            >{`Have any questions?`}</Text>
            <Pressable
              style={[
                styles.livechatButton,
                {
                  borderColor: isDarkMode
                    ? colors.whiteColor
                    : DarkModeColors.faint,
                  backgroundColor: isDarkMode
                    ? colors.txtInputDarkBack
                    : colors.primaryDark,
                },
              ]}
            >
              <Text
                style={[
                  styles.livechatText,
                  {
                    color: isDarkMode
                      ? colors.whiteColor
                      : DarkModeColors.mediumemphasis,
                  },
                ]}
              >
                {`Live Chat`}
              </Text>
            </Pressable>
          </View> */}
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {MyHubScreensData.map((item, index) => {
            return (
              <View style={styles.itemView} key={index.toString()}>
                <SubCategoryCard
                  text={item.screenName}
                  image={item.icon}
                  imageDark={item.iconDark}
                  imageStyle={styles.itemViewImage}
                  imageViewStyle={item.imageViewStyle}
                  color={
                    isDarkMode
                      ? 'rgba(24, 24, 24, 1)'
                      : `rgba(243, 243, 243, 1)`
                  }
                  viewColor={
                    isDarkMode
                      ? 'rgba(38, 38, 38, 1)'
                      : `rgba(230, 230, 230, 1)`
                  }
                  navigateTo={item.navigateTo}
                />
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
export default MyHubScreen;
