import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {BaseStyle} from '../../../config/styles';
import {useTheme} from '../../../config/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import OrderHistoryCard from '../../../components/OrderHistoryCard';
import {API, useFetchGet} from '../../../services';
import {GeneralResponses} from '../../../services/responses';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {NoRecordFound} from '../../../components';
import HistoryLoader from './Loader';

const OrderHistory = ({}) => {
  const colors = useTheme();

  const storeId = useSelector(state => state.user.storeId);
  const uuid = useSelector(state => state.user.uuid);
  const userAccessToken = useSelector(state => state.user.userAccessToken);

  const [goForApiCall, setGoForApiCall] = useState(true);

  const [orderData, setOrderData] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  /** api call for getting Order History */
  const orderHistoryApi = useFetchGet(
    API.ORDER_HISTORY,
    goForApiCall,
    storeId,
    uuid,
    {},
    userAccessToken,
  );

  /** response of api call for getting Order History */
  useEffect(() => {
    if (!orderHistoryApi.loading) {
      if (
        orderHistoryApi.response?.status === GeneralResponses.STATUS_OK.CODE
      ) {
        setOrderData(orderHistoryApi.response.data);
        setPageLoading(false);
      }
    } else {
      console.log('error occured in api call');
    }
    setGoForApiCall(false);
  }, [orderHistoryApi.loading]);

  if (orderHistoryApi.loading || pageLoading) return <HistoryLoader />;
  return (
    <SafeAreaView
      style={[
        BaseStyle.safeAreaView,
        {backgroundColor: colors.backgroundColor},
      ]}
    >
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={BaseStyle.container}
      >
        {/* <History image={Popular1} type={'History'} /> */}
        {orderData.length > 0 ? (
          <>
            {orderData.map((item, index) => {
              return (
                <OrderHistoryCard
                  index={index}
                  orderId={item.orderId}
                  priceTotal={item.current_total_price}
                  products={item.line_items}
                  date={moment(item.created_at).format('DD.MM.YY h:mm')}
                  
                />
              );
            })}
          </>
        ) : (
          <NoRecordFound
            isSearch={false}
            discription={`You Haven't Order Anything yet!`}
            isButton={false}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderHistory;
