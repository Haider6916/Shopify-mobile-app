import React, {useEffect, useRef, useState} from 'react';
import {
  CardTrending,
  ConfirmationModal,
  FilterItem,
  ForgetModal,
  Icon,
  Icons,
  LoginModal,
  NoRecordFound,
  SignupModal,
  Text,
  TextInput,
  WishListBag,
} from '../../../components';
import {BaseStyle} from '../../../config/styles';
import {
  BackHandler,
  FlatList,
  Pressable,
  View,
  SafeAreaView,
  Animated,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Vibration,
} from 'react-native';
import {useTheme} from '../../../config/theme';
import {
  API,
  useFetchGet,
  useFetchDelete,
  useFetchPost,
} from '../../../services';
import {useDispatch, useSelector} from 'react-redux';
import {GeneralResponses} from '../../../services/responses';
import {BackIcon, Cross, SearchIcon} from '../../../assets';
import styles from './styles';
import {useIsFocused} from '@react-navigation/native';
import RNExitApp from 'react-native-exit-app';
import {withCommas} from '../../../utils/numberFormating';
import {COMMON} from '../../../navigation/ROUTES';
import Toast from 'react-native-simple-toast';
import SQLite from 'react-native-sqlite-storage';
import {insertData} from '../../../utils/queries';
import {UserActions} from '../../../redux/actions';

const db = SQLite.openDatabase({
  name: 'NagitiveApperal.db',
  location: 'default',
});

const height = Dimensions.get('window').height;

