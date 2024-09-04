import {View, StyleSheet, ScrollView, Pressable} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import Text from '../Text';
import {useTheme} from '../../config/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BaseStyle} from '../../config/styles';
import Toast from 'react-native-simple-toast';
import {Icon, Icons, Button} from '..';
import {
  Bank,
  Lock,
  MasterCard,
  Money,
  Visa,
  BiggerPayment,
  BiggerDelivery,
  LockDark,
} from '../../assets';
import Clipboard from '@react-native-community/clipboard';
import {useSelector} from 'react-redux';

const Payment = ({onPress, loading, error}) => {
  const colors = useTheme();
  const [selected, setSelected] = useState(0);
  const isDarkMode = useSelector(state => state.user.clientDarkMode);

  const copyToClipboard = text => {
    Clipboard.setString(text);
    Toast.show('Account No Copied to Clipboard', Toast.SHORT);
  };

  const [list] = useState([
    // {
    //   id: 1,
    //   title: 'Debit/Credit Card',
    //   description: 'Next Phase',
    //   body:
    //     'After tapping “Continue Payment”, you will be redirected to complete your purchase securely.',
    //   svg1: <Visa />,
    //   svg2: <MasterCard />,
    //   svg3: <BiggerPayment />,
    // },
    // {
    //   id: 2,
    //   title: 'Online Payment',
    //   description: 'Next Phase',
    //   body:
    //     'After tapping “Continue to Payment”, you will be redirected to complete your purchase securely.',
    //   svg1: <Visa />,
    //   svg2: <MasterCard />,
    //   svg3: <BiggerPayment />,
    // },
    {
      id: 3,
      title: 'Cash On Delivery (COD)',
      body: 'Cash on Delivery is provided all across Pakistan.',
      svg1: <Money />,
      svg3: <BiggerDelivery />,
    },
    {
      id: 4,
      title: 'Online Bank Transfer',
      svg1: <Bank />,
    },
  ]);

  /** list header component */
  const _head = (item, index) => {
    return (
      <Pressable
        key={index.toString()}
        onPress={() => setSelected(selected === item.id ? 0 : item.id)}
        style={StyleSheet.flatten([
          selected !== item.id
            ? styles.noticeViewNotExpanded
            : styles.noticeViewExpanded,

          ,
          {
            backgroundColor: isDarkMode
              ? colors.txtInputDarkBack
              : colors.statusBarGray,
          },
        ])}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            opacity: selected !== item.id ? 0.3 : 1,
          }}
        >
          <View
            style={{
              flex: 0.1,
              justifyContent: 'center',
              marginRight: 13,
            }}
          >
            {selected !== item.id ? (
              <View
                style={{
                  height: 17,
                  width: 17,
                  borderRadius: 12,
                  borderColor: isDarkMode
                    ? colors.mediumemphasis
                    : colors.blackColor,
                  borderWidth: 3,
                }}
              ></View>
            ) : (
              <View
                style={{
                  height: 17,
                  width: 17,
                  borderRadius: 12,
                  borderColor: isDarkMode
                    ? colors.mediumemphasis
                    : colors.blackColor,
                  borderWidth: 3,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    height: 9,
                    width: 9,
                    borderRadius: 5,
                    backgroundColor: isDarkMode
                      ? colors.mediumemphasis
                      : colors.blackColor,
                  }}
                ></View>
              </View>
            )}
          </View>
          <View style={{flex: 1}}>
            <Text bold title4 mediumemphasis>
              {item.title}
            </Text>
            {item.description && (
              <Text overline medium faint>
                {`This will be avaliable in `}
                <Text heavy overline faint>
                  {item.description}
                </Text>
              </Text>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {item.svg1 && item.svg1}
            <View style={{marginLeft: 5}}>{item.svg2 && item.svg2}</View>
          </View>
        </View>
      </Pressable>
    );
  };

  /** list body component */
  const _body = (item, index) => {
    const isDarkMode = useSelector(state => state.user.clientDarkMode);
    return (
      <>
        {selected === item.id && (
          <View
            style={[
              styles.body,
              {
                backgroundColor: isDarkMode ? colors.btnTxt : colors.whiteColor,
                flexDirection: 'row',
                alignItems: 'center',
                height: 140,
              },
            ]}
          >
            {item.svg3 ? (
              <View
                style={{
                  backgroundColor: isDarkMode
                    ? colors.bordercolor
                    : colors.lightGray,
                  height: 75,
                  width: 75,
                  borderRadius: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {item.svg3 && item.svg3}
              </View>
            ) : (
              <ScrollView
                indicatorStyle={'black'}
                showsVerticalScrollIndicator={true}
                showsHorizontalScrollIndicator={true}
                style={[styles.body2]}
              >
                <View style={{marginBottom: 20}}>
                  <Text mediumemphasis heavy>
                    {`Faysal Bank`}
                  </Text>
                  <Text mediumemphasis regular>
                    {`Negative Apperal Clothing Co.`}
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text mediumemphasis regular>
                      {`Account #:`}
                      <Text mediumemphasis heavy>
                        {`3062301000003841`}
                      </Text>
                    </Text>
                    <Pressable
                      onPress={() => copyToClipboard('3062301000003841')}
                      style={{
                        borderRadius: 15,
                        width: 24,
                        height: 24,
                        backgroundColor: isDarkMode
                          ? colors.txtInputDarkBack
                          : colors.backgroundColor,
                        marginLeft: 6,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Icon
                        name={Icons.COPY}
                        type={'MaterialCommunityIcons'}
                        color={isDarkMode ? 'rgba(99, 99, 99, 1)':colors.highemphasis}
                        size={14}
                      />
                    </Pressable>
                  </View>
                </View>
                <View style={{marginBottom: 15}}>
                  <Text mediumemphasis heavy>
                    {`Bank Alfalah`}
                  </Text>
                  <Text mediumemphasis regular>
                    {`Negative Apperal`}
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text mediumemphasis regular>
                      {`Account #:`}
                      <Text mediumemphasis heavy>
                        {`04081007418709`}
                      </Text>
                    </Text>
                    <Pressable
                      onPress={() => copyToClipboard('04081007418709')}
                      style={{
                        borderRadius: 15,
                        width: 24,
                        height: 24,
                        backgroundColor: isDarkMode
                          ? colors.txtInputDarkBack
                          : colors.backgroundColor,
                        marginLeft: 6,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Icon
                        name={Icons.COPY}
                        type={'MaterialCommunityIcons'}
                        color={isDarkMode ? 'rgba(99, 99, 99, 1)':colors.highemphasis}
                        size={14}
                      />
                    </Pressable>
                  </View>
                </View>
                <View>
                  <Text backgroundColor regular>
                    {`Please share the receipt with us at `}
                    <Text backgroundColor heavy>
                      {`support@negativeapparel.com `}
                    </Text>
                    {`along with your order number`}
                  </Text>
                </View>
              </ScrollView>
            )}
            <Text
              regular
              overline
              faint
              style={{textAlign: 'justify', marginLeft: 10, flex: 1}}
            >
              {item.body}
            </Text>
          </View>
        )}
      </>
    );
  };

  return (
    <SafeAreaView
      style={[
        BaseStyle.safeAreaView,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}
    >
      <View
        style={{
          flexGrow: 1,
          justifyContent: 'space-between',
          marginHorizontal: 16,
        }}
      >
        <View>
          <Text bold body1 highemphasis style={{marginTop: 25}}>
            {`CHOOSE A PAYMENT METHOD`}
          </Text>
          <View style={{marginBottom: 34}}>
            <Text
              regular
              caption1
              style={{
                color: isDarkMode ? colors.lowemphasis : colors.highemphasis,
              }}
            >
              {isDarkMode ? <LockDark /> : <Lock fill={colors.highemphasis} />}{' '}
              {`All transactions are secure and encrypted`}
            </Text>
          </View>
          {list.map((item, index) => {
            return (
              <View key={index.toString()}>
                {_head(item, index)}
                {_body(item, index)}
              </View>
            );
          })}
        </View>
        <Text iserror>{error}</Text>
        <View style={{marginBottom: 15}}>
          <Button
            loading={loading}
            disabled={selected === 3 || selected === 4 ? false : true}
            text="COMPLETE ORDER"
            onPress={onPress}
            textStyles={{
              color: isDarkMode ? colors.blackColor : colors.whiteColor,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Payment;
