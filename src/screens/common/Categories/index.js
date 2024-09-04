import React, {useEffect, useState} from 'react';
import {
  ButtonInput,
  CardCategory,
  TextInput,
  SubscribeAndEmail,
  Icon,
  Icons,
  NoRecordFound,
  Text,
  WishListBag,
  ConfirmationModal,
} from '../../../components';
import styles from './styles';
import {BaseStyle} from '../../../config/styles';
import {
  FlatList,
  View,
  Pressable,
  ActivityIndicator,
  Vibration,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import {useTheme} from '../../../config/theme';
import {COMMON} from '../../../navigation/ROUTES';
import {useDispatch, useSelector} from 'react-redux';
import {API, useFetchGet} from '../../../services';
import {GeneralResponses} from '../../../services/responses';
import ProductsLoader from './Loader';
import useEmailValidation from '../../../hooks/useEmailValidation';
import {useIsFocused} from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';
import RNExitApp from 'react-native-exit-app';
import {UserActions} from '../../../redux/actions';

const db = SQLite.openDatabase({
  name: 'NagitiveApperal.db',
  location: 'default',
});

const Categories = ({navigation}) => {
  const colors = useTheme();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const storeId = useSelector(state => state.user.storeId);
  const uuid = useSelector(state => state.user.uuid);
  const isDarkMode = useSelector(state => state.user.clientDarkMode);
  // const scroll = useSelector(state => state.user.allowScroll);

  const [scroll, setScroll] = useState(true);
  const [emailInput, setEmailInput] = useState('');
  const [categoryData, setCategoryData] = useState([]);
  const [search, setSearch] = useState('');
  const [pageLimit] = useState(10);
  const [pageInfo, setPageInfo] = useState('');
  const [pageLoading, setPageLoading] = useState(true);
  const [goForApiCall, setGoForApiCall] = useState(true);
  const [canCallNext, setCanCallNext] = useState(true);
  const [bottomLoading, setBottomLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [itemInBag, setItemsinBag] = useState(0);

  const isEmailValid = useEmailValidation(emailInput);
  const [openConModal, setOpenConModal] = useState(false);

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

  /** api call for getting categories */
  const categories = useFetchGet(
    API.GET_CATEGORY +
      `?limit=${pageLimit}&page_info=${pageInfo}&SearchQuery=${search}`,
    goForApiCall,
    storeId,
    uuid,
  );

  /** response of api call for getting categories */
  useEffect(() => {
    if (!categories.loading) {
      if (categories.response?.status === GeneralResponses.STATUS_OK.CODE) {
        onApiSuccess(categories);
      }
    } else {
      console.log('error occured in api call');
    }
    setGoForApiCall(false);
  }, [categories.loading]);

  // useEffect(() => {
  //   dispatch(UserActions.onSetShowBag(true));
  //   console.log('--------------category-----------');
  // });
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
   * method called on success of Api
   * @param {*} categories response
   */
  const onApiSuccess = categories => {
    const response = categories?.response;

    const filterData = response.data.filter(item => item.Toggle !== false);

    if (categoryData.length === 0) {
      setPageInfo(response.pageInfo);
      setCategoryData(filterData);
    } else {
      setPageInfo(response.pageInfo);
      setCategoryData(prevState => prevState.concat(filterData));
    }
    response.pageInfo === '' && setCanCallNext(false);
    setBottomLoading(false);
    setPageLoading(false);
    setSearchLoading(false);
  };

  /**
   * function to called on onEndEditing
   */
  const onEndEditing = () => {
    setSearchLoading(true);
    setCategoryData([]);
    setPageInfo('');
    setCanCallNext(true);
    setGoForApiCall(true);
  };

  /**
   * method to navigate on subcategory
   * @param {*} item item data
   * @param {*} index item index
   */
  const goToSubcategory = (item, index) => {
    navigation.navigate(COMMON.SUB_CATEGORY, {
      data: item,
    });
  };

  /**
   * method called on press of cross in search input
   */
  const onPressCross = () => {
    setSearchLoading(true);
    setSearch('');
    setPageInfo('');
    setCategoryData([]);
    setCanCallNext(true);
    setGoForApiCall(true);
  };

  /**
   * method called on end reach of list
   */
  const onEndReach = () => {
    if (canCallNext) {
      setGoForApiCall(true);
      setBottomLoading(true);
    }
  };

  if (pageLoading) return <ProductsLoader isSearch={true} />;
  return (
    <>
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
        <View
          style={[BaseStyle.container]}
          nestedScrollEnabled={false}
          contentContainerStyle={{flexGrow: 1}}
        >
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            scrollEnabled={scroll}
            data={categoryData}
            onEndReached={onEndReach}
            ListHeaderComponent={
              <>
                <View style={styles.listHeader}>
                  <TextInput
                    placeholder={`Search in categories`}
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
                              isDarkMode ? colors.mediumemphasis : colors.faint
                            }
                            name={Icons.CROSS}
                          />
                        </Pressable>
                      )
                    }
                  />
                </View>
              </>
            }
            renderItem={({item, index}) => {
              return (
                <Pressable
                  key={index.toString()}
                  onPress={() => goToSubcategory(item, index)}
                  style={styles.columnWrapperStyle}
                >
                  <CardCategory
                    image={item?.image && JSON.parse(item?.image)}
                    text={item.title}
                    gradColor1={
                      index === 0
                        ? 'rgba(255, 228, 188, 1)'
                        : 'rgba(237, 237, 237, 1)'
                    }
                    gradColor2={
                      index === 0
                        ? 'rgba(255, 202, 202, 1)'
                        : 'rgba(237, 237, 237, 1)'
                    }
                  />
                </Pressable>
              );
            }}
            ListEmptyComponent={
              !searchLoading ? (
                <NoRecordFound
                  isSearch={search.length > 0 ? true : false}
                  searchedItem={search}
                  searchFrom={`categories`}
                />
              ) : (
                <ProductsLoader />
              )
            }
            // ListFooterComponent={
            //   <>
            //     {categoryData.length > 0 && (
            //       <>
            //         <SubscribeAndEmail
            //           text1={`Subscribe to our Newsletter today!`}
            //           text2={`Get updates about new products and flash sales.`}
            //         />
            //         <View style={styles.subscribeInput}>
            //           <ButtonInput
            //             placeholder={`Enter Email`}
            //             value={emailInput}
            //             onChangeText={text => setEmailInput(text)}
            //             buttonOnPress={() => console.log('subscribe pressed')}
            //             buttonText={`Subscribe`}
            //             disabled={emailInput.length === 0 || !isEmailValid}
            //           />

            //           <Text regular overline iserror>
            //             {emailInput.length > 0 &&
            //               !isEmailValid &&
            //               `Enter a valid email`}
            //           </Text>
            //         </View>
            //       </>
            //     )}
            //   </>
            // }
          />
        </View>
        {bottomLoading && (
          <View
            style={[
              styles.loaderView,
              {
                backgroundColor: colors.backgroundColor,
              },
            ]}
          >
            <ActivityIndicator size="large" color={colors.primaryLight} />
          </View>
        )}
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
export default Categories;
