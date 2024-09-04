import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BaseStyle} from '../../../config/styles';
import {Button, AddressBookCard, ConfirmationModal} from '../../../components';
import styles from './styles';
import {useTheme} from '../../../config/theme';
import NoAddress from '../../../components/NoAddress';
import {API, useFetchDelete, useFetchGet} from '../../../services';
import {useSelector} from 'react-redux';
import {GeneralResponses} from '../../../services/responses';
import Toast from 'react-native-simple-toast';
import {AUTH} from '../../../navigation/ROUTES';
import AddressLoader from './Loader';
import {useIsFocused} from '@react-navigation/native';

const AddressBook = ({navigation}) => {
  const colors = useTheme();
  const isFocused = useIsFocused();

  const userAccessToken = useSelector(state => state.user.userAccessToken);
  const storeId = useSelector(state => state.user.storeId);
  const uuid = useSelector(state => state.user.uuid);
  const isDarkMode = useSelector(state => state.user.clientDarkMode);

  const [addressData, setAddressData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [goForApiCall, setGoForApiCall] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [goForDeleteApi, setGoForDeleteApi] = useState(false);
  const [addressToDel, setAddressToDel] = useState('');
  const [updateModal, setUpdateModal] = useState(false);
  const [addressEdit, setAddressEdit] = useState();

  /** api call for getting address */
  const addressListApi = useFetchGet(
    API.GET_ADDRESS,
    goForApiCall,
    storeId,
    uuid,
    {},
    userAccessToken,
  );

  /** api call for deleting a address */
  const deleteAddressApi = useFetchDelete(
    API.DEL_ADDRESS,
    {
      _id: addressToDel,
    },
    goForDeleteApi,
    uuid,
    userAccessToken,
  );

  useEffect(() => {
    setGoForApiCall(true);
  }, [navigation, isFocused]);

  /** response of api call for getting Address list */
  useEffect(() => {
    if (!addressListApi.loading) {
      if (addressListApi.response?.status === GeneralResponses.STATUS_OK.CODE) {
        setAddressData(addressListApi.response?.data);
        setPageLoading(false);
      }
    } else {
      console.log('error occured in getting address api call');
    }
    setGoForApiCall(false);
  }, [addressListApi.loading]);

  /** response of api call deleting a address */
  useEffect(() => {
    if (!deleteAddressApi.loading) {
      if (
        deleteAddressApi.response?.status === GeneralResponses.STATUS_OK.CODE
      ) {
        const filterData = addressData.filter(
          item => item._id !== addressToDel,
        );
        setAddressData(filterData);
        setDeleteModal(false);
      }
    } else {
      console.log('error occured in removing address api');
    }
    setGoForDeleteApi(false);
  }, [deleteAddressApi.loading]);

  /** function to add address */
  const addAddress = () => {
    if (addressData.length >= 3) {
      Toast.show(
        'You cannot added more than 3 address please delete some address',
        Toast.SHORT,
      );
    } else
      navigation.navigate(AUTH.ADD_ADDRESS, {
        exitPoint: 'MYHUB',
        addressData: addressData,
      });
  };

  /** function to delete address */
  const deleteAddress = () => {
    setGoForDeleteApi(true);
  };

  /**
   * method to update user address
   */
  const updateAddress = () => {
    setUpdateModal(false);
    navigation.navigate(AUTH.ADD_ADDRESS, {
      exitPoint: 'MYHUB',
      data: addressEdit,
    });
  };

  if (addressListApi.loading || pageLoading) return <AddressLoader />;

  return (
    <>
      <ConfirmationModal
        visible={deleteModal}
        title={`Sure to remove this address?`}
        primaryText={`Cancel`}
        secondaryText={`Remove`}
        primaryAction={() => setDeleteModal(false)}
        secondaryAction={() => deleteAddress()}
      />
      <ConfirmationModal
        visible={updateModal}
        title={`Sure to edit this address?`}
        primaryText={`Cancel`}
        secondaryText={`Edit`}
        primaryAction={() => setUpdateModal(false)}
        secondaryAction={() => updateAddress()}
      />
      <SafeAreaView
        style={[
          BaseStyle.safeAreaView,
          {backgroundColor: colors.backgroundColor},
        ]}
      >
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={[BaseStyle.container]}
          contentContainerStyle={styles.contentContainer}
        >
          {addressData.length > 0 ? (
            <View>
              {addressData.map((item, index) => {
                return (
                  <>
                    <AddressBookCard
                      key={index.toString()}
                      IsDeliveryAdress={item.IsDeliveryAdress}
                      IsBillingAdress={item.IsBillingAdress}
                      text={item.firstName + ' ' + item.lastName}
                      phnNo={item.phone}
                      add1={item.address1}
                      add2={item.address2}
                      city={item.city}
                      postal={item.zip}
                      isButton={false}
                      onPressDelete={() => {
                        setAddressToDel(item._id);
                        setDeleteModal(true);
                      }}
                      onPressUpdate={() => {
                        setAddressEdit(item);
                        setUpdateModal(true);
                      }}
                    />
                  </>
                );
              })}
            </View>
          ) : (
            <>
              <NoAddress />
            </>
          )}
          <View style={styles.buttonView}>
            <Button
              text="ADD ADDRESS"
              onPress={addAddress}
              loading={addressListApi.loading || deleteAddressApi.loading}
              textStyles={{
                color: isDarkMode ? colors.blackColor : colors.whiteColor,
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
export default AddressBook;
