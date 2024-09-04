import React, {useRef, useState, useEffect} from 'react';
import {BaseStyle} from '../../../config/styles';
import {
  View,
  Dimensions,
  Image,
  Animated,
  Pressable,
  FlatList,
  ScrollView,
  Vibration,
  SafeAreaView,
} from 'react-native';
import {
  ButtonInput,
  CardFeatured,
  CardTrending,
  ConfirmationModal,
  ForgetModal,
  LoginModal,
  SignupModal,
  StoreLocation,
  SubscribeAndEmail,
  Text,
  VideoBanner,
  WishListBag,
} from '../../../components';
import Carousel from 'react-native-snap-carousel';
import styles from './styles';
import {useTheme} from '../../../config/theme';
import {COMMON} from '../../../navigation/ROUTES';
import {useDispatch, useSelector} from 'react-redux';

import {
  API,
  useFetchDelete,
  useFetchGet,
  useFetchPost,
} from '../../../services';
import {GeneralResponses} from '../../../services/responses';
import HomeLoader from './Loader';
import useEmailValidation from '../../../hooks/useEmailValidation';
import {useIsFocused} from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';
import Toast from 'react-native-simple-toast';
import {BackHandler} from 'react-native';
import RNExitApp from 'react-native-exit-app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserActions} from '../../../redux/actions';

const db = SQLite.openDatabase({
  name: 'NagitiveApperal.db',
  location: 'default',
});

const {width} = Dimensions.get('screen');

