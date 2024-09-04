import React, {useEffect, useState} from 'react';
import {View, Pressable, ScrollView, BackHandler} from 'react-native';
import {
  Text,
  Icon,
  Icons,
  Button,
  TextInput,
  BagItemCard,
  ConfirmationModal,
  NoRecordFound,
  SignupModal,
  LoginModal,
  ForgetModal,
} from '../../../components';
import styles from './styles';
import {useTheme} from '../../../config/theme';
import {COMMON} from '../../../navigation/ROUTES';
import {useIsFocused} from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';
import {AccordionList} from 'accordion-collapse-react-native';
import {API, useFetchDelete, useFetchPost} from '../../../services';
import {useDispatch, useSelector} from 'react-redux';
import {GeneralResponses} from '../../../services/responses';
import Toast from 'react-native-simple-toast';
import {withCommas} from '../../../utils/numberFormating';
import RNExitApp from 'react-native-exit-app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserActions} from '../../../redux/actions';
import BagLoader from './Loader';

const db = SQLite.openDatabase({
  name: 'NagitiveApperal.db',
  location: 'default',
});

const BagScreen = ({navigation}) => {
  const colors = useTheme();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const isLogedIn = useSelector(state => state.user.isLogedIn);
  const uuid = useSelector(state => state.user.uuid);
  const isDarkMode = useSelector(state => state.user.clientDarkMode);
  const userAccessToken = useSelector(state => state.user.userAccessToken);
  const isRegister = useSelector(state => state.user.isUserRegister);
  const isVerified = useSelector(state => state.user.isEmailVerified);

  const [wishlist, setWishlist] = useState(global.wishlist);
  const [code, setCode] = useState('');
  const [goForDelete, setGoForDelete] = useState(false);
  const [itemToDelete, setItemToDelete] = useState();
  const [totalAmount, setTotalAmount] = useState('');
  const [totalCompAmount, setTotalCompAmount] = useState('');
  const [discount, setDiscount] = useState('');
  const [data, setData] = useState([]);
  const [checkoutData, setCheckoutData] = useState([]);
  const [goForRemove, setGoForRemove] = useState(false);
  const [goForAdd, setGoForAdd] = useState(false);
  const [goForCheckout, setGoForCheckout] = useState(false);
  const [openConModal, setOpenConModal] = useState(false);
  const [productForWishlist, setProductWishlist] = useState([]);
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [forgetModal, setForgetModal] = useState(false);
  const [loading, setloading] = useState(true);

  const list = [
    {
      id: 1,
    },
  ];

  /** api call for checkout */
  const checkoutApi = useFetchPost(
    API.ADD_CHECKOUT,
    {
      checkout: {
        line_items: checkoutData,
        discount_code: discount,
      },
    },
    goForCheckout,
    uuid,
  );

  /** api call for adding product to wishlist */
  const addWishList = useFetchPost(
    API.ADD_WISHLIST,
    {
      productId: productForWishlist.product_id,
      title: productForWishlist.title,
      price: productForWishlist.total_price,
      Images: {src: productForWishlist.image},
    },
    goForAdd,
    uuid,
    userAccessToken,
  );

  /** api call for deleting product from wishlist */
  const deleteWishList = useFetchDelete(
    API.DEL_WISHLIST,
    {
      productId: productForWishlist.product_id,
    },
    goForRemove,
    uuid,
    userAccessToken,
  );

  // useEffect(() => {
  //   dispatch(UserActions.onSetShowBag(false));
  //   console.log('--------------bag-----------');
  // });

  /**  method to get cart data from local db */
  useEffect(() => {
    getDataFromDb();
    getDiscount();
  }, [isFocused]);

  /** response of api call for adding product to wishlist */
  useEffect(() => {
    if (!addWishList.loading) {
      if (addWishList.response?.status === GeneralResponses.STATUS_OK.CODE) {
        console.log('Added to wishlist');
      }
    } else {
      console.log('error occured in add to wishlist api');
    }
    setGoForAdd(false);
  }, [addWishList.loading]);

  /** response of api call for CheckOut */
  useEffect(() => {
    console.log(checkoutApi);
    if (!checkoutApi.loading) {
      if (checkoutApi.response?.status === GeneralResponses.STATUS_OK.CODE) {
        Toast.show('Checkout Added!', Toast.SHORT);
        setTimeout(() => {
          navigation.navigate(
            COMMON.CHECK_OUT,
            {
              checkoutData: checkoutApi?.response?.data?.data?.checkout,
              lineItems: checkoutData,
              discount_code: discount,
            },
            300,
          );
        });
      }
    } else {
      console.log(checkoutApi.response?.data.msg);
    }
    setGoForCheckout(false);
  }, [checkoutApi.loading]);

  /** response of api call deleting product from wishlist */
  useEffect(() => {
    if (!deleteWishList.loading) {
      if (deleteWishList.response?.status === GeneralResponses.STATUS_OK.CODE) {
        console.log('Remove from wishlist');
      }
    } else {
      console.log('error occured in remove from wishlist api');
    }
    setGoForRemove(false);
  }, [deleteWishList.loading]);

  useEffect(() => {
    if (isFocused) {
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
      };
    }
  });

  const getDiscount = async () => {
    try {
      const discount = await AsyncStorage.getItem('@discountCode');
      setDiscount(discount);
    } catch (e) {
      console.log('No Discount Code Available', e);
      // error reading value
    }
  };

  /**
   * hardware back button handler
   * @returns true
   */
  const handleBackButton = () => {
    setOpenConModal(true);
    return true;
  };

  /** method to deal with toggle favourite */
  // const addToWishlist = item => {
  //   if (isLogedIn) {
  //     setProductWishlist(item);
  //     if (wishlist.has(item.product_id)) {
  //       onDelete(item);
  //       // setGoForRemove(true);
  //       // setWishlist(prev => {
  //       //   let temp = new Set(prev);
  //       //   temp.delete(item.product_id);
  //       //   return temp;
  //       // });
  //       // global.wishlist.delete(item.product_id);
  //     } else {
  //       setGoForAdd(true);
  //       setWishlist(prev => {
  //         let temp = new Set(prev);
  //         temp.add(item.product_id);
  //         return temp;
  //       });
  //       global.wishlist.add(item.product_id);
  //       onDelete(item);
  //     }
  //   } else {
  //     Toast.show('You Have To Login First', Toast.SHORT);
  //     if (!isLogedIn) {
  //       if (isRegister && !isVerified) {
  //         setSignupModal(true);
  //       } else setLoginModal(true);
  //     }
  //   }
  // };

  /**
   * method to get cart data from local db
   */
  const getDataFromDb = async () => {
    const query = `select SUM(quantity) as total_quantity, SUM(price*quantity) as total_price,SUM(compare_at_price*quantity) as total_compare_price, * from Cart where orderSubmitted='0' group by variant_id`;
    const data = [];
    const checkout = [];

    var total_amount = 0;
    var total_comp_Price = 0;
    await db.transaction(tx => {
      tx.executeSql(query, [], (tx, results) => {
        const len = results.rows.length;
        if (len > 0) {
          for (let i = 0; i < len; i++) {
            data.push(results.rows.item(i));
            checkout.push({
              variant_id: results.rows.item(i).variant_id,
              quantity: results.rows.item(i).total_quantity,
              image: results.rows.item(i).image,
              title: results.rows.item(i).title,
              prodPrice: results.rows.item(i).price,
              size: results.rows.item(i).size,
              color: results.rows.item(i).color,
              style: results.rows.item(i).style,
              material: results.rows.item(i).material,
            });
            total_amount = total_amount + results.rows.item(i).total_price;
            total_comp_Price =
              total_comp_Price + results.rows.item(i).total_compare_price;
          }
        }

        setData(data);
        setCheckoutData(checkout);
        setTotalAmount(total_amount);
        setTotalCompAmount(total_comp_Price);
        setloading(false);
      });
    });
  };

  /**
   * method will be called on delete from Cart
   */
  const onDelete = async item => {
    let deleteCart = `DELETE FROM Cart where variant_id='${item.variant_id}'`;
    await db.transaction(tx => {
      tx.executeSql(deleteCart, [], (tx, results) => {
        if (results.rowsAffected > 0) {
          getDataFromDb();
          setGoForDelete(false);
        }
      });
    });
  };

  /**
   * method will be called to update quantity
   */
  const updateQuan = async (sign, item) => {
    console.log(sign, item);

    let updateCart = `UPDATE Cart SET quantity='${
      sign === '+' ? item.total_quantity + 1 : item.total_quantity - 1
    }' `;
  };

  /**
   * method will render head of accordian
   * @param {*} isExpanded accordian is expended or not
   * @returns React element
   */
  const _head = (item, index, isExpanded) => {
    return (
      <View style={styles.discountInner}>
        <View>
          <Text bold headline highemphasis>
            {!isExpanded ? `Have a Discount Code?` : `Discount/Voucher Code`}
          </Text>
        </View>
        <View style={styles.arrowIcon}>
          <Icon
            name={isExpanded ? Icons.ANGLE_DOWN : Icons.ANGLE_UP}
            size={20}
            color={colors.highemphasis}
          />
        </View>
      </View>
    );
  };

  /**
   * method called onpress of Check Out
   */
  const checkOut = () => {
    console.log(checkoutData, 'createOrder');
    if (!isLogedIn) {
      Toast.show('You Have To Login First', Toast.SHORT);
      if (isRegister && !isVerified) {
        setSignupModal(true);
      } else setLoginModal(true);
    } else {
      setGoForCheckout(true);
    }
  };

  const pressed = (item) =>{
    // addToWishlist(item)
    console.log('pressed');
    if (isLogedIn) {
      setProductWishlist(item);
      if (wishlist.has(item.product_id)) {
        onDelete(item);
        setGoForAdd(true);
        // setGoForRemove(true);
        // setWishlist(prev => {
        //   let temp = new Set(prev);
        //   temp.delete(item.product_id);
        //   return temp;
        // });
        // global.wishlist.delete(item.product_id);
      } else {
        setGoForAdd(true);
        setWishlist(prev => {
          let temp = new Set(prev);
          temp.add(item.product_id);
          return temp;
        });
        global.wishlist.add(item.product_id);
        onDelete(item);
      }
    } else {
      Toast.show('You Have To Login First', Toast.SHORT);
      if (!isLogedIn) {
        if (isRegister && !isVerified) {
          setSignupModal(true);
        } else setLoginModal(true);
      }
    }
  }

  /**
   * method will render body of accordian
   * @returns React element
   */
  const _body = () => {
    return (
      <View style={styles.openedView}>
        <TextInput
          value={code}
          // keyboardType={`numeric`}
          onChangeText={text => setCode(text)}
          style={[styles.input, {backgroundColor: colors.backgroundColor}]}
          placeholder={`Enter Discount Code Here`}
        />
        <Button
          buttonStyle={[
            styles.buttonStyle,
            {
              borderColor: isDarkMode ? colors.whiteColor : colors.bordercolor,
            },
          ]}
          textStyles={[
            styles.textStyles,
            {color: isDarkMode ? colors.blackColor : colors.mediumemphasis},
          ]}
          buttonColor={colors.statusBarGray}
          text={'APPLY'}
        />
      </View>
    );
  };
  if (loading) return <BagLoader />;
  return (
    <>
      <LoginModal
        visible={loginModal}
        navigation={navigation}
        onSwipeComplete={() => setLoginModal(false)}
        createPress={() => {
          setSignupModal(true);
          setLoginModal(false);
        }}
        loginPress={() => {
          setLoginModal(false);
          setGoForCheckout(true);
          Toast.show('Now You can add Item to WishList', Toast.SHORT);
        }}
        onForget={() => {
          setForgetModal(true);
          setLoginModal(false);
        }}
        onBackdropPress
      />
      <SignupModal
        visible={signupModal}
        navigation={navigation}
        onSwipeComplete={() => setSignupModal(false)}
        emailOnLoginPress={() => {
          setSignupModal(false);
          setLoginModal(true);
        }}
        endVarification={() => {
          setGoForCheckout(true);
          setSignupModal(false);
        }}
        indicate={isRegister && !isVerified ? '3' : '1'}
        onBackdropPress
      />
      <ForgetModal
        visible={forgetModal}
        onSwipeComplete={() => setForgetModal(false)}
        endForget={() => {
          setLoginModal(true);
          setForgetModal(false);
        }}
        onBackdropPress
      />
      <ConfirmationModal
        visible={goForDelete}
        title={`Sure to remove from bag?`}
        primaryText={`Cancel`}
        secondaryText={`Remove`}
        primaryAction={() => setGoForDelete(false)}
        secondaryAction={() => onDelete(itemToDelete)}
      />
      <ConfirmationModal
        visible={openConModal}
        title={`Are you sure to Exit?`}
        primaryText={`No`}
        secondaryText={`Yes`}
        primaryAction={() => setOpenConModal(false)}
        secondaryAction={() => RNExitApp.exitApp()}
      />

      <View
        style={[styles.bagCompView, {backgroundColor: colors.backgroundColor}]}
      >
        <ScrollView
          // showsHorizontalScrollIndicator={false}
          // showsVerticalScrollIndicator={false}
          style={styles.bagItemsView}
        >
          <>
            {data.length > 0 ? (
              <>
                {data.map((item, index) => {
                  return (
                    <View key={index.toString()}>
                      <BagItemCard
                        onPressDelete={() => {
                          setGoForDelete(true);
                          setItemToDelete(item);
                        }}
                        updateQuan={sign => {
                          updateQuan(sign, item);
                        }}
                        goToDetail={() => {
                          navigation.navigate(COMMON.PRODUCTS_DETAIL, {
                            productData: {
                              id: item.product_id,
                            },
                          });
                        }}
                        image={item.image}
                        title={item.title}
                        size={item.size}
                        color={item.color}
                        currency={'Rs.'}
                        price={withCommas(item.price)}
                        quantity={item.total_quantity}
                        btnText={'MOVE TO WISHLIST'}
                        item={item}
                        // toggleFavourite={() => addToWishlist(item)}
                        toggleFavourite={()=>pressed(item)}
                      />
                    </View>
                  );
                })}
              </>
            ) : (
              <NoRecordFound
                isSearch={false}
                discription={`Nothing is added in Bag`}
                isButton={false}
              />
            )}
          </>
        </ScrollView>

        {data.length > 0 && (
          <View>
            {/* <View
              style={[styles.discount, {backgroundColor: colors.statusBarGray}]}
            >
              <AccordionList
                showsVerticalScrollIndicator={false}
                list={list}
                header={_head}
                body={_body}
                keyExtractor={item => `${item.id}`}
              />
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text caption1 regular lowemphasis>
                  {`Applied Discounts: `}
                </Text>
                <View
                  style={[
                    styles.crossView,
                    {backgroundColor: colors.headerGray},
                  ]}
                >
                  <Text caption1 bold mediumemphasis>{`APP20`}</Text>
                  <Pressable
                    style={[styles.crossIcon, {backgroundColor: colors.faint}]}
                  >
                    <Icon
                      name={Icons.CROSS}
                      size={9}
                      color={colors.whiteColor}
                    ></Icon>
                  </Pressable>
                </View>
              </View>
            </View> */}
            <View style={styles.main}>
              <View style={styles.mainInner}>
                <View style={styles.amountView}>
                  <Text bold caption1 highemphasis numberOfLines={1}>
                    {`TOTAL:  `}
                    <Text
                      overline
                      lowemphasis
                      numberOfLines={1}
                    >{`(inclusive of delivery and discounts)`}</Text>
                  </Text>
                </View>
                <View>
                  {totalAmount !== totalCompAmount && (
                    <Text
                      bold
                      caption1
                      primaryLight
                      numberOfLines={1}
                      style={{
                        textDecorationLine: 'line-through',
                        textDecorationColor: colors.errorColor,
                      }}
                    >
                      {`Rs.`}
                      <Text body1 heavy textPrimaryBold numberOfLines={1}>
                        {withCommas(totalCompAmount)}
                      </Text>
                    </Text>
                  )}

                  <Text bold caption1 primaryLight numberOfLines={1}>
                    {`Rs.`}
                    <Text
                      body1
                      heavy
                      style={{
                        color: isDarkMode
                          ? colors.highemphasis
                          : colors.textPrimaryBold,
                      }}
                      numberOfLines={1}
                    >
                      {withCommas(totalAmount)}
                    </Text>
                  </Text>
                </View>
                {/* <Text bold caption1 primaryLight numberOfLines={1}>
                  {`Rs.`}
                  <Text body1 heavy textPrimaryBold numberOfLines={1}>
                    {withCommas(totalAmount)}
                  </Text>
                </Text> */}
              </View>
              <Button
                loading={checkoutApi.loading}
                text={'CHECKOUT'}
                onPress={checkOut}
                textStyles={{
                  color: isDarkMode ? colors.btnTxt : colors.whiteColor,
                }}
                // onPress={() => navigation.navigate(COMMON.CHECK_OUT)}
              />
            </View>
          </View>
        )}
      </View>
    </>
  );
};

export default BagScreen;
