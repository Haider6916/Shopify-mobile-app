import {BackHandler, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import CheckOutComplete from '../../../components/CheckoutCompleted';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BaseStyle} from '../../../config/styles';
import {useTheme} from '../../../config/theme';
import {Button} from '../../../components';
import {COMMON} from '../../../navigation/ROUTES';
import styles from '../Subcategories/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderComplete = ({navigation, route}) => {
  const colors = useTheme();
  const orderData = route?.params?.orderData;
  const [email, setEmail] = useState('');

  /**
   * useEffect to get user Data
   */
  useEffect(() => {
    const getUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@userData');
        return jsonValue != null && setEmail(JSON.parse(jsonValue).email);
      } catch (e) {
        console.log('No Data Available', e);
        // error reading value
      }
    };
    getUserData();
  }, []);
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  });

  /**
   * hardware back button handler
   * @returns true
   */
  const handleBackButton = () => {
    return true;
  };
  return (
    <SafeAreaView
      style={[
        BaseStyle.safeAreaView,
        {backgroundColor: colors.backgroundColor},
      ]}
    >
      <ScrollView
        style={[BaseStyle.container]}
        contentContainerStyle={{flexGrow: 1, marginBottom: 16}}
      >
        <CheckOutComplete email={email} orderData={orderData} />
        <Button
          text="BACK TO HOME"
          buttonStyle={styles.btnStyle}
          onPress={() => {
            navigation.navigate(COMMON.HOME);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderComplete;
