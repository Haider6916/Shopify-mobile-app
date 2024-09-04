import React, {useEffect, useState} from 'react';
import {BaseStyle} from '../../../config/styles';
import {
  View,
  Dimensions,
  Pressable,
  ScrollView,
  FlatList,
  Share,
  Vibration,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import {ShareIcon, Back, PlusSvg, MinusSvg} from '../../../assets';
import {
  ProductSizePrice,
  Text,
  Button,
  SliderAndZoomModal,
  WishListBag,
  ForgetModal,
  SignupModal,
  LoginModal,
  Icon,
  Icons,
} from '../../../components';
import {useTheme} from '../../../config/theme';
import {
  API,
  useFetchDelete,
  useFetchGet,
  useFetchPost,
} from '../../../services';
import {useDispatch, useSelector} from 'react-redux';
import {GeneralResponses} from '../../../services/responses';
import ProductDetailLoader from './Loader';
import {insertData} from '../../../utils/queries';
import {COMMON} from '../../../navigation/ROUTES';
import SQLite from 'react-native-sqlite-storage';
import Toast from 'react-native-simple-toast';
import {withCommas} from '../../../utils/numberFormating';
import RenderHtml from 'react-native-render-html';
import Carousel from 'react-native-banner-carousel';
import {UserActions} from '../../../redux/actions';

const db = SQLite.openDatabase({
  name: 'NagitiveApperal.db',
  location: 'default',
});
const {width, height} = Dimensions.get('screen');

const ProductDetail = ({navigation, route}) => {
  const colors = useTheme();
  const dispatch = useDispatch();
  const productData = route?.params?.productData;

  const isLogedIn = useSelector(state => state.user.isLogedIn);
  const storeId = useSelector(state => state.user.storeId);
  const uuid = useSelector(state => state.user.uuid);
  const isDarkMode = useSelector(state => state.user.clientDarkMode);
  const userAccessToken = useSelector(state => state.user.userAccessToken);
  const isRegister = useSelector(state => state.user.isUserRegister);
  const isVerified = useSelector(state => state.user.isEmailVerified);
  // const scroll = useSelector(state => state.user.allowScroll);
  const itmesInBag = useSelector(state => state.user.itemInBag);

  const [scroll, setScroll] = useState(true);
  const [goForApiCall, setGoForApiCall] = useState(true);
  const [disable, setDisable] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [productDetails, setProductDetails] = useState([]);
  const [imagesData, setImagesData] = useState([]);
  const [images, setImages] = useState();
  const [optionsData, setOptionsData] = useState([]);
  const [optionsHash, setOptionsHash] = useState([]);
  const [varientsData, setVarientsData] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedColorItem, setSelectedColorItem] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [inventoryQuantity, setInventoryQuantity] = useState(0);
  const [itemInBag, setItemsinBag] = useState(0);
  const [zoomModal, setZoomModal] = useState(false);
  const [error, setError] = useState(false);
  const [errMsg, setErrorMsg] = useState('');
  const [inventoryId, setInventoryId] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedCompPrice, setSelectedCompPrice] = useState('');
  const [wishlist, setWishlist] = useState(global.wishlist);
  const [goForAdd, setGoForAdd] = useState(false);
  const [productForWishlist, setProductWishlist] = useState([]);
  const [goForRemove, setGoForRemove] = useState(false);
  const [goForWishlistApiCall, setGoForWishlistApiCall] = useState(true);
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [forgetModal, setForgetModal] = useState(false);

  /** api call for getting product detail */
  const product = useFetchGet(
    API.GET_PRODUCT_DETAIL + `?productId=${productData?.id}`,
    goForApiCall,
    storeId,
    uuid,
  );

  /** api call for adding product to wishlist */
  const addWishList = useFetchPost(
    API.ADD_WISHLIST,
    {
      productId: productForWishlist.id,
      title: productForWishlist.title,
      price: selectedPrice,
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

  /** response of api call for getting product detail */
  useEffect(() => {
    if (!product.loading) {
      if (product.response?.status === GeneralResponses.STATUS_OK.CODE) {
        onApiSuccess(product);
      }
    } else {
      console.log('error occured in api call');
    }
    setGoForApiCall(false);
  }, [product.loading]);

  /** response of api call for adding product to wishlist */
  useEffect(() => {
    if (!addWishList.loading) {
      if (addWishList.response?.status === GeneralResponses.STATUS_OK.CODE) {
        console.log('Added to Wishlist');
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
        console.log('Removed Form WishList');
      }
    } else {
      console.log('error occured in remove from wishlist api');
    }
    setGoForRemove(false);
  }, [deleteWishList.loading]);

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
    } else if (inventoryQuantity) {
    } else {
      setDisable(true);
    }
  }, [
    optionsData,
    selectedItem,
    selectedColorItem,
    quantity,
    error,
    selectedMaterial,
    selectedStyle,
  ]);

  useEffect(() => {
    getDataFromDb();
  }, []);

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
    const temp2 = [];
    for (let j = 0; j < data?.images?.length; j++) {
      temp[j] = product?.response?.data?.images[j]?.src;
      temp2[j] = {
        url: product?.response?.data?.images[j]?.src,
        // width: width,
        // height: height / 1.57, //height / 1.65
      };
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
    setImages(temp2);
    setOptionsHash(temp3);
    setPageLoading(false);
  };

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

  const headerView = () => {
    return (
      <View style={styles.headerIcons}>
        <Pressable
          onPress={onPressBack}
          style={{
            backgroundColor: isDarkMode
              ? colors.backgroundColor
              : 'rgba(0,0,0,0.1)',
            height: 35,
            width: 35,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon
            name={Icons.ARROW_LEFT}
            color={isDarkMode ? colors.whiteColor : colors.blackColor}
            size={25}
            type={'ant'}
          />
          {/* <Back /> */}
        </Pressable>
        <Pressable
          onPress={onPressShare}
          style={{
            backgroundColor: isDarkMode
              ? colors.backgroundColor
              : 'rgba(0,0,0,0.1)',
            height: 35,
            width: 35,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon
            name={Icons.SHARE}
            color={isDarkMode ? colors.whiteColor : colors.blackColor}
            size={23}
            type={'ant'}
          />
          {/* <ShareIcon /> */}
        </Pressable>
      </View>
    );
  };

  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increment = () => {
    inventoryQuantity > quantity && setQuantity(quantity + 1);
  };

  /**
   * method will be called on back button press
   */
  const onPressBack = () => {
    navigation.goBack();
  };

  /**
   * method will be called on Add to Cart Button
   */
  const addToCart = async () => {
    const createdAt = new Date();
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
      dispatch(UserActions.onSetItemsInBag(itmesInBag + 1));
    }
  };

  /**
   * method will be called on share button press
   */
  const onPressShare = async () => {
    try {
      const result = await Share.share({
        message: `${productDetails?.title} ${productDetails?.webUrl}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
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

  /** styles for webview */
  const contentHtmlStyles = {
    table: {
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderColor: '#ccc',
      marginBottom: 7,
      color: isDarkMode ? colors.whiteColor : colors.mediumemphasis,
    },
    tr: {
      borderBottomWidth: 1,
      borderColor: '#ccc',
    },
    td: {
      borderRightWidth: 1,
      borderColor: '#ccc',
      padding: 5,
    },
    p: {
      color: isDarkMode ? colors.whiteColor : colors.mediumemphasis,
    },
    div: {
      color: isDarkMode ? colors.whiteColor : colors.mediumemphasis,
    },
    ul: {
      color: isDarkMode ? colors.whiteColor : colors.mediumemphasis,
    },
    b: {
      color: isDarkMode ? colors.whiteColor : colors.mediumemphasis,
    },
    body: {
      color: isDarkMode ? colors.whiteColor : colors.mediumemphasis,
    },
    head: {
      color: isDarkMode ? colors.whiteColor : colors.mediumemphasis,
    },
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
      <SliderAndZoomModal
        visible={zoomModal}
        images={images}
        primaryAction={() => setZoomModal(false)}
      />
      <SafeAreaView
        style={[
          BaseStyle.safeAreaView,
          {backgroundColor: colors.backgroundColor},
        ]}
      >
        {pageLoading ? (
          <ProductDetailLoader />
        ) : (
          <>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              scrollEnabled={scroll}
            >
              <View style={[styles.sliderImageStyle]}>
                <Carousel
                  autoplay
                  autoplayTimeout={5000}
                  loop
                  index={0}
                  pageSize={width}
                >
                  {images.map((item, index) => {
                    return (
                      <Pressable
                        onPress={() => setZoomModal(true)}
                        key={index.toString()}
                      >
                        <Image
                          resizeMode={'contain'}
                          style={{width: width, height: height / 1.6}}
                          source={{uri: item.url}}
                        />
                      </Pressable>
                    );
                  })}
                </Carousel>
                {/* <ImageViewer
                  enableImageZoom={false}
                  imageUrls={images}
                  renderIndicator={() => <></>}
                  backgroundColor={'#ffffff'}
                  maxOverflow={0}
                  onClick={() => setZoomModal(true)}
                  saveToLocalByLongPress={false}
                  renderFooter={(currentIndex, allSize) => (
                    <View
                      style={{
                        width: width,
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      {images.map((item, index) => {
                        return (
                          <View
                            key={index.toString()}
                            style={{
                              height: 12,
                              width: 12,
                              borderRadius: 6,
                              backgroundColor:
                                currentIndex === index
                                  ? colors.mediumemphasis
                                  : colors.whiteColor,
                              marginRight: 5,
                              borderWidth: 1,
                              borderColor:
                                currentIndex !== index
                                  ? colors.bordercolor
                                  : colors.primaryDark,
                              bottom: 17,
                            }}
                          />
                        );
                      })}
                    </View>
                  )}
                /> */}
                {/* <Pressable
                  onPress={() => setZoomModal(true)}
                  style={[styles.sliderImageStyle, {position: 'absolute'}]}
                /> */}
                {headerView()}
              </View>

              <View style={[BaseStyle.container]}>
                <View style={{}}>
                  {/* {console.log(productDetails?.id)} */}
                  <ProductSizePrice
                    Description={productDetails?.title}
                    currency={'Rs'}
                    Price={withCommas(selectedPrice)}
                    discount={
                      selectedPrice === selectedCompPrice
                        ? ''
                        : withCommas(selectedCompPrice)
                    }
                    inventoryQuantity={inventoryQuantity}
                    isFavourite={
                      isLogedIn
                        ? wishlist && wishlist.has(productDetails.id)
                        : false
                    }
                    toggleFavourite={() => addToWishlist(productDetails)}
                    error={error}
                    errMsg={errMsg}
                  />
                </View>
                {optionsData && (
                  <>
                    {optionsData.map((data, index) => {
                      if (data.name !== 'Title')
                        return (
                          <View key={index.toString()}>
                            <View style={styles.titleView}>
                              <Text
                                body2
                                medium
                                style={{
                                  color: isDarkMode
                                    ? colors.whiteColor
                                    : colors.lowemphasis,
                                }}
                              >
                                {data.name}
                              </Text>
                            </View>

                            <View>
                              <FlatList
                                scrollEnabled={scroll}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                data={data.values}
                                renderItem={({item}) => {
                                  return (
                                    <View style={styles.selectedItemView}>
                                      <SelectedItem
                                        text={item}
                                        isSelected={
                                          selectedItem === item ||
                                          selectedColorItem === item ||
                                          selectedStyle === item ||
                                          selectedMaterial === item
                                            ? true
                                            : false
                                        }
                                        name={data.name}
                                        setSelected={selectItem}
                                      />
                                    </View>
                                  );
                                }}
                              />
                            </View>
                          </View>
                        );
                    })}
                  </>
                )}
                {productDetails?.body_html.length > 0 && (
                  <View style={styles.htmlRenderMainView}>
                    <View style={styles.productDetailsTxtView}>
                      <Text
                        title3
                        bold
                        style={{
                          color: isDarkMode
                            ? colors.whiteColor
                            : colors.highemphasis,
                        }}
                      >{`Product Details`}</Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: colors.statusBarGray,
                        padding: 10,
                        borderRadius: 5,
                      }}
                    >
                      <RenderHtml
                        contentWidth={width}
                        tagsStyles={contentHtmlStyles}
                        source={{
                          html: productDetails.body_html,
                        }}
                      />
                    </View>
                  </View>
                )}

                {/* <View style={styles.bannerView}>
                  <PromocodeBanner
                    grad1="rgba(255, 189, 60, 1)"
                    grad2="rgba(255, 114, 34, 1)"
                    image={PromoBannerimage}
                    text={`Use The Promo Code 'EIDI123' To Avail Our Special Eid Discount\nOf Upto 45%!`}
                  />
                </View> */}
                {/* <View style={styles.txtView}>
                  <Text blackColor bold title3>
                    {`You May Also Like`}
                  </Text>
                </View>
                <View style={styles.flatListView}>
                  <FlatList
                    horizontal={true}
                                scrollEnabled={scroll}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={populatData}
                    renderItem={({item}) => {
                      return (
                        <View style={styles.cardTrendingView}>
                          <CardTrending
                            // mainstyle={styles.cardTrendingStyle}
                            image={item.image}
                            isLoading={item.loading}
                            amount={withCommas(item.amount)}
                            currency={item.currency}
                            detail={item.detail}
                            isFavourite={false}
                            toggleFavourite={() =>
                              console.log('add to wishlist')
                            }
                            // isFavourite={
                            //   isLogedIn ? wishlist.has(item.id) : false
                            // }
                            // toggleFavourite={() => addToWishlist(item)}
                          />
                        </View>
                      );
                    }}
                  />
                </View> */}
              </View>
            </ScrollView>

            <View style={[styles.buttonContainer]}>
              <View
                style={[
                  styles.iconsView,
                  {backgroundColor: colors.statusBarGray},
                ]}
              >
                <View>
                  <Pressable onPress={decrement}>
                    <Icon
                      name={Icons.MINUS_CIRCLE}
                      size={22}
                      color={
                        isDarkMode ? colors.whiteColor : colors.mediumemphasis
                      }
                      type={'ant'}
                    />
                    {/* <MinusSvg /> */}
                  </Pressable>
                </View>
                <Text title4 regular highemphasis>
                  {quantity}
                </Text>
                <View>
                  <Pressable onPress={increment}>
                    <Icon
                      name={Icons.PLUS_CIRCILE}
                      size={22}
                      color={
                        isDarkMode ? colors.whiteColor : colors.mediumemphasis
                      }
                      type={'ant'}
                    />
                    {/* <PlusSvg /> */}
                  </Pressable>
                </View>
              </View>
              <Button
                disabled={disable}
                onPress={addToCart}
                type={'primary'}
                buttonStyle={styles.btn}
                textStyles={{
                  color: isDarkMode ? colors.blackColor : colors.whiteColor,
                }}
                text={`ADD TO BAG`}
              />
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
              />
            )}
          </>
        )}
      </SafeAreaView>
    </>
  );
};
export default ProductDetail;

const SelectedItem = ({text, isSelected, name, setSelected, style}) => {
  const colors = useTheme();
  const isDarkMode = useSelector(state => state.user.clientDarkMode);
  return (
    <Pressable
      onPress={() => setSelected(text, name)}
      style={[
        styles.card,
        {
          borderColor: isDarkMode ? colors.whiteColor : colors.statusBarGray,
          backgroundColor: isSelected
            ? isDarkMode
              ? colors.whiteColor
              : colors.bordercolor
            : isDarkMode
            ? colors.backgroundColor
            : colors.lightGray,
        },
        style,
      ]}
    >
      <Text
        body2
        medium
        style={{
          color: isSelected
            ? isDarkMode
              ? colors.blackColor
              : colors.mediumemphasis
            : isDarkMode
            ? colors.whiteColor
            : colors.bordercolor,
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
};
