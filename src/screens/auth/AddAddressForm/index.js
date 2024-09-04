import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  RadioButton,
  Icon,
  Icons,
} from '../../../components';
import styles from './styles';
import {useTheme} from '../../../config/theme';
import {BaseStyle} from '../../../config/styles';
import {cities} from '../../../data/cities';
import useMobileNumberValidation from '../../../hooks/useMobileNumberValidation';
import {isNameValid} from '../../../utils/stringOperations';
import {API, useFetchPost, useFetchPut} from '../../../services';
import {GeneralResponses} from '../../../services/responses';
import {useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import { SelectList } from 'react-native-dropdown-select-list';

const AddAddressForm = ({navigation, route}) => {
  const colors = useTheme();
  const exitPoint = route?.params?.exitPoint;
  const addressData = route?.params?.addressData;
  const addressToEdit = route?.params?.data;

  const userAccessToken = useSelector(state => state.user.userAccessToken);
  const uuid = useSelector(state => state.user.uuid);
  const isDarkMode = useSelector(state => state.user.clientDarkMode);

  const [firstName, setFirstName] = useState(
    addressToEdit ? addressToEdit.firstName : '',
  );
  const [lastName, setLastName] = useState(
    addressToEdit ? addressToEdit.lastName : '',
  );
  const [mobileNumber, setMobileNumber] = useState(
    addressToEdit ? addressToEdit.phone.substring(3) : '',
  );
  const [address, setAddress] = useState(
    addressToEdit ? addressToEdit.address1 : '',
  );
  const [address2, setAddress2] = useState(
    addressToEdit ? addressToEdit.address2 : '',
  );
  const [zipcode, setZipCode] = useState(
    addressToEdit ? addressToEdit.zip : '',
  );
  const [deliveryAddress, setDeliveryAddress] = useState(
    addressToEdit ? addressToEdit.IsDeliveryAdress : true,
  );
  const [billingAddress, setBillingAddress] = useState(
    addressToEdit ? addressToEdit.IsBillingAdress : false,
  );
  const [city, setCity] = useState(addressToEdit ? addressToEdit.city : '');
  const [countryCode] = useState('92');
  const [goForaddaddress, setGoForaddaddress] = useState(false);
  const [goForUpdate, setGoForUpdate] = useState(false);

  const isPhoNoValid = useMobileNumberValidation(mobileNumber);

  /** api call for add address */
  const addAddressApi = useFetchPost(
    API.ADD_ADDRESS,
    {
      firstName: firstName,
      lastName: lastName,
      address1: address,
      address2: address2,
      phone: `+${countryCode}` + mobileNumber,
      zip: zipcode,
      city: city,
      country: 'Pakistan',
      IsDeliveryAdress: deliveryAddress,
      IsBillingAdress: billingAddress,
    },
    goForaddaddress,
    uuid,
    userAccessToken,
  );

  /** api call for update address*/
  const updateApi = useFetchPut(
    API.UPDATE_ADDRESS,
    {
      _id: addressToEdit?._id,
      firstName: firstName,
      lastName: lastName,
      address1: address,
      address2: address2,
      city: city,
      phone: `+${countryCode}` + mobileNumber,
      country: 'Pakistan',
      zip: zipcode,
      IsDeliveryAdress: deliveryAddress,
      IsBillingAdress: billingAddress,
    },
    goForUpdate,
    uuid,
    userAccessToken,
  );

  /** response of api call for add address */
  useEffect(() => {
    if (!addAddressApi.loading) {
      if (addAddressApi.response?.status === GeneralResponses.STATUS_OK.CODE) {
        onSuccessApi('add');
      }
    } else {
      console.log('error occured in add address api call');
    }
    setGoForaddaddress(false);
  }, [addAddressApi.loading]);

  /** response of api call for update address*/
  useEffect(() => {
    if (!updateApi.loading) {
      if (updateApi.response?.status === GeneralResponses.STATUS_OK.CODE) {
        onSuccessApi('update');
      }
    } else {
      console.log('error occured in update address api call');
    }
    setGoForUpdate(false);
  }, [updateApi.loading]);

  /**
   * method on success of api
   * @param {*} addAddressApi api response
   */
  const onSuccessApi = async type => {
    Toast.show(
      type === 'add' ? 'Address Added!' : 'Address Updated',
      Toast.SHORT,
    );
    navigation.goBack();
  };

  /**
   * function called onpress of Save Address
   */
  const saveAddress = async () => {
    if (addressData?.length > 2) {
      Toast.show('Only 3 Addresses can be added', Toast.SHORT);
    } else {
      addressToEdit ? setGoForUpdate(true) : setGoForaddaddress(true);
    }
  };

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
        style={[BaseStyle.container, {marginVertical: 16}]}
      >
        <View style={styles.firstNameTxtView}>
          <Text lowemphasis overline regular style={styles.firstNameT}></Text>
          <Text lowemphasis regular overline style={styles.lastNameT}></Text>
        </View>
        <View style={styles.tInputView}>
          <TextInput
            placeholder="Enter First Name"
            style={styles.firstNameT}
            value={firstName}
            onChangeText={text => {
              if (isNameValid(text) || text.length < 1) {
                setFirstName(text);
              }
            }}
            maxLength={20}
          />
          <TextInput
            placeholder="Enter Last Name"
            style={styles.lastNameT}
            value={lastName}
            onChangeText={text => {
              if (isNameValid(text) || text.length < 1) {
                setLastName(text);
              }
            }}
            maxLength={20}
          />
        </View>
        <View style={styles.mobilenumber}>
          <View
            style={[
              styles.inputContainer,
              {
                backgroundColor: isDarkMode
                  ? colors.txtInputDarkBack
                  : colors.lightGray,
              },
            ]}
          >
            <View
              style={{
                borderRightWidth: 1,
                marginRight: 3,
                borderColor: isDarkMode
                  ? colors.whiteColor
                  : colors.mediumemphasis,
              }}
            >
              <Text
                mediumemphasis
                style={[
                  styles.prefix,
                  {
                    borderColor: colors.mediumemphasis,
                    backgroundColor: isDarkMode
                      ? colors.txtInputDarkBack
                      : colors.lightGray,
                  },
                ]}
              >
                {`+${countryCode}`}
              </Text>
            </View>
            <TextInput
              style={{paddingHorizontal: 2}}
              placeholder={
                mobileNumber.length > 0 ? 'Phone Number' : '3169825658'
              }
              keyboardType="number-pad"
              maxLength={10}
              value={mobileNumber}
              onChangeText={setMobileNumber}
              isPrefix={true}
            />
          </View>
          <Text regular overline iserror>
            {mobileNumber.length > 0 &&
              !isPhoNoValid &&
              `Enter a valid Phone Number`}
          </Text>
        </View>
        <View style={styles.bottomspaces}>
          <TextInput
            placeholder="Address"
            maxLength={100}
            value={address}
            onChangeText={setAddress}
          />
        </View>
        <View style={styles.addresstwo}>
          <TextInput
            placeholder="Address Line 2"
            value={address2}
            maxLength={100}
            onChangeText={setAddress2}
          />
        </View>
        <View style={styles.bottomspaces}>
          <Text overline faint>
            {city && `City/District`}
          </Text>

          <SelectList
            setSelected={setCity}
            data={cities}
            searchPlaceholder={''}
            search={true}
            searchicon={
              <Icon
                size={17}
                color={colors.lowemphasis}
                name={Icons.SEARCH}
                type={'ant'}
              />
            }
            arrowicon={
              <Icon
                size={17}
                color={colors.lowemphasis}
                name={Icons.ANGLE_DOWN}
              />
            }
            value={city}
            boxStyles={{
              borderRadius: 0,
              backgroundColor: isDarkMode
                ? colors.txtInputDarkBack
                : colors.lightGray,
              borderRadius: 5,
              borderColor: isDarkMode
                ? colors.txtInputDarkBack
                : colors.lightGray,
            }}
            inputStyles={{
              color: city
                ? isDarkMode
                  ? colors.whiteColor
                  : colors.mediumemphasis
                : isDarkMode
                ? colors.lowemphasis
                : colors.faint,
                marginLeft:5
            }}
            placeholder={city ? city : 'City/District'}
            dropdownStyles={{
              borderRadius: 0,
              backgroundColor: isDarkMode
                ? colors.txtInputDarkBack
                : colors.lightGray,
              borderRadius: 5,
              borderColor: isDarkMode
                ? colors.txtInputDarkBack
                : colors.lightGray,
            }}
            dropdownTextStyles={{
              color: isDarkMode ? colors.whiteColor : colors.lowemphasis,
            }}
          />
        </View>
        <View style={styles.bottomspaces}>
          <TextInput
            placeholder="Zipcode"
            keyboardType="numeric"
            value={zipcode}
            onChangeText={setZipCode}
          />
        </View>

        <RadioButton
          selected={deliveryAddress}
          onPress={() => setDeliveryAddress(!deliveryAddress)}
          text={`Set as default delivery address`}
        />
        <RadioButton
          selected={billingAddress}
          onPress={() => setBillingAddress(!billingAddress)}
          text={`Set as default billing address`}
        />

        <View style={styles.lastView}>
          <Button
            disabled={
              (billingAddress == true || deliveryAddress == true) &&
              firstName.length > 0 &&
              lastName.length > 0 &&
              mobileNumber.length > 9 &&
              address.length > 0 &&
              zipcode.length > 0 &&
              city.length > 0
                ? false
                : true
            }
            onPress={saveAddress}
            text="SAVE ADDRESS"
            loading={addAddressApi.loading}
            buttonStyle={styles.createBtn}
            textStyles={{
              color: isDarkMode ? colors.blackColor : colors.whiteColor,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddAddressForm;
