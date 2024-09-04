import React, {useEffect, useState} from 'react';
import {BaseStyle} from '../../../config/styles';
import {View, FlatList, BackHandler, SafeAreaView} from 'react-native';
import {
  WishlistCardTrending,
  AddToBagModal,
  NoRecordFound,
  ConfirmationModal,
  LoginModal,
  SignupModal,
  ForgetModal,
} from '../../../components';
import styles from './styles';
import {useTheme} from '../../../config/theme';
import {API, useFetchDelete, useFetchGet} from '../../../services';
import {useDispatch, useSelector} from 'react-redux';
import {GeneralResponses} from '../../../services/responses';
import {insertData} from '../../../utils/queries';
import {useIsFocused} from '@react-navigation/native';
import {COMMON} from '../../../navigation/ROUTES';
import {withCommas} from '../../../utils/numberFormating';
import WishlistLoader from './Loader';
import RNExitApp from 'react-native-exit-app';
import {UserActions} from '../../../redux/actions';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
  name: 'NagitiveApperal.db',
  location: 'default',
});
const WishlistTab = ({navigation, route}) => {
  const colors = useTheme();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const isLogedIn = useSelector(state => state.user.isLogedIn);
  const storeId = useSelector(state => state.user.storeId);
  const uuid = useSelector(state => state.user.uuid);
  const userAccessToken = useSelector(state => state.user.userAccessToken);
  const [wishlist, setWishlist] = useState(global.wishlist);
  const isRegister = useSelector(state => state.user.isUserRegister);
  const isVerified = useSelector(state => state.user.isEmailVerified);
  const itmesInBag = useSelector(state => state.user.itemInBag);

  const [productId, setProductId] = useState('');
  const [addToBag, setAddToBag] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedColorItem, setSelectedColorItem] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(false);
  const [errMsg, setErrorMsg] = useState('');
  const [inventoryId, setInventoryId] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedCompPrice, setSelectedCompPrice] = useState('');
  const [imagesData, setImagesData] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [optionsData, setOptionsData] = useState([]);
  const [optionsHash, setOptionsHash] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [varientsData, setVarientsData] = useState([]);
  const [inventoryQuantity, setInventoryQuantity] = useState(0);
  const [itemInBag, setItemsinBag] = useState(0);
  const [disable, setDisable] = useState(true);
  const [goForApiCall, setGoForApiCall] = useState(true);
  const [goForProductApiCall, setGoForProductApiCall] = useState(false);
  const [data, setData] = useState();
  const [goForRemove, setGoForRemove] = useState(false);
  const [productForWishlist, setProductWishlist] = useState([]);
  const [goForDelete, setGoForDelete] = useState(false);
  const [openConModal, setOpenConModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [forgetModal, setForgetModal] = useState(false);

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

  /** api call for getting wishlist */
  const wishlistApi = useFetchGet(
    API.GET_WISHLIST,
    goForApiCall,
    storeId,
    uuid,
    {},
    userAccessToken,
  );

  /** api call for getting product detail */
  const product = useFetchGet(
    API.GET_PRODUCT_DETAIL + `?productId=${productId}`,
    goForProductApiCall,
    storeId,
    uuid,
  );

  /** api call for deleting product from wishlist */
  const deleteWishList = useFetchDelete(
    API.DEL_WISHLIST,
    {
      productId: productForWishlist.productId,
    },
    goForRemove,
    uuid,
    userAccessToken,
  );

  useEffect(() => {
    if (!isLogedIn) {
      setData([]);
      setPageLoading(false);
      if (isFocused) {
        if (isRegister && !isVerified) {
          setSignupModal(true);
        } else {
          setLoginModal(true);
        }
      }
    } else setGoForApiCall(true);
  }, [isFocused, navigation]);

  /** response of api call for getting product detail */
  useEffect(() => {
    if (!product.loading) {
      if (product.response?.status === GeneralResponses.STATUS_OK.CODE) {
        onApiSuccess(product);
      }
    } else {
      console.log('error occured in api call');
    }
    setGoForProductApiCall(false);
  }, [product.loading]);

  /** Use Effect For Selected Size and color */
  useEffect(() => {
    const filterData = optionsHash.filter(item => item.isSelected === true);
    if (filterData.length == 0) {
      setDisable(true);
    } else if (
      optionsHash.length > 0 &&
      filterData.length === optionsHash.length &&
      quantity > 0 &&
      !error
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [
    optionsData,
    selectedItem,
    selectedColorItem,
    selectedMaterial,
    selectedStyle,
    quantity,
    error,
  ]);

  // useEffect(() => {
  //   dispatch(UserActions.onSetShowBag(false));
  //   console.log('--------------category-----------');
  // });

  useEffect(() => {
    getDataFromDb();
  });

  /** response of api call for getting wishlist */
  useEffect(() => {
    if (!wishlistApi.loading) {
      if (wishlistApi.response?.status === GeneralResponses.STATUS_OK.CODE) {
        setData(wishlistApi.response?.data);
        setPageLoading(false);
      }
    } else {
      console.log('error occured in wishlis api call');
    }

    setGoForApiCall(false);
  }, [wishlistApi.loading]);

  /** response of api call deleting product from wishlist */
  useEffect(() => {
    if (!deleteWishList.loading) {
      if (deleteWishList.response?.status === GeneralResponses.STATUS_OK.CODE) {
        console.log('Deleted');
        setWishlist(prev => {
          let temp = new Set(prev);
          temp.delete(productForWishlist.productId);
          return temp;
        });
        global.wishlist.delete(productForWishlist.productId);
        const filterData = data.filter(
          item => item.productId !== productForWishlist.productId,
        );
        setData(filterData);
        setGoForDelete(false);
      }
    } else {
      console.log('error occured in remove from wishlist api');
    }
    setGoForRemove(false);
  }, [deleteWishList.loading]);

  /**
   * method called on success of api
   * @param {*} product data from api
   */
  const onApiSuccess = product => {
    const data = product?.response?.data;
    var quan = 0;
    setProductDetails(data);
    setOptionsData(data.options);

    if (data.options.length === 1 && data.options[0].name === 'Title') {
      setInventoryId(data.variants[0].id);
      if (data.variants[0].inventory_quantity > 0) setDisable(false);
      else {
        setError(true);
        setErrorMsg('Out of Stock');
      }
    }
    if (data.variants.length > 0) {
      setVarientsData(data.variants);
      setSelectedPrice(data.variants[0].price);
      setSelectedCompPrice(data.variants[0].compare_at_price);
    } else {
      setVarientsData([]);
      setError(true);
      setErrorMsg('Out of Stock');
    }

    for (let i = 0; i < data?.variants.length; i++) {
      quan = quan + data.variants[i].inventory_quantity;
    }
    const temp = [];
    for (let j = 0; j < data?.images?.length; j++) {
      temp.push([product?.response?.data?.images[j]?.src]);
    }

    var temp3 = [];
    for (let k = 0; k < data.options.length; k++) {
      temp3.push({
        name: data.options[k].name,
        isSelected: data.options[k].name !== 'Title' ? false : true,
        values: data.options[k].values,
        selectedItem: '',
        position: data.options[k].position,
      });
    }

    setInventoryQuantity(quan);
    setImagesData(temp);
    setOptionsHash(temp3);
    setPageLoading(false);
  };

  /**
   * method to select a item
   * @param {*} text text to select
   * @param {*} name item to select
   */
  const selectItem = (text, name) => {
    if (name === 'Size' || name === 'size') {
      if (selectedItem == text) {
        setSelectedItem('');
      } else setSelectedItem(text);
    } else if (name === 'color' || name === 'Color') {
      if (selectedColorItem == text) {
        setSelectedColorItem('');
      } else setSelectedColorItem(text);
    } else if (name === 'Style' || name === 'style') {
      if (selectedStyle == text) {
        setSelectedStyle('');
      } else setSelectedStyle(text);
    } else if (name === 'Material' || name === 'material') {
      if (selectedMaterial == text) {
        setSelectedMaterial('');
      } else setSelectedMaterial(text);
    }
    for (let i = 0; i < optionsHash.length; i++) {
      if (optionsHash[i].name === name) {
        let temp = optionsHash;
        if (optionsHash[i].selectedItem == text) {
          temp[i].isSelected = false;
          temp[i].selectedItem = '';
        } else {
          temp[i].isSelected = true;
          temp[i].selectedItem = text;
        }
        setOptionsData(temp);
      }
    }

    var format = '';
    for (let a = 0; a < optionsHash.length; a++) {
      if (optionsHash[a].selectedItem !== '') {
        a === optionsHash.length - 1
          ? (format = format + optionsHash[a].selectedItem)
          : (format = format + optionsHash[a].selectedItem + ` / `);
      }
    }
    const filterVarients = varientsData.filter(item => item.title === format);

    if (filterVarients.length > 0) {
      if (filterVarients[0].inventory_quantity <= 0) {
        setError(true);
        setErrorMsg('Out of Stock');
      } else if (filterVarients[0].inventory_quantity > 0) {
        setInventoryQuantity(filterVarients[0].inventory_quantity);
        setInventoryId(filterVarients[0].id);
        setSelectedPrice(filterVarients[0].price);
        setSelectedCompPrice(filterVarients[0].compare_at_price);
        setError(false);
        setErrorMsg('');
        quantity > filterVarients[0].inventory_quantity && setQuantity(1);
      }
    }
  };

  /**
   * method to decrement quantity
   */
  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  /**
   * method to increment quantity
   */
  const increment = () => {
    inventoryQuantity > quantity && setQuantity(quantity + 1);
  };

  /**
   * method will be called on Add to Cart Button
   */
  const addToCart = async () => {
    const createdAt = new Date();
    const compareAtPrice = productDetails?.compare_at_price;
    const productName = productDetails?.title
    const escapedProductName = productName.replace(/'/g, "''");
    let insertCart = `INSERT INTO Cart (product_id,variant_id,title,size,color,style,material,quantity,image,product_type,price,compare_at_price,created_at) VALUES `;
    let insertCartsingle =
      insertCart +
      `('${productDetails?.id}','${inventoryId}','${escapedProductName}','${selectedItem}','${selectedColorItem}','${selectedStyle}','${selectedMaterial}','${quantity}','${imagesData[0]}','${productDetails?.product_type}','${selectedPrice}','${selectedCompPrice}','${createdAt}')`;

    const inserted = insertData(
      insertCartsingle,
      `${quantity} ${quantity > 1 ? 'items' : 'item'} added to bag.`,
    );
    if (inserted) {
      setItemsinBag(itemInBag + 1);
      setAddToBag(false);
      dispatch(UserActions.onSetItemsInBag(itmesInBag + 1));
    }
  };

  /**
   * method to get data from cart
   */
  const getDataFromDb = async () => {
    const query = `select count(DISTINCT variant_id) as count from Cart`;
    await db.transaction(tx => {
      tx.executeSql(query, [], (tx, result) => {
        setItemsinBag(result.rows.item(0).count);
        console.log(result.rows.item(0).count);
        dispatch(UserActions.onSetItemsInBag(result.rows.item(0).count));
      });
    });
  };

  /**
   * method to delete item from wishlist
   * @param {*} item item to be deleted
   */
  const removeFromWishlist = item => {
    setProductWishlist(item);
    setGoForDelete(true);
  };

  /**
   * method to open add to bag modal
   */
  const openAddToBagModal = item => {
    setProductId(item.productId);
    setGoForProductApiCall(true);
    setSelectedColorItem('');
    setSelectedItem('');
    setError(false);
    setErrorMsg('');
    setVarientsData([]);
    setOptionsData([]);
    setQuantity(1);
    setOptionsHash([]);
    setAddToBag(true);
  };

  if (pageLoading || wishlistApi.loading) return <WishlistLoader />;

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
          setGoForApiCall(true);
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
          setGoForApiCall(true);
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
        title={`Sure to remove from wishlist?`}
        primaryText={`Cancel`}
        secondaryText={`Remove`}
        primaryAction={() => setGoForDelete(false)}
        secondaryAction={() => setGoForRemove(true)}
      />
      <ConfirmationModal
        visible={openConModal}
        title={`Are you sure to Exit?`}
        primaryText={`No`}
        secondaryText={`Yes`}
        primaryAction={() => setOpenConModal(false)}
        secondaryAction={() => RNExitApp.exitApp()}
      />
      <AddToBagModal
        visible={addToBag}
        onSwipeComplete={() => setAddToBag(false)}
        secondaryAction={addToCart}
        onBackdropPress={true}
        onPressDecrease={decrement}
        onPressIncrease={increment}
        optionsData={optionsData}
        selectedItem={selectedItem}
        selectedColorItem={selectedColorItem}
        selectedStyle={selectedStyle}
        selectedMaterial={selectedMaterial}
        selectItem={selectItem}
        errMsg={errMsg}
        error={error}
        inventoryQuantity={inventoryQuantity}
        disable={disable}
        quantity={quantity}
        decrement={decrement}
        increment={increment}
        loadingApi={product.loading}
      />
      <SafeAreaView
        style={[
          BaseStyle.safeAreaView,
          {backgroundColor: colors.backgroundColor},
        ]}
      >
        <View style={[BaseStyle.container]}>
          <View style={styles.flatlistView}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              columnWrapperStyle={styles.columnWrapperStyle}
              data={data}
              numColumns={2}
              renderItem={({item}) => {
                console.log(item);
                return (
                  <>
                    <WishlistCardTrending
                      image={item.Images[0]}
                      amount={withCommas(
                        item && item?.variants && item?.variants[0]
                          ? item?.variants[0]?.price
                          : item.price,
                      )}
                      currency={`Rs.`}
                      detail={item.title}
                      onPress={() => openAddToBagModal(item)}
                      goToDetail={() => {
                        navigation.navigate(COMMON.PRODUCTS_DETAIL, {
                          productData: {
                            id: item.productId,
                          },
                        });
                      }}
                      removeFromWishlist={() => removeFromWishlist(item)}
                    />
                  </>
                );
              }}
              ListEmptyComponent={
                <NoRecordFound
                  isSearch={false}
                  discription={`Nothing is added in Wishlist`}
                  isButton={false}
                />
              }
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
export default WishlistTab;
