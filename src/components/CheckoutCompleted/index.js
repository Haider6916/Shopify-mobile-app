import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Vector} from '../../assets';
import {Text} from '..';
import {View} from 'react-native';
import styles from './styles';
import {BaseStyle} from '../../config/styles';
import {useTheme} from '../../config/theme';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-simple-toast';

const CheckoutCompleted = ({email, orderData}) => {
  const colors = useTheme();

  /** method to copy some string */
  const copyToClipboard = text => {
    Clipboard.setString(text.toString());
    Toast.show('Tracking ID Copied to Clipboard', Toast.SHORT);
  };

  return (
    <SafeAreaView
      style={[
        BaseStyle.safeAreaView,
        styles.safeAreaViewStyle,
        {backgroundColor: colors.lightGray},
      ]}
    >
      <Vector style={styles.VectorIcon}></Vector>
      <Text
        textAlign="center"
        semibold
        highemphasis
        title1
      >{`Your order is complete!`}</Text>
      <View style={styles.firstView}>
        <Text
          textAlign="center"
          regular
          highemphasis
          body2
        >{`Expected delivery date: 10th January, 2023`}</Text>
      </View>
      {/* <View style={styles.firstView}>
        <OrderSummary />
      </View> */}
      {/* <View style={[styles.subView, {backgroundColor: colors.statusBarGray}]}>
        <View style={styles.IconStyle}>
          <Info />
        </View>
        <View style={styles.txtStyle}>
          <Text
            regular
            body2
            lowemphasis
            style={
              styles.lineStyle
            }>{`Due to Ashura holidays, you may experience delayed delivery. Your order details have been processed, we will update you as soon as services resume as per routine`}</Text>
        </View>
      </View> */}
      {/* <Text
        body2
        regular
        lowemphasis
        textAlign="center"
      >{`Courier Service: Leopards Courier Services`}</Text>
      <View style={styles.subView2}>
        <Text body2 highemphasis regular>
          {`Tracking ID:`}
        </Text>
        <Text body highemphasis semibold>
          {orderData?.id}
        </Text>
        <Pressable
          onPress={() => copyToClipboard(orderData?.id)}
          style={[
            styles.copyIconStyle,
            {backgroundColor: colors.statusBarGray},
          ]}
        >
          <Icon
            name={Icons.COPY}
            type={`MaterialCommunity`}
            size={15}
            color="black"
          />
        </Pressable>
      </View> */}
      <Text body2 regular mediumemphasis textAlign="center">
        {`An email with the complete transaction receipt has been sent to`}{' '}
        <Text body2 bold mediumemphasis>
          {email}
        </Text>
      </Text>
    </SafeAreaView>
  );
};
export default CheckoutCompleted;