const Home = ({navigation}) => {
  const colors = useTheme();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const isLogedIn = useSelector(state => state.user.isLogedIn);
  const storeId = useSelector(state => state.user.storeId);
  const uuid = useSelector(state => state.user.uuid);
  const userAccessToken = useSelector(state => state.user.userAccessToken);
  const isRegister = useSelector(state => state.user.isUserRegister);
  const isVerified = useSelector(state => state.user.isEmailVerified);
  const isDarkMode = useSelector(state => state.user.clientDarkMode);
  // const scroll = useSelector(state => state.user.allowScroll);
  console.log('====================================');
  console.log(userAccessToken);
  console.log('====================================');

  const [wishlist, setWishlist] = useState(global.wishlist);
  const [productForWishlist, setProductWishlist] = useState([]);
  const [homeScreenData, setHomeScreenData] = useState();
  const [homeScreenComponents, setHomeScreenComponents] = useState();
  const [goForHomeApiCall, setGoForHomeApiCall] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(1);
  const [emailInput, setEmailInput] = useState('');
  const [goForRemove, setGoForRemove] = useState(false);
  const [goForAdd, setGoForAdd] = useState(false);
  const [itemInBag, setItemsinBag] = useState(0);
  const [scroll, setScroll] = useState(true);
  const [mapData, setMapData] = useState([]);
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [forgetModal, setForgetModal] = useState(false);
  const [goForWishlistApiCall, setGoForWishlistApiCall] = useState(false);
  const [openConModal, setOpenConModal] = useState(false);

  const isEmailValid = useEmailValidation(emailInput);
  const carousalRef = useRef(null);
  const scrollRef = useRef(null);
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const firstVariantPrice =
    productForWishlist &&
    productForWishlist?.variants &&
    productForWishlist?.variants[0]
      ? productForWishlist?.variants[0]?.price
      : 0;

  /** api call for getting home screen data */
  // const homeScreenApi = useFetchPost(
  //   API.GET_HOME_DASHBOARD,
  //   {
  //     uuid: uuid,
  //   },
  //   goForHomeApiCall,
  // );

  /** api call for getting home screen data */
  const homeScreen = useFetchGet(
    API.GET_HOME_COMPONENTS,
    goForHomeApiCall,
    storeId,
    uuid,
  );

  /** api call for adding product to wishlist */
  const addWishList = useFetchPost(
    API.ADD_WISHLIST,
    {
      productId: productForWishlist.id,
      title: productForWishlist.title,
      price: productForWishlist.price
        ? productForWishlist.price
        : firstVariantPrice,
      Images: productForWishlist?.images,
    },
    goForAdd,
    uuid,
    userAccessToken,
  );

  /** api call for deleting product from wishlist */
  const deleteWishList = useFetchDelete(
    API.DEL_WISHLIST,
    {
      productId: productForWishlist.id,
    },
    goForRemove,
    uuid,
    userAccessToken,
  );

  /** api call for getting wishlist */
  const wishlistApi = useFetchGet(
    API.GET_WISHLIST,
    goForWishlistApiCall,
    storeId,
    uuid,
    {},
    userAccessToken,
  );

  // useEffect(() => {
  //   dispatch(UserActions.onSetShowBag(true));
  //   console.log('--------------home-----------');
  // });
  /** useeffect will called when screen is focused */
  useEffect(() => {
    getDataFromDb();
    setGoForHomeApiCall(true);
  }, [isFocused, navigation]);

  useEffect(() => {
    setGoForWishlistApiCall(true);
  }, [isFocused, navigation]);

  /** response of api call for getting wishlist */
  useEffect(() => {
    if (!wishlistApi.loading) {
      if (wishlistApi.response?.status === GeneralResponses.STATUS_OK.CODE) {
        var temp = new Set();
        wishlistApi.response?.data.map(item => {
          temp.add(item?.productId);
        });
        global.wishlist = temp;
        setWishlist(temp);
      }
    } else {
      console.log('error occured in wishlis api call');
    }
    setGoForWishlistApiCall(false);
  }, [wishlistApi.loading]);

  /** response of api call for getting home screen data */
  // useEffect(() => {
  //   if (!homeScreenApi.loading) {
  //     if (homeScreenApi.response?.status === GeneralResponses.STATUS_OK.CODE) {
  //       // onHomeApiSuccess(homeScreenApi.response?.data?.data);
  //     }
  //   } else {
  //     console.log('error occured in home api call');
  //   }
  //   setGoForHomeApiCall(false);
  // }, [homeScreenApi.loading]);

  /** response of api call for getting home screen data */
  useEffect(() => {
    if (!homeScreen.loading) {
      if (homeScreen.response?.status === GeneralResponses.STATUS_OK.CODE) {
        onHomeApiSuccess(homeScreen.response?.data);
        // console.log(homeScreen.response?.data);
      }
    } else {
      console.log('error occured in home api call');
    }
    setGoForHomeApiCall(false);
  }, [homeScreen.loading]);

  /** response of api call for adding product to wishlist */
  useEffect(() => {
    if (!addWishList.loading) {
      if (addWishList.response?.status === GeneralResponses.STATUS_OK.CODE) {
        setWishlist(prev => {
          let temp = new Set(prev);
          temp.add(productForWishlist.id);
          return temp;
        });
        global.wishlist.add(productForWishlist.id);
      }
    } else {
      console.log('error occured in add to wishlist api');
    }
    setGoForAdd(false);
  }, [addWishList.loading]);

  /** response of api call deleting product from wishlist */
  useEffect(() => {
    if (!deleteWishList.loading) {
      if (deleteWishList.response?.status === GeneralResponses.STATUS_OK.CODE) {
        setWishlist(prev => {
          let temp = new Set(prev);
          temp.delete(productForWishlist.id);
          return temp;
        });
        global.wishlist.delete(productForWishlist.id);
      }
    } else {
      console.log('error occured in add to wishlist api');
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

  /**
   * hardware back button handler
   * @returns true
   */
  const handleBackButton = () => {
    setOpenConModal(true);
    return true;
  };

  /**
   * method to check items in bag and mapdata
   */
  const getDataFromDb = async () => {
    const query = `select count(DISTINCT variant_id) as count from Cart`;
    await db.transaction(tx => {
      tx.executeSql(query, [], (tx, result) => {
        setItemsinBag(result.rows.item(0).count);
        dispatch(UserActions.onSetItemsInBag(result.rows.item(0).count));
      });
    });
    try {
      const mapData = await AsyncStorage.getItem('@mapData');
      setMapData(JSON.parse(mapData));
    } catch (e) {
      console.log('No Data Available', e);
      // error reading value
    }
  };

  /** if api hit sucessfully it will get data from api */
  const onHomeApiSuccess = data => {
    console.log(data.length, '-----------------------');
    // var data1 = data;
    // for (let i = 0; i < data.length; i++) {
    //   var temp = data[i].Components.sort((a, b) =>
    //     a.ComponentSequenceNumber > b.ComponentSequenceNumber
    //       ? 1
    //       : b.ComponentSequenceNumber > a.ComponentSequenceNumber
    //       ? -1
    //       : 0,
    //   );
    //   data1[i].Components = temp;
    // }
    var data1 = data.sort((a, b) =>
      a.ComponentSequenceNumber > b.ComponentSequenceNumber
        ? 1
        : b.ComponentSequenceNumber > a.ComponentSequenceNumber
        ? -1
        : 0,
    );
    // setHomeScreenData(data1);
    setHomeScreenComponents(data1);
    setPageLoading(false);
  };

  /** method to navigate to product detail */
  const goToProduct = id => {
    navigation.navigate(COMMON.PRODUCTS_DETAIL, {
      productData: {
        id: id,
      },
    });
  };

  /**
   * render carousal item
   * @param item
   * @param index
   */
  const _renderItem = (item, index) => {
    return (
      <Card
        backgroundImage={item.images[0].src}
        discription={item.title}
        index={index}
        fadeAnimation={fadeAnimation}
        onPress={() => goToProduct(item?.images[0]?.product_id)}
      />
    );
  };

  /** method to deal with snaping of cards */
  const _onSnapToItem = index => {
    setSelectedCard(index);
  };

  /** method to deal navigation */
  const navigateNext = async item => {
    console.log(item.MediaBanners.CollectionId);
    if (item.MediaBanners.IsLinkWithCollection) {
      navigation.navigate(COMMON.SUB_CATEGORY, {
        data: {
          exitPoint: 'HOME',
          id: item.MediaBanners.CollectionId,
          title: item.MediaBanners.Heading,
        },
      });
    } else if (item.MediaBanners.IsLinkWithProduct) {
      console.log('IsLinkWithProduct');
    } else if (item.MediaBanners.IsDiscount) {
      try {
        console.log(item.MediaBanners);
        await AsyncStorage.setItem(
          '@discountCode',
          item.MediaBanners.DiscountCode,
        );
        navigation.navigate(COMMON.PRODUCTS, {
          indicator: 'discount',
          discountId: item.MediaBanners.price_rule_id,
        });
      } catch (e) {}

      console.log('IsDiscount');
    } else {
      console.log('no Navigation');
    }
  };

  /**
   * method to toggle favourite
   */
  const addToWishlist = item => {
    if (isLogedIn) {
      setProductWishlist(item);
      if (wishlist.has(item.id)) {
        setGoForRemove(true);
        setWishlist(prev => {
          let temp = new Set(prev);
          temp.delete(item.id);
          return temp;
        });
        global.wishlist.delete(item.id);
      } else {
        setGoForAdd(true);
        setWishlist(prev => {
          let temp = new Set(prev);
          temp.add(item.id);
          return temp;
        });
        global.wishlist.add(item.id);
      }
    } else {
      Toast.show('You Have To Login First', Toast.SHORT);
      if (!isLogedIn) {
        if (isRegister && !isVerified) {
          setSignupModal(true);
        } else setLoginModal(true);
      }
    }
  };

  if (pageLoading) return <HomeLoader />;

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
          setGoForWishlistApiCall(true);
          Toast.show(
            'Now You can add or remove an item to Wish list',
            Toast.SHORT,
          );
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
          setGoForWishlistApiCall(true);
          setSignupModal(false);
          Toast.show('Now You can add Item to WishList', Toast.SHORT);
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
        <ScrollView
          ref={scrollRef}
          scrollEnabled={scroll}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={[BaseStyle.container]}
        >
          <View style={styles.main}>
            {homeScreenComponents &&
              // homeScreenData.map((data, index) => {
              //   return (
              //     <View key={index.toString()}>
              //       {
              homeScreenComponents.map((item, index1) => {
                return (
                  <View key={index1.toString()}>
                    {(item.ComponentType === 'flat' && (
                      <View style={styles.arivalFeaturedCard}>
                        <View style={{marginBottom: 24}}>
                          <ListHeader
                            textLeft={item.ComponentName}
                            // textRight={`View All`}
                            // ActionRight={() => {
                            //   navigation.navigate(COMMON.PRODUCTS, {
                            //     indicator: 'viewAll',
                            //   });
                            // }}
                          />
                          <FlatList
                            horizontal={true}
                            scrollEnabled={scroll}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            data={item?.ProductInfo}
                            renderItem={({item}) => {
                              console.log(item);
                              return (
                                <CardTrending
                                  image={item.images[0]}
                                  isLoading={item.loading}
                                  amount={
                                    item?.variants[0]?.price
                                      ? item?.variants[0]?.price
                                      : item.price
                                  }
                                  currency={'Rs'}
                                  detail={item.title}
                                  isFavourite={
                                    isLogedIn
                                      ? wishlist && wishlist.has(item.id)
                                      : false
                                  }
                                  onPress={() =>
                                    goToProduct(item?.images[0]?.product_id)
                                  }
                                  toggleFavourite={() => addToWishlist(item)}
                                  mainstyle={{marginRight: 16}}
                                />
                              );
                            }}
                          />
                        </View>
                      </View>
                    )) ||
                      (item.ComponentType === 'emphasis' && (
                        <View style={styles.arivalFeaturedCard}>
                          <Text
                            bold
                            title3
                            highemphasis
                            style={{textTransform: 'capitalize'}}
                          >
                            {item.ComponentName}
                          </Text>

                          <View style={styles.carousel}>
                            <Carousel
                              ref={carousalRef}
                              scrollEnabled={scroll}
                              data={item?.ProductInfo}
                              sliderWidth={width - 32}
                              firstItem={1}
                              itemWidth={width / 2}
                              renderItem={({item, index}) =>
                                _renderItem(item, index)
                              }
                              onSnapToItem={item => _onSnapToItem(item)}
                              layout={'default'}
                              inactiveSlideOpacity={0.4}
                              enableMomentum={true}
                              activeAnimationType={'spring'}
                              decelerationRate={0.9}
                            />
                            {/* <Carousel
                                    ref={carousalRef}
                                    data={item?.ProductInfo}
                                    renderItem={({item, index}) =>
                                      _renderItem(item, index)
                                    }
                                    itemWidth={width / 2}
                                    containerWidth={width - 32}
                                    separatorWidth={10}
                                    initialIndex={1}
                                    inActiveOpacity={0.3}
                                  /> */}
                          </View>
                        </View>
                      )) ||
                      (item.ComponentType === 'static' && (
                        <Pressable
                          onPress={() => navigateNext(item)}
                          style={styles.arivalFeaturedCard}
                        >
                          <CardFeatured
                            image={item?.MediaBanners?.MediaUrl}
                            type={`static`}
                          />
                        </Pressable>
                      )) ||
                      (item.ComponentType === 'dynamic' && (
                        <Pressable
                          onPress={() => navigateNext(item)}
                          style={styles.arivalFeaturedCard}
                        >
                          <CardFeatured
                            image={item?.MediaBanners?.MediaUrl}
                            heading={item?.MediaBanners?.Heading}
                            paragraph={item?.MediaBanners?.Paragraph}
                            paragraphTextColor={
                              item?.MediaBanners?.ParagraphTextColor
                            }
                            headingColor={item?.MediaBanners?.HeadingColor}
                            topColor={item?.MediaBanners?.TopColor}
                            bottomColor={item?.MediaBanners?.BottomColor}
                            imageAlign={item?.MediaBanners?.ImageAlign}
                            isDiscount={item?.MediaBanners?.IsDiscount}
                            isNext={
                              item?.MediaBanners?.IsLinkWithProduct ||
                              item?.MediaBanners?.IsLinkWithCollection
                                ? true
                                : false
                            }
                          />
                        </Pressable>
                      )) ||
                      (item.ComponentType === 'video' && (
                        <Pressable
                          onPress={() => navigateNext(item)}
                          style={styles.arivalFeaturedCard}
                        >
                          <VideoBanner
                            uri={item?.MediaBanners?.videoSrc}
                            text={item?.MediaBanners?.videoContent}
                            textColor={item?.MediaBanners?.videoTextColor}
                            overlayColor={
                              item?.MediaBanners?.videoOverlayColor === 'grey'
                                ? 'black'
                                : item?.MediaBanners?.videoOverlayColor ===
                                  'white'
                                ? 'white'
                                : item?.MediaBanners?.videoOverlayColor ===
                                  'lightgrey'
                                ? 'rgba(0,0,0,0.8)'
                                : ''
                            }
                          />
                        </Pressable>
                      ))}
                  </View>
                );
              })
            //       }
            //     </View>
            //   );
            // })
            }

            <View style={{marginTop: 34, marginBottom: 20}}>
              <StoreLocation mapData={mapData} />

              {/* <SubscribeAndEmail
                text1={`Subscribe to our Newsletter today!`}
                text2={`Get updates about new products and flash sales.`}
              />
              <View style={styles.subscribeInput}>
                <ButtonInput
                  placeholder={`Enter Email`}
                  value={emailInput}
                  onChangeText={text => setEmailInput(text)}
                  buttonOnPress={() => console.log('subscribe pressed')}
                  buttonText={`Subscribe`}
                  disabled={emailInput.length === 0 || !isEmailValid}
                />

                <Text regular overline iserror>
                  {emailInput.length > 0 &&
                    !isEmailValid &&
                    `Enter a valid email`}
                </Text>
              </View> */}
            </View>
          </View>
        </ScrollView>
        {itemInBag > 0 && (
          <WishListBag
            onLongPress={() => {
              Vibration.vibrate(300);
              setScroll(false);
            }}
            onRelease={() => {
              setScroll(true);
            }}
            onShortPressRelease={() => {
              navigation.navigate(COMMON.WISHLIST, {
                screen: COMMON.BAG_SCREEN,
              });
            }}
            count={itemInBag}
            bottom={250}
          />
        )}
      </SafeAreaView>
    </>
  );
};
export default Home;

const Card = ({backgroundImage, discription, index, onPress}) => {
  const colors = useTheme();
  const isDarkMode = useSelector(state => state.user.clientDarkMode);
  return (
    <Pressable
      onPress={onPress}
      key={index.toString()}
      style={[styles.sliderText, {width: width / 2}]}
    >
      <View>
        <Image
          style={styles.imageConatiner}
          source={{uri: backgroundImage}}
          resizeMode={'stretch'}
        />
      </View>
      <Text
        semibold
        body1
        numberOfLines={1}
        textAlign="center"
        style={{color: isDarkMode ? colors.highemphasis : colors.lowemphasis}}
      >
        {discription}
      </Text>
    </Pressable>
  );
};

const ListHeader = ({textLeft, textRight, ActionRight}) => {
  return (
    <View style={styles.listHeaderView}>
      <Text bold title3 highemphasis style={{textTransform: 'capitalize'}}>
        {textLeft}
      </Text>
      <Pressable onPress={ActionRight}>
        <Text body2 medium blueColor style={styles.headerTextRight}>
          {textRight}
        </Text>
      </Pressable>
    </View>
  );
};
