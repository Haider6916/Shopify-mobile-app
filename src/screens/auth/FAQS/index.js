import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {BaseStyle} from '../../../config/styles';
import {useTheme} from '../../../config/theme';
import {Icon, Icons, NoRecordFound, Text} from '../../../components';
import styles from './styles';
import {View, StyleSheet} from 'react-native';
import {AccordionList} from 'accordion-collapse-react-native';
import {GeneralResponses} from '../../../services/responses';
import {useSelector} from 'react-redux';
import {API, useFetchGet} from '../../../services';
import FaqLoader from './Loader';

const FAQS = () => {
  const colors = useTheme();

  const storeId = useSelector(state => state.user.storeId);
  const uuid = useSelector(state => state.user.uuid);
  const isDarkMode = useSelector(state => state.user.clientDarkMode);

  const [goForApiCall, setGoForApiCall] = useState(true);
  const [list, setList] = useState([]);

  /** api call for getting Faq's */
  const faqApi = useFetchGet(API.GET_FAQ, goForApiCall, storeId, uuid);

  /** response of api call for getting Faq's */
  useEffect(() => {
    if (!faqApi.loading) {
      if (faqApi.response?.status === GeneralResponses.STATUS_OK.CODE) {
        onApiSuccess(faqApi?.response?.data);
        console.log(faqApi?.response?.data);
      }
    } else {
      console.log('error occured in faq api call');
    }
    setGoForApiCall(false);
  }, [faqApi.loading]);

  /**
   * function for success of api call
   */
  const onApiSuccess = data => {
    setList(data.faq);
  };

  /** head component of accordion list */
  const _head = (item, index, isExpanded) => {
    return (
      <View
        style={[
          StyleSheet.flatten([
            isExpanded === false
              ? styles.noticeViewNotExpanded
              : styles.noticeViewExpanded,
          ]),
          {
            backgroundColor: isDarkMode ? colors.lightGray : colors.whiteColor,
          },
        ]}
      >
        <Text
          medium
          title4
          highemphasis
          style={[styles.navigationViewHeaderText]}
        >
          {item.question}
        </Text>
        <View style={{marginLeft: 5}}>
          {isExpanded === false ? (
            <Icon
              name={Icons.CHEVRON_DOWN}
              color={colors.highemphasis}
              size={17}
            />
          ) : (
            <Icon
              name={Icons.CHEVRON_UP}
              color={colors.highemphasis}
              size={17}
            />
          )}
        </View>
      </View>
    );
  };

  /** body component of accordion list */
  const _body = item => {
    return (
      <View
        style={[
          styles.body,
          {
            backgroundColor: colors.lightGray,
          },
        ]}
      >
        <Text regular body1 highemphasis style={{textAlign: 'justify'}}>
          {item.answer}
        </Text>
      </View>
    );
  };

  if (faqApi.loading) return <FaqLoader />;
  return (
    <SafeAreaView
      style={[
        BaseStyle.safeAreaView,
        {
          backgroundColor: colors.backgroundColor,
          paddingHorizontal: 16,
        },
      ]}
    >
      {list.length > 0 ? (
        <View style={{marginVertical: 10}}>
          <Text style={{marginBottom: 11}} highemphasis regular body1>
            {`These are some of the frequently asked questions`}
          </Text>
          <AccordionList
            showsVerticalScrollIndicator={false}
            list={list}
            header={_head}
            body={_body}
            keyExtractor={item => `${item.key}`}
          />
        </View>
      ) : (
        <NoRecordFound
          isSearch={false}
          discription={`No FAQ's are Added yet!`}
          isButton={false}
        />
      )}
    </SafeAreaView>
  );
};
export default FAQS;
