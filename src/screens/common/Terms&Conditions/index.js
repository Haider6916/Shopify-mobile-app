import React, { useEffect, useState } from 'react';
import {Dimensions, ScrollView, View} from 'react-native';
import {BaseStyle} from '../../../config/styles';
import {useTheme} from '../../../config/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NoRecordFound, Text} from '../../../components';
import styles from './styles';
import { useSelector } from 'react-redux';
import { GeneralResponses } from '../../../services/responses';
import { API, useFetchGet } from '../../../services';
import HTML, { RenderHTML } from 'react-native-render-html';
import ProductsLoader from './Loader';

const {width, height} = Dimensions.get('screen');

const TermsConditions = ({}) => {
  const colors = useTheme();

  const storeId = useSelector(state => state.user.storeId);
  const uuid = useSelector(state => state.user.uuid);
  const isDarkMode = useSelector(state => state.user.clientDarkMode);

  const [goForApiCall, setGoForApiCall] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  
  const [list, setList] = useState([]);

  /** api call for getting Faq's */
  const termsNCondition = useFetchGet(API.TERMS_CONDITION, goForApiCall, storeId, uuid);

  /** response of api call for getting Faq's */
  useEffect(() => {
    if (!termsNCondition.loading) {
      if (termsNCondition.response?.status === GeneralResponses.STATUS_OK.CODE) {
        setList(termsNCondition?.response?.data);
        setPageLoading(false);
        // console.log(termsNCondition?.response?.data);
      }
    } else {
      console.log('error occured in api call');
    }
    setGoForApiCall(false);
  }, [termsNCondition.loading]);


  const contentHtmlStyles = {
    table: {
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderColor: '#ccc',
      marginBottom: 7,
      color: colors.highemphasis
      ,
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
      color: colors.highemphasis,
    },
    div: {
      color: colors.highemphasis,
    },
    ul: {
      color: colors.highemphasis,
    },
    b: {
      color: colors.highemphasis,
    },
    body: {
      color: colors.highemphasis,
    },
    head: {
      color: colors.highemphasis,
    },
  };

  if (pageLoading) return <ProductsLoader isSearch={true} />;
  return (
    <SafeAreaView
      style={[
        BaseStyle.safeAreaView,
        {backgroundColor: colors.backgroundColor},
      ]}>
      {list.length > 0 ? (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={BaseStyle.container}>

           {list.map((item, index) => {
              return (
                <RenderHTML
                        contentWidth={width}
                        tagsStyles={contentHtmlStyles}
                        source={{
                          html: item.body,
                        }}
                      />
              );
            })}
      </ScrollView>
      ): (
        <NoRecordFound
          isSearch={false}
          discription={`No Terms & Conditions are Added yet!`}
          isButton={false}
        />
      )}
    </SafeAreaView>
  );
};

export default TermsConditions;