const SearchTab = ({navigation}) => {
  const colors = useTheme();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const storeId = useSelector(state => state.user.storeId);
  const uuid = useSelector(state => state.user.uuid);
  const isLogedIn = useSelector(state => state.user.isLogedIn);
  const userAccessToken = useSelector(state => state.user.userAccessToken);
  const isRegister = useSelector(state => state.user.isUserRegister);
  const isVerified = useSelector(state => state.user.isEmailVerified);
  const isDarkMode = useSelector(state => state.user.clientDarkMode);
  // const scroll = useSelector(state => state.user.allowScroll);

  const [scroll, setScroll] = useState(true);
  const [wishlist, setWishlist] = useState(global.wishlist);
  const [search, setSearch] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [goForSearch, setGoForSearch] = useState(false);
  const [openConModal, setOpenConModal] = useState(false);
  const [clearModal, setClearModal] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [recent, setRecent] = useState([]);
  const [canCallNext, setCanCallNext] = useState(true);
  const [bottomLoading, setBottomLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchStarted, setSearchStarted] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [goForRemove, setGoForRemove] = useState(false);
  const [goForAdd, setGoForAdd] = useState(false);
  const [productForWishlist, setProductWishlist] = useState([]);
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [forgetModal, setForgetModal] = useState(false);
  const [goForWishlistApiCall, setGoForWishlistApiCall] = useState(true);
  const [itemInBag, setItemsinBag] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const firstVariantPrice =
    productForWishlist &&
    productForWishlist?.variants &&
    productForWishlist?.variants[0]
      ? productForWishlist?.variants[0]?.price
      : 0;

  /** api call for searching product */
  // const searchProducts = useFetchGet(
  //   API.SEARCH_PRODUCTS + `?page_number=${pageNumber}&SearchQuery=${search}`,
  //   goForSearch,
  //   storeId,
  //   uuid,
  // );

  /** api call for searching product */
  const searchProducts = useFetchGet(
    API.SEARCH_PRODUCTS + `?searchString=${search}`,
    goForSearch,
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

  useEffect(() => {
    setGoForWishlistApiCall(true);
    getDataFromDb();
  }, [isFocused, navigation]);

  // useEffect(() => {
  //   dispatch(UserActions.onSetShowBag(true));
  //   console.log('--------------search-----------');
  // });

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

  /** response of api call for searching products */
  useEffect(() => {
    if (!searchProducts.loading) {
      if (searchProducts.response?.status === GeneralResponses.STATUS_OK.CODE) {
        onApiSuccess(searchProducts.response);
      }
    } else {
      console.log('error occured in api call');
    }
    setGoForSearch(false);
  }, [searchProducts.loading]);

  useEffect(() => {
    if (isFocused) {
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
      };
    }
  });

  /**
   * method to check items in bag
   */
  const getDataFromDb = async () => {
    const query = `select count(DISTINCT variant_id) as count from Cart`;
    await db.transaction(tx => {
      tx.executeSql(query, [], (tx, result) => {
        setItemsinBag(result.rows.item(0).count);
        dispatch(UserActions.onSetItemsInBag(result.rows.item(0).count));
      });
    });

    const recent = `select DISTINCT title from Recent_Search order by CAST(time AS INT) DESC`;
    await db.transaction(tx => {
      tx.executeSql(recent, [], (tx, result) => {
        var item = [];
        for (let i = 0; i < result.rows.length; i++) {
          item.push(result.rows.item(i).title);
        }
        setRecent(item);
      });
    });
  };

  /**
   * hardware back button handler
   * @returns true
   */
  const handleBackButton = () => {
    setOpenConModal(true);
    return true;
  };

  /**
   * method called on success of api
   * @param {*} products data from api
   */
  const onApiSuccess = response => {
    if (productsData.length === 0) {
      setPageNumber(response.page_number);
      setProductsData(response.data);
    } else {
      setPageNumber(response.page_number);
      setProductsData(prevState => prevState.concat(response.data));
    }

    response.page_number === '' && setCanCallNext(false);
    setPageLoading(false);
    setBottomLoading(false);
    setSearchLoading(false);
  };

  const onEndReach = () => {
    if (canCallNext) {
      // setGoForSearch(true);
      setBottomLoading(true);
    }
  };

  /** method to deal with toggle favourite */
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

  /**
   * function to search
   * @param val value to search
   */
  const onChangeSearchInput = val => {
    setSearch(val);
  };

  const getSuggestion = async text => {
    const query = `select DISTINCT title from Suggestions where title like '%${text}%'`;
    await db.transaction(tx => {
      tx.executeSql(query, [], (tx, result) => {
        var item = [];
        for (let i = 0; i < result.rows.length; i++) {
          item.push(result.rows.item(i).title);
        }
        setSuggestions(item);
      });
    });
  };

  const fadeIn = text => {
    setSearchStarted(true);
    onChangeSearchInput(text);
    setProductsData([]);
    // getSuggestion(text);
    if (text === '') {
      fadeOut('');
    } else {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true, // Add This line
      }).start();
    }
  };

  const fadeOut = text => {
    getDataFromDb();
    onChangeSearchInput(text);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true, // Add This line
    }).start();
  };

  const onPressSuggested = item => {
    console.log(item);
    setSearchStarted(false);
    setSearchLoading(true);
    insertRecent(item);
    fadeOut(item);
    setProductsData([]);
    item !== '' && setGoForSearch(true);
  };

  const onSubmitEditing = () => {
    setSearchStarted(false);
    setSearchLoading(true);
    insertRecent(search);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true, // Add This line
    }).start();
    setProductsData([]);
    search !== '' && setGoForSearch(true);
  };

  const insertRecent = item => {
    let timeNow = new Date();
    const milisec = timeNow.getTime();
    const productName = item;
    const escapedProductName = productName.replace(/'/g, "''");
    const query = `INSERT INTO Recent_Search (title,time) VALUES ('${escapedProductName}','${milisec}');`;
    if (item !== '') {
      const inserted = insertData(query);
      if (inserted) console.log('inserted Recent');
    }
  };

  const deleteSpecific = async item => {
    const productName = item;
    const escapedProductName = productName.replace(/'/g, "''");
    let deleteCart = `DELETE FROM Recent_Search where title='${escapedProductName}'`;
    await db.transaction(tx => {
      tx.executeSql(deleteCart, [], (tx, results) => {
        if (results.rowsAffected > 0) {
          getDataFromDb();
          console.log('deleted');
        }
      });
    });
  };

  const clearRecent = async () => {
    setClearModal(false);
    let deleteCart = `DELETE FROM Recent_Search`;
    await db.transaction(tx => {
      tx.executeSql(deleteCart, [], (tx, results) => {
        if (results.rowsAffected > 0) {
          getDataFromDb();
          console.log('cleared');
        }
      });
    });
  };

  const gotoDetails = item => {
    console.log('Pressed');
    navigation.navigate(COMMON.PRODUCTS_DETAIL, {
      productData: item,
    });
  };

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

      <ConfirmationModal
        visible={clearModal}
        title={`Clear Recent Searches?`}
        primaryText={`No`}
        secondaryText={`Yes`}
        primaryAction={() => setClearModal(false)}
        secondaryAction={clearRecent}
      />
      <SafeAreaView
        style={[
          BaseStyle.safeAreaView,
          {backgroundColor: colors.backgroundColor},
        ]}
      >
        <View
          style={{
            paddingHorizontal: 16,
            flexDirection: 'column-reverse',
          }}
        >
          <>
            <FlatList
              scroll={scroll}
              style={styles.cardsView}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              scrollEnabled={scroll}
              columnWrapperStyle={styles.columnWrapperStyle}
              data={search.length == 0 ? [] : productsData}
              onEndReached={onEndReach}
              numColumns={2}
              renderItem={({item}) => {
                // console.log(item.images[0].id);
                return (
                  <CardTrending
                    image={
                      item?.images && item?.images[0]?.src && item?.images[0]
                    }
                    isLoading={item.loading}
                    amount={withCommas(
                      item && item?.variants && item?.variants[0]
                        ? item?.variants[0]?.price
                        : item.price,
                    )}
                    currency={`Rs`}
                    detail={item.title}
                    disable={
                      searchProducts.loading ||
                      deleteWishList.loading ||
                      addWishList.loading
                    }
                    isFavourite={
                      isLogedIn ? wishlist && wishlist.has(item.id) : false
                    }
                    toggleFavourite={() => addToWishlist(item)}
                    onPress={() => gotoDetails(item)}
                    // onPress={console.log(item)}
                  />
                );
              }}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={
                searchLoading && search.length > 0 ? (
                  <ActivityIndicator size="large" color={colors.primaryLight} />
                ) : !searchLoading && search.length > 0 ? (
                  <>
                    {searchStarted ? (
                      <></>
                    ) : (
                      <NoRecordFound
                        isSearch={search.length > 0 ? true : false}
                        searchedItem={search}
                        searchFrom={`items`}
                        discription={`No Product matches the search term you entered.`}
                      />
                    )}
                  </>
                ) : (
                  <></>
                )
              }
            />
          </>

          <View>
            <View style={styles.textInputView}>
              <TextInput
                placeholder={search.length === 0 && `Search our catalogue`}
                value={search}
                onChangeText={fadeIn}
                onSubmitEditing={() => onSubmitEditing()}
                icon={
                  search.length === 0 ? (
                    <Icon
                      size={20}
                      color={colors.faint}
                      name={Icons.SEARCH}
                      type={'ant'}
                    />
                  ) : (
                    <Pressable onPress={() => fadeOut('')}>
                      <Cross />
                    </Pressable>
                  )
                }
              />
              {search.length > 0 && (
                <Animated.View
                  style={[
                    {
                      backgroundColor: isDarkMode
                        ? colors.txtInputDarkBack
                        : colors.lightGray,
                      opacity: fadeAnim,
                      position: 'absolute',
                      top: 50,
                      width: '100%',
                      zIndex: 1,
                      paddingHorizontal: 10,
                      maxHeight: 300,
                    },
                  ]}
                >
                  <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    scroll={scroll}
                  >
                    {suggestions.map((item, index) => {
                      return (
                        <Pressable
                          onPress={() => onPressSuggested(item)}
                          key={index.toString()}
                          style={{
                            marginVertical: 5,
                          }}
                        >
                          <Text bold body2 mediumemphasis>
                            {item}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </ScrollView>
                </Animated.View>
              )}
            </View>

            {recent.length > 0 && search.length == 0 && (
              <>
                <View style={styles.recentSearchesView}>
                  <Text bold body2 mediumemphasis>{`RECENT SEARCHES`}</Text>
                  <Pressable
                    onPress={() => setClearModal(true)}
                    style={[
                      styles.clearTextView,
                      {backgroundColor: colors.statusBarGray},
                    ]}
                  >
                    <Text
                      bold
                      caption1
                      faint
                      style={{
                        color: isDarkMode
                          ? colors.mediumemphasis
                          : colors.faint,
                      }}
                    >{`CLEAR`}</Text>
                  </Pressable>
                </View>
                <ScrollView scroll={scroll} style={{height: height / 1.48}}>
                  {recent.map((item, index) => {
                    console.log(item);
                    return (
                      <Pressable
                        onPress={() => onPressSuggested(item)}
                        key={index.toString()}
                        style={[
                          styles.searchView,
                          {backgroundColor: colors.statusBarGray},
                        ]}
                      >
                        <Text regular caption1 mediumemphasis>
                          {item}
                        </Text>
                        <Pressable
                          onPress={() => deleteSpecific(item)}
                          style={[styles.crossIconView]}
                        >
                          <Cross />
                        </Pressable>
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </>
            )}
          </View>
        </View>
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
export default SearchTab;
