import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  CardTrending,
  ForgetModal,
  HeaderWithDropDown,
  Icon,
  Icons,
  LoginModal,
  NoRecordFound,
  SignupModal,
  Text,
  TextInput,
} from '../../../components';
import styles from './styles';
import {BaseStyle} from '../../../config/styles';
import {FlatList, Pressable, View} from 'react-native';
import {useTheme} from '../../../config/theme';
import {Popular1, Popular2} from '../../../assets';
import {
  API,
  useFetchDelete,
  useFetchGet,
  useFetchPost,
} from '../../../services';
import {GeneralResponses} from '../../../services/responses';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {withCommas} from '../../../utils/numberFormating';
import Toast from 'react-native-simple-toast';
import {COMMON} from '../../../navigation/ROUTES';
import ProductsLoader from './Loader';

const ProductsScreen = ({navigation, route}) => {
  const prevData = route.params.indicator;
  const discountId = route?.params?.discountId;
  const colors = useTheme();

  const isLogedIn = useSelector(state => state.user.isLogedIn);
  const storeId = useSelector(state => state.user.storeId);
  const uuid = useSelector(state => state.user.uuid);
  const userAccessToken = useSelector(state => state.user.userAccessToken);
  const isRegister = useSelector(state => state.user.isUserRegister);
  const isVerified = useSelector(state => state.user.isEmailVerified);

  const [wishlist, setWishlist] = useState(global.wishlist);
  const [search, setSearch] = useState('');
  const [goForDiscount, setGoForDiscount] = useState(
    prevData === 'discount' ? true : false,
  );
  const [goForViewAll, setGoForViewAll] = useState(
    prevData === 'discount' ? false : true,
  );
  const [populatData, setPopulateData] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [goForWishlistApiCall, setGoForWishlistApiCall] = useState(true);
  const [goForRemove, setGoForRemove] = useState(false);
  const [goForAdd, setGoForAdd] = useState(false);
  const [productForWishlist, setProductWishlist] = useState([]);
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [forgetModal, setForgetModal] = useState(false);
  const firstVariantPrice =
    productForWishlist &&
    productForWishlist?.variants &&
    productForWishlist?.variants[0]
      ? productForWishlist?.variants[0]?.price
      : 0;

  /** api call for discounted products */
  const discountApi = useFetchGet(
    API.DISCOUNTED_PRODUCTS + `?id=${discountId}`,
    goForDiscount,
    '',
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

  /** response of api call for getting Discounted Products */
  useEffect(() => {
    if (!discountApi.loading) {
      if (discountApi.response?.status === GeneralResponses.STATUS_OK.CODE) {
        onApiSuccess(discountApi);
      }
    } else {
      console.log('error occured in Dicounted Api Products ');
      setPageLoading(false);
    }
    setGoForDiscount(false);
  }, [discountApi.loading]);

  const onApiSuccess = products => {
    const response = products?.response;
    if (populatData.length === 0) {
      // setPageInfo(response.pageInfo);
      setPopulateData(response.data);
    } else {
      // setPageInfo(response.pageInfo);
      setPopulateData(prevState => prevState.concat(response.data));
    }

    // response.pageInfo === '' && setCanCallNext(false);
    setPageLoading(false);
    // setBottomLoading(false);
    // setSearchLoading(false);
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
   * method will be called on press of header back button
   */
  const onPressBack = () => {
    navigation.goBack();
  };

  /**
   * method will be called on press of header dropdown button
   */
  const onPressDown = () => {};

  /**
   * method will be called on press of header rigth button
   */
  const onPressRight = () => {};

  /**
   * function to search from list
   * @param val value to search
   */
  const onChangeSearchInput = val => {
    setSearch(val);
  };

  /** method to deal with toggle favourite */
  const toggleFavourite = item => {};

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
          text1={''}
          text2={``}
          text3={``}
          onPressBack={onPressBack}
          onPressDown={onPressDown}
          onPressRight={onPressRight}
        />
        <View style={styles.searchView}>
          <TextInput
            placeholder={`Search`}
            value={search}
            editable={false}
            onChangeText={text => onChangeSearchInput(text)}
            iconLeft={
              search.length === 0 ? (
                <Icon
                  size={20}
                  color={colors.lowemphasis}
                  name={Icons.SEARCH}
                  type={'ant'}
                />
              ) : (
                <></>
              )
            }
            icon={
              search.length > 0 && (
                <Pressable onPress={() => onChangeSearchInput('')}>
                  <Icon
                    size={20}
                    color={colors.lowemphasis}
                    name={Icons.CROSS}
                  />
                </Pressable>
              )
            }
          />
        </View>

        {/* <View style={styles.countView}>
        <Text regular caption1 lowemphasis>{`125 trending items`}</Text>
      </View> */}

        <FlatList
          style={styles.cardsView}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={[
            styles.columnWrapperStyle,
            {
              justifyContent: 'space-between',
            },
          ]}
          data={populatData}
          numColumns={2}
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
                  discountApi.loading ||
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
          ListEmptyComponent={
            <NoRecordFound
              isSearch={search.length > 0 ? true : false}
              searchedItem={search}
              searchFrom={`items`}
              discription={``}
            />
          }
        />
      </SafeAreaView>
    </>
  );
};
export default ProductsScreen;
