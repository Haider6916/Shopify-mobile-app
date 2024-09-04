import React, {useEffect, useLayoutEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  CardTrending,
  FilterItem,
  ForgetModal,
  HeaderWithDropDown,
  Icon,
  Icons,
  LoginModal,
  NoRecordFound,
  SignupModal,
  Text,
  TextInput,
  WishListBag,
} from '../../../components';
import styles from './styles';
import {BaseStyle} from '../../../config/styles';
import {
  FlatList,
  Pressable,
  View,
  ActivityIndicator,
  Vibration,
} from 'react-native';
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
import ProductsLoader from './Loader';
import Toast from 'react-native-simple-toast';
import {withCommas} from '../../../utils/numberFormating';
import {useIsFocused} from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';
import {Back} from '../../../assets';
import {UserActions} from '../../../redux/actions';

const db = SQLite.openDatabase({
  name: 'NagitiveApperal.db',
  location: 'default',
});

const Subcategories = ({navigation, route}) => {
  const colors = useTheme();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const previouspagedata = route.params.data;

  const isLogedIn = useSelector(state => state.user.isLogedIn);
  const storeId = useSelector(state => state.user.storeId);
  const uuid = useSelector(state => state.user.uuid);
  const userAccessToken = useSelector(state => state.user.userAccessToken);
  const isDarkMode = useSelector(state => state.user.clientDarkMode);
  const isRegister = useSelector(state => state.user.isUserRegister);
  const isVerified = useSelector(state => state.user.isEmailVerified);
  // const scroll = useSelector(state => state.user.allowScroll);
  const firstVariantPrice =
    productForWishlist &&
    productForWishlist?.variants &&
    productForWishlist?.variants[0]
      ? productForWishlist?.variants[0]?.price
      : 0;

  const [scroll, setScroll] = useState(true);
  const [exitPoint, setExitPoint] = useState(route?.params?.data.exitPoint);
  const [wishlist, setWishlist] = useState(global.wishlist);
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedfilter] = useState('');
  const [productsData, setProductsData] = useState([]);
  const [pageLimit] = useState(10);
  const [pageInfo, setPageInfo] = useState('');
  const [goForApiCall, setGoForApiCall] = useState(true);
  const [goForWishlistApiCall, setGoForWishlistApiCall] = useState(true);
  const [goForRemove, setGoForRemove] = useState(false);
  const [goForAdd, setGoForAdd] = useState(false);
  const [productForWishlist, setProductWishlist] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [canCallNext, setCanCallNext] = useState(true);
  const [bottomLoading, setBottomLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [itemInBag, setItemsinBag] = useState(0);
  const [goForFeature, setGoForFeature] = useState(false);
  const [goForNewest, setGoForNewest] = useState(false);
  const [goForTrending, setGoForTrending] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [forgetModal, setForgetModal] = useState(false);
  const [filterItems, setFilterItems] = useState([
    {
      name: 'Featured',
      isSelected: false,
    },
    {
      name: 'Trending',
      isSelected: false,
    },
    {
      name: 'Newest',
      isSelected: false,
    },
  ]);

  /** api call for loading feature produts */
  const loadFeatured = useFetchPost(
    API.LOAD_FEATURED +
      `?CollectionId=${previouspagedata.id}&limit=${pageLimit}&page_info=${pageInfo}&SearchQuery=${search}`,
    {},
    goForFeature,
    uuid,
    userAccessToken,
  );

  /** api call for loading newest prodcuts */
  const loadNewest = useFetchPost(
    API.LOAD_NEWEST +
      `?CollectionId=${previouspagedata.id}&limit=${pageLimit}&page_info=${pageInfo}&SearchQuery=${search}`,
    {},
    goForNewest,
    uuid,
    userAccessToken,
  );

  /** api call for loading trending products */
  const loadTrending = useFetchPost(
    API.LOAD_TRENDING +
      `?CollectionId=${previouspagedata.id}&limit=${pageLimit}&page_info=${pageInfo}&SearchQuery=${search}`,
    {},
    goForTrending,
    uuid,
    userAccessToken,
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

  /** api call for getting products */
  const products = useFetchGet(
    API.GET_PRODUCT +
      `?CollectionId=${previouspagedata.id}&limit=${pageLimit}&page_info=${pageInfo}&SearchQuery=${search}`,
    goForApiCall,
    storeId,
    uuid,
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
  //   console.log('--------------sub category-----------');
  // });

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

  /** response of api call for getting products */
  useEffect(() => {
    if (!products.loading) {
      if (products.response?.status === GeneralResponses.STATUS_OK.CODE) {
        onApiSuccess(products);
      }
    } else {
      console.log('error occured in api call');
    }
    setGoForApiCall(false);
  }, [products.loading]);

  /** response of api call for getting newest products */
  useEffect(() => {
    if (!loadNewest.loading) {
      if (loadNewest.response?.status === GeneralResponses.STATUS_OK.CODE) {
        onApiSuccess(loadNewest);
      }
    } else {
      console.log('error occured in api call');
    }
    setGoForNewest(false);
  }, [loadNewest.loading]);

  /** response of api call for getting trending products */
  useEffect(() => {
    if (!loadTrending.loading) {
      if (loadTrending.response?.status === GeneralResponses.STATUS_OK.CODE) {
        onApiSuccess(loadTrending);
      }
    } else {
      console.log('error occured in api call');
    }
    setGoForTrending(false);
  }, [loadTrending.loading]);

  /** response of api call for getting featured products */
  useEffect(() => {
    if (!loadFeatured.loading) {
      if (loadFeatured.response?.status === GeneralResponses.STATUS_OK.CODE) {
        onApiSuccess(loadFeatured);
      }
    } else {
      console.log('error occured in api call');
    }
    setGoForFeature(false);
  }, [loadFeatured.loading]);

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

  useEffect(() => {
    getDataFromDb();
  }, [isFocused, navigation]);

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
  };

  /**
   *  if api hit sucessfully it will get data from api according to page info
   */
  const onApiSuccess = products => {
    const response =
      selectedFilter == '' ? products?.response : products?.response?.data;
    if (productsData.length === 0) {
      setPageInfo(response.pageInfo);
      setProductsData(response.data);
    } else {
      setPageInfo(response.pageInfo);
      setProductsData(prevState => prevState.concat(response.data));
    }

    response.pageInfo === '' && setCanCallNext(false);
    setPageLoading(false);
    setBottomLoading(false);
    setSearchLoading(false);
  };

  const onEndReach = () => {
    if (canCallNext) {
      if (selectedFilter === '') {
        setGoForApiCall(true);
        setBottomLoading(true);
      } else {
        if (selectedFilter === 'Featured') {
          setGoForFeature(true);
          setBottomLoading(true);
        } else if (selectedFilter === 'Trending') {
          setGoForTrending(true);
          setBottomLoading(true);
        } else if (selectedFilter === 'Newest') {
          setGoForNewest(true);
          setBottomLoading(true);
        }
      }
    }
  };

  /**
   * method will be called on press of header back button
   */
  const onPressBack = () => {
    if (exitPoint === 'HOME') {
      setExitPoint('');
      navigation.navigate(COMMON.HOME);
    } else {
      navigation.goBack();
    }
  };

  /**
   * method will be called on press of header dropdown button
   */
  const onPressDown = () => {};

  /**
   * method will be called on press of header rigth button
   */
  const onPressRight = () => {};

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
   * method to select unselect filter
   */
  const selectFilter = text => {
    const temp = filterItems;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].name === text) {
        temp[i].isSelected = true;
        setSelectedfilter(text);

        if (text === 'Featured') {
          setPageInfo('');
          setPageLoading(true);
          setProductsData([]);
          setGoForFeature(true);
        } else if (text === 'Trending') {
          setPageInfo('');
          setPageLoading(true);
          setProductsData([]);
          setGoForTrending(true);
        } else if (text === 'Newest') {
          setPageInfo('');
          setPageLoading(true);
          setProductsData([]);
          setGoForNewest(true);
        }
      } else temp[i].isSelected = false;
    }
    return setFilterItems(temp);
  };

  /**
   * function to called on onEndEditing
   */
  const onEndEditing = () => {
    setSearchLoading(true);
    setProductsData([]);
    setPageInfo('');
    setCanCallNext(true);
    setSelectedfilter('');
    setGoForApiCall(true);
  };

  /**
   * method called on press of cross in search input
   */
  const onPressCross = () => {
    setSearchLoading(true);
    setSearch('');
    setPageInfo('');
    setProductsData([]);
    setCanCallNext(true);
    setSelectedfilter('');
    setGoForApiCall(true);
  };

  if (pageLoading) return <ProductsLoader isSearch={true} />;
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
      <SafeAreaView
        style={[
          BaseStyle.safeAreaView,
          {backgroundColor: colors.backgroundColor},
        ]}
      >
        <HeaderWithDropDown
          text1={previouspagedata.title}
          text2={selectedFilter ? selectedFilter : `ALL`}
          text3={`FILTER`}
          onPressBack={onPressBack}
          onPressDown={onPressDown}
          onPressRight={onPressRight}
        />

        <FlatList
          style={styles.cardsView}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={scroll}
          columnWrapperStyle={styles.columnWrapperStyle}
          data={productsData}
          onEndReached={onEndReach}
          numColumns={2}
          ListHeaderComponent={
            <>
              <View style={styles.searchView}>
                <TextInput
                  placeholder={`Search to filter results`}
                  value={search}
                  onChangeText={text => setSearch(text)}
                  onEndEditing={onEndEditing}
                  iconLeft={
                    search.length === 0 ? (
                      <Icon
                        size={20}
                        color={colors.faint}
                        name={Icons.SEARCH}
                        type={'ant'}
                      />
                    ) : (
                      <></>
                    )
                  }
                  icon={
                    search.length > 0 && (
                      <Pressable
                        onPress={onPressCross}
                        style={styles.crossIcon}
                      >
                        <Icon
                          size={20}
                          color={
                            isDarkMode ? colors.highemphasis : colors.faint
                          }
                          name={Icons.CROSS}
                        />
                      </Pressable>
                    )
                  }
                />
              </View>

              {productsData.length > 0 && (
                <>
                  <View style={styles.filterView}>
                    <FlatList
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      scrollEnabled={false}
                      data={filterItems}
                      renderItem={({item}) => {
                        return (
                          <View style={styles.filterItem}>
                            <FilterItem
                              text={item.name}
                              isSelected={item.isSelected}
                              setSelected={selectFilter}
                            />
                          </View>
                        );
                      }}
                    />
                  </View>

                  <View style={styles.countView}>
                    <Text
                      regular
                      caption1
                      style={{
                        color: isDarkMode
                          ? colors.highemphasis
                          : colors.lowemphasis,
                      }}
                    >
                      {`${productsData.length} items in `}
                      <Text
                        bold
                        caption1
                        style={[
                          styles.titles,
                          {
                            color: isDarkMode
                              ? colors.highemphasis
                              : colors.lowemphasis,
                          },
                        ]}
                      >{`${previouspagedata.title}`}</Text>
                    </Text>
                    {selectedFilter ? (
                      <Text
                        bold
                        caption1
                        style={{
                          color: isDarkMode
                            ? colors.highemphasis
                            : colors.lowemphasis,
                        }}
                      >{`- ${selectedFilter}`}</Text>
                    ) : (
                      <></>
                    )}
                  </View>
                </>
              )}
            </>
          }
          renderItem={({item}) => {
            return (
              <CardTrending
                image={item.images && item.images[0]}
                isLoading={item.loading}
                amount={withCommas(
                  item && item?.variants && item?.variants[0]
                    ? item?.variants[0]?.price
                    : item.price,
                )}
                currency={`Rs`}
                detail={item.title}
                disable={
                  products.loading ||
                  deleteWishList.loading ||
                  addWishList.loading
                }
                isFavourite={
                  isLogedIn ? wishlist && wishlist.has(item.id) : false
                }
                toggleFavourite={() => addToWishlist(item)}
                onPress={() => {
                  navigation.navigate(COMMON.PRODUCTS_DETAIL, {
                    productData: item,
                  });
                }}
              />
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            !searchLoading ? (
              <NoRecordFound
                isSearch={search.length > 0 ? true : false}
                searchedItem={search}
                searchFrom={`items`}
                discription={`No category matches the search term you entered. Search our catalogue instead...`}
              />
            ) : (
              <ProductsLoader />
            )
          }
        />
        {bottomLoading && (
          <View
            style={[
              styles.loaderView,
              {
                backgroundColor: colors.statusBarGray,
              },
            ]}
          >
            <ActivityIndicator size="large" color={colors.primaryLight} />
          </View>
        )}
      </SafeAreaView>
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
        />
      )}
    </>
  );
};
export default Subcategories;
