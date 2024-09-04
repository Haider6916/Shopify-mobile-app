import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useEffect, useState} from 'react';
import {BaseStyle} from '../../../config/styles';
import {ActivityIndicator, Image, View, Dimensions} from 'react-native';
import styles from './styles';
import {useDispatch} from 'react-redux';
import {UserActions} from '../../../redux/actions';
import {useTheme} from '../../../config/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createTable, insertData} from '../../../utils/queries';
import {API, useFetchGet} from '../../../services';
import {GeneralResponses} from '../../../services/responses';
import {COMMON} from '../../../navigation/ROUTES';

const {height, width} = Dimensions.get('screen');
let createCartTable = `CREATE TABLE IF NOT EXISTS "Cart" (
  "product_id" TEXT ,
  "variant_id" TEXT ,
  "title" TEXT ,
  "size" TEXT ,
  "color" TEXT ,
  "style" TEXT ,
  "material" TEXT ,
  "quantity" TEXT ,
  "image" TEXT ,
  "product_type" TEXT ,
  "price" TEXT ,
  "compare_at_price" TEXT ,
  "created_at" TEXT ,
  "orderSubmitted"  TEXT default 0 
);`;

let createSuggestions = `CREATE TABLE IF NOT EXISTS "Suggestions" (
  "id" TEXT ,
  "title" TEXT ,
  "type"  TEXT  
);`;

let createRecent = `CREATE TABLE IF NOT EXISTS "Recent_Search" (
  "title" TEXT,
  "time" TEXT
);`;

const Splash = ({navigation}) => {
  const colors = useTheme();
  const dispatch = useDispatch();

  global.wishlist = new Set();

  const storeId = '64075f0778989fc31c467a65';
  const uuid = '32c39fdc-6c16-4896-ab18-47aba321c62f';
  const [goForApiCall, setGoForApiCall] = useState(true);
  const [goForMapCall, setGoForMapCall] = useState(true);
  const [goForSuggestion, setGoSuggestion] = useState(true);
  const [data, setData] = useState();

  /** api call for getting splash */
  const splash = useFetchGet(API.GET_SPLASH + `?uuid=${uuid}`, goForApiCall);

  /** api call for getting map locations */
  const mapApi = useFetchGet(API.GET_SETTING, goForMapCall, '', uuid);

  /** api call for getting suggestions */
  const suggestionsApi = useFetchGet(
    API.GET_SUGGESTIONS,
    goForSuggestion,
    '',
    uuid,
  );

  /** response of api call for getting Suggestions Data */
  useEffect(() => {
    if (!suggestionsApi.loading) {
      if (suggestionsApi.response?.status === GeneralResponses.STATUS_OK.CODE) {
        onSuggestSuccess(suggestionsApi.response?.data);
      }
    } else {
      console.log('error occured in Suggestions Api ');
    }
    setGoSuggestion(false);
  }, [suggestionsApi.loading]);

  /** response of api call for getting Map Data */
  useEffect(() => {
    if (!mapApi.loading) {
      if (mapApi.response?.status === GeneralResponses.STATUS_OK.CODE) {
        onMapApiSuccess(mapApi.response?.data);
       
      }
    } else {
      console.log('error occured in Map Api ');
    }
    setGoForMapCall(false);
  }, [mapApi.loading]);

  /** response of api call for getting splash */
  useEffect(() => {
    if (!splash.loading) {
      if (splash.response?.status === GeneralResponses.STATUS_OK.CODE) {
        setData(splash?.response?.data);
        dispatch(
          UserActions.onSetClientDarkMode(
            splash?.response?.data?.themeName == 'light' ? false : true,
          ),
        );
      }
    } else {
      console.log('error occured in splash api call');
    }
    setGoForApiCall(false);
  }, [splash.loading]);

  /**
   * Wait for 5 second on splash and then move to login
   */
  useEffect(() => {
    getUserData();
    dispatch(UserActions.onSetStoreId(storeId));
    dispatch(UserActions.onSetUuid(uuid));
    // dispatch(UserActions.onSetPositionX(width - 70));
    // dispatch(UserActions.onSetPositionY(height - 250));
    createTable(createCartTable, 'Cart');
    createTable(createRecent, 'Recent_Search');
    setTimeout(() => {
      navigation.replace(COMMON.MY_TABS);
    }, 5000);
  }, []);

  /** function called on success of suggestion api */
  const onSuggestSuccess = data => {
    createTable(createSuggestions, 'Suggestions');
    let insertCart = `INSERT INTO Suggestions (id,title,type) VALUES `;

    let insertCartsingle = '';
    for (let i = 0; i < data.length; i++) {
      const productName = data[i].title
    const escapedProductName = productName.replace(/'/g, "''");
      insertCartsingle =
        insertCartsingle +
        `('${data[i]._id}','${escapedProductName}','${data[i].product_type}')${
          i == data.length - 1 ? ';' : ','
        }`;
    }
    const inserted = insertData(insertCart + insertCartsingle);
    if (inserted) console.log('inserted Suggestion');
  };
  /** if Map api hit sucessfully it will get data from api */
  const onMapApiSuccess = async data => {
    try {
      dispatch(UserActions.onSetAppLogo(data.AppLogoUrlLight));
      dispatch(UserActions.onSetAppLogoDark(data.AppLogoUrlDark));
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('@mapData', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  /**
   * method to check either user is Logged In or not
   */
  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@accessToken');
      const isRegister = await AsyncStorage.getItem('@userRegister');
      const isValidate = await AsyncStorage.getItem('@emailVerified');
      dispatch(
        UserActions.onSetIsUserRegiaster(isRegister === 'true' ? true : false),
      );
      dispatch(
        UserActions.onSetIsEmailVerified(isValidate === 'true' ? true : false),
      );
      if (jsonValue != null) {
        dispatch(UserActions.onSetIsLoggedIn(true));
        dispatch(UserActions.onSetUserAccessToken(jsonValue));
      } else dispatch(UserActions.onSetIsLoggedIn(false));
    } catch (e) {
      console.log('No Data Available', e);
      // error reading value
    }
  };

  // const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
  return (
    <SafeAreaView
      style={[
        BaseStyle.safeAreaView,
        {backgroundColor: colors.backgroundColor},
      ]}
    >
      {splash.loading ? (
        <View style={[styles.viewstyle]}>
          <ActivityIndicator size="large" color={colors.highemphasis} />
        </View>
      ) : (
        splash?.response?.data?.themeName == 'light' ? (<Image
          style={{height: height, width: width}}
          resizeMode={'stretch'}
          // style={{top: -APPBAR_HEIGHT, height: height, width: '100%'}}
          source={{uri: data?.splashScreenLight}}
        />):(<Image
          style={{height: height, width: width}}
          resizeMode={'stretch'}
          // style={{top: -APPBAR_HEIGHT, height: height, width: '100%'}}
          source={{uri: data?.splashScreenDark}}
        />)
        
      )}
    </SafeAreaView>
  );
};
export default Splash;
