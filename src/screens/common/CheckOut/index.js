import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, ScrollView, Pressable, BackHandler} from 'react-native';
import {BaseStyle} from '../../../config/styles';
import {useTheme} from '../../../config/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Text,
  Button,
  AddressBookCard,
  ItemPayment,
  Payment,
  History,
  AddAddress,
  ConfirmationModal,
  Icon,
  Icons,
  UpdateAddressModal,
} from '../../../components';
import {
  DarkDelivery,
  DarkPayment,
  DarkReview,
  DeliverySvg,
  PaymentSvg,
  ReviewSvg,
} from '../../../assets';
import styles from './styles';
import {useSelector} from 'react-redux';
import {API, useFetchGet, useFetchPost} from '../../../services';
import {GeneralResponses} from '../../../services/responses';
import {AUTH, COMMON} from '../../../navigation/ROUTES';
import SQLite from 'react-native-sqlite-storage';
import Toast from 'react-native-simple-toast';

const db = SQLite.openDatabase({
  name: 'NagitiveApperal.db',
  location: 'default',
});

const Checkout = ({navigation, route}) => {
  const colors = useTheme();
  const checkoutData = route?.params?.checkoutData;
  const lineItems = route?.params?.lineItems;

 
  

  const isLogedIn = useSelector(state => state.user.isLogedIn);
  const userAccessToken = useSelector(state => state.user.userAccessToken);
  const storeId = useSelector(state => state.user.storeId);
  const uuid = useSelector(state => state.user.uuid);
  const isDarkMode = useSelector(state => state.user.clientDarkMode);

  const [selectedTab, seTSelectedTab] = useState('DELIVERY');
  const [addressData, setAddressData] = useState([]);
  const [updateModal, setUpdateModal] = useState(false);
  const [updateAddModal, setUpdateAddModal] = useState(false);
  const [goForApiCall, setGoForApiCall] = useState(true);
  const [addressToEdit, setAddressToEdit] = useState();
  const [goForOrder, setGoForOrder] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [error, setError] = useState('');

 
  const TopBar = [
    {
      name: `DELIVERY`,
      icon: isDarkMode ? <DarkDelivery /> : <DeliverySvg />,
    },
    {
      name: `REVIEW`,
      icon: isDarkMode ? <DarkReview /> : <ReviewSvg />,
    },
    {
      name: `PAYMENT`,
      icon: isDarkMode ? <DarkPayment /> : <PaymentSvg />,
    },
  ];

  const getDiscount = data => {
    var amount = '';
    for (let i = 0; i < data.length; i++) {
      amount = amount + data[i].amount;
    }
    return amount;
  };

  const data = [
    {
      name: 'SUB-TOTAL',
      value: checkoutData?.total_line_items_price,
    },
    {
      name: 'Tax',
      value: checkoutData?.total_tax,
    },
    {
      name: 'DISCOUNTS & VOUCHERS',
      value: getDiscount(checkoutData?.applied_discounts),
    },
    {
      name: 'DELIVERY',
      value: '0',
    },
    {
      name: 'TOTAL TO PAY',
      value: 'Rs.' + checkoutData?.total_price,
    },
  ];

  /** api call for getting address */
  const addressListApi = useFetchGet(
    API.GET_ADDRESS,
    goForApiCall,
    storeId,
    uuid,
    {},
    userAccessToken,
  );

  const getDiscounts = data => {
    var array = [];
    for (let i = 0; i < data.length; i++) {
      array.push({
        code: data[i].title,
        amount: data[i].value,
        type: data[i].value_type,
      });
    }
    return array;
  };
  /** api call for Create Order */
  const createOrder = useFetchPost(
    API.CREATE_ORDER,
    {
      line_items: lineItems,
      discount_codes: getDiscounts(checkoutData?.applied_discounts),
      billingAdressId: selectedAddress,
      shippingAdressId: selectedAddress,
      // tax_lines: checkoutData.tax_lines,
    },
    goForOrder,
    uuid,
    userAccessToken,
  );

  /** response of api call for Create Order */
  useEffect(() => {
    if (!createOrder.loading) {
      if (createOrder.response?.status === GeneralResponses.STATUS_OK.CODE) {
        db.transaction(tx => {
          tx.executeSql('DELETE FROM Cart', [], (tx, results) => {
            if (results.rowsAffected > 0) {
              Toast.show('Your order is complete!', Toast.SHORT);
              navigation.navigate(COMMON.ORDER_COMPLETE, {
                orderData: createOrder?.response?.data?.data?.order,
              });
            }
          });
        });
      } else if (
        createOrder.response?.status === GeneralResponses.STATUS_500.CODE
      ) {
        setError(createOrder.response?.data?.msg);
      }
    } else {
      console.log('error occured in order api call');
    }
    setGoForOrder(false);
  }, [createOrder.loading]);

  /** response of api call for getting Address list */
  useEffect(() => {
    if (!addressListApi.loading) {
      if (addressListApi.response?.status === GeneralResponses.STATUS_OK.CODE) {
        setAddressData(addressListApi.response?.data);
      }
    } else {
      console.log('error occured in address List api call');
    }
    setGoForApiCall(false);
  }, [addressListApi.loading]);

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

  /** back button conditional action for find id */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: props =>
        props.canGoBack && (
          <Pressable
            style={{marginLeft: 16}}
            {...props}
            testID={`_onPressHeaderLeft`}
            onPress={() => {
              if (selectedTab === 'DELIVERY') {
                navigation.navigate(COMMON.BAG_SCREEN);
              } else if (selectedTab === 'REVIEW') {
                seTSelectedTab('DELIVERY');
              } else if (selectedTab === 'PAYMENT') {
                seTSelectedTab('REVIEW');
              }
            }}
          >
            <Icon
              color={colors.highemphasis}
              size={20}
              name={Icons.ARROW_LEFT}
              type={'ant'}
            />
          </Pressable>
        ),
    });
  });

  /**
   * method to update user address
   */
  const updateAddress = () => {
    setUpdateAddModal(true);
    setUpdateModal(false);
  };

  const goToAddAddress = () => {
    if (isLogedIn) {
      navigation.navigate(COMMON.MY_HUB, {
        screen: AUTH.ADD_ADDRESS,
      });
    } else {
      Toast.show('You have to login first!', Toast.SHORT);
    }
  };

  const Complete_Order = () => {
    setGoForOrder(true);
  };
  return (
    <>
      <ConfirmationModal
        visible={updateModal}
        title={`Sure to edit this address?`}
        primaryText={`Cancel`}
        secondaryText={`Edit`}
        primaryAction={() => setUpdateModal(false)}
        secondaryAction={() => updateAddress()}
      />

      {addressToEdit && (
        <UpdateAddressModal
          visible={updateAddModal}
          addressToEdit={addressToEdit}
          onSwipeComplete={() => setUpdateAddModal(false)}
          onBackdropPress={true}
          onUpdateComplete={() => {
            setUpdateAddModal(false);
            setGoForApiCall(true);
          }}
        />
      )}
      <SafeAreaView
        style={[
          BaseStyle.safeAreaView,
          {backgroundColor: colors.backgroundColor},
        ]}
      >
        <View
          style={[styles.topBarView, {backgroundColor: colors.statusBarGray}]}
        >
          {TopBar.map((item, index) => {
            return (
              <TopBarItems
                key={index.toString()}
                tabName={item.name}
                selectedTab={selectedTab}
                index={index}
                item={item}
              />
            );
          })}
        </View>
        {selectedTab === 'DELIVERY' && (
          <>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewStyle}
            >
              <View style={{marginTop: 26}}>
                {addressData.length > 0 ? (
                  <View>
                    {addressData.map((item, index) => {
                      return (
                        <AddressBookCard
                          key={index.toString()}
                          IsDeliveryAdress={item.IsDeliveryAdress}
                          IsBillingAdress={item.IsBillingAdress}
                          text={item.firstName + ' ' + item.lastName}
                          phnNo={item.phone}
                          add1={item.address1}
                          add2={item.address2}
                          city={item.city}
                          postal={item.zip}
                          isButton={false}
                          onPressUpdate={() => {
                            console.log(item.phone, 'item');
                            setAddressToEdit(item);
                            setUpdateModal(true);
                          }}
                          item={item}
                          selectedAddress={selectedAddress}
                          setSelectedAddress={setSelectedAddress}
                          from={'checkout'}
                        />
                      );
                    })}
                  </View>
                ) : (
                  <>
                    <AddAddress
                      onPress={goToAddAddress}
                      loading={addressListApi.loading}
                    />
                  </>
                )}
              </View>
              <View>
                <Button
                  disabled={!selectedAddress}
                  loading={addressListApi.loading}
                  text="CONFIRM DELIVERY"
                  onPress={() => seTSelectedTab('REVIEW')}
                  buttonStyle={styles.btnStyle}
                  textStyles={{
                    color: isDarkMode ? colors.blackColor : colors.whiteColor,
                  }}
                />
              </View>
            </ScrollView>
          </>
        )}
        {selectedTab === 'REVIEW' && (
          <>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewStyle2}
            >
              <View style={styles.reviewFirstView}>
                <View style={styles.reviewSecondView}>
                  <Text
                    bold
                    body1
                    style={{
                      color: isDarkMode
                        ? colors.whiteColor
                        : colors.highemphasis,
                    }}
                  >
                    {`MY BAG`}
                    <Text
                      regular
                      body1
                      style={{
                        color: isDarkMode
                          ? colors.whiteColor
                          : colors.highemphasis,
                      }}
                    >
                      {` (${lineItems?.length})`}
                    </Text>
                  </Text>
                </View>
                <View>
                  {checkoutData?.line_items.map((item, index) => {
                    return (
                      <History
                        key={index.toString()}
                        type={'Review'}
                        data={item}
                      />
                    );
                  })}
                </View>
              </View>
              <View
                style={[
                  styles.reviewLastView,
                  {backgroundColor: colors.statusBarGray},
                ]}
              >
                {data.map((item, index) => {
                  return (
                    <ItemPayment
                      key={index.toString()}
                      name={item.name}
                      value={item.value}
                      isBold={index === data.length - 1 ? true : false}
                    />
                  );
                })}
                <View>
                  <Button
                    text="CONFIRM ORDER"
                    buttonStyle={styles.btnStyle}
                    onPress={() => seTSelectedTab('PAYMENT')}
                    textStyles={{
                      color: isDarkMode ? colors.blackColor : colors.whiteColor,
                    }}
                  />
                </View>
              </View>
            </ScrollView>
          </>
        )}
        {selectedTab === 'PAYMENT' && (
          <>
            <Payment
              onPress={Complete_Order}
              loading={createOrder.loading}
              error={error}
            />
          </>
        )}
      </SafeAreaView>
    </>
  );
};

export default Checkout;
const TopBarItems = ({key, tabName, selectedTab, testID, index, item}) => {
  const colors = useTheme();

  return (
    <Pressable
      disabled={true}
      key={key}
      testID={testID}
      style={[
        styles.topBarStyle,
        {
          borderRightWidth: index < 2 ? 1 : 0,
          borderRightColor: colors.bordercolor,
        },
      ]}
    >
      <View
        style={[styles.mainView, {opacity: selectedTab !== tabName ? 0.5 : 1}]}
      >
        <View style={styles.secondView}>{item.icon}</View>
        <Text caption1 bold mediumemphasis>
          {tabName}
        </Text>
      </View>
    </Pressable>
  );
};
