/**
 * modal component to update address
 * @param param0 props accepted by this component
 * @returns React Component
 */
import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import {styles} from './styles';
import {TextInput, Text, Button, RadioButton} from '..';
import {useTheme} from '../../config/theme';
import {useSelector} from 'react-redux';
import {API} from '../../services';
import {GeneralResponses} from '../../services/responses';
import {cities} from '../../data/cities';
import useMobileNumberValidation from '../../hooks/useMobileNumberValidation';
import {isNameValid} from '../../utils/stringOperations';
import {useFetchPut} from '../../services';
import Toast from 'react-native-simple-toast';
import {SelectList} from 'react-native-dropdown-select-list';

const UpdateAddressModal = props => {
  const {
    visible,
    onSwipeComplete,
    swipeDown = true,
    onBackdropPress = false,
    addressToEdit,
    onUpdateComplete,
  } = props;
  const colors = useTheme();

  const userAccessToken = useSelector(state => state.user.userAccessToken);
  const uuid = useSelector(state => state.user.uuid);

  const [firstName, setFirstName] = useState(addressToEdit?.firstName);
  const [lastName, setLastName] = useState(addressToEdit?.lastName);
  const [mobileNumber, setMobileNumber] = useState(
    addressToEdit?.phone ? addressToEdit.phone.substring(3) : '',
  );
  const [address, setAddress] = useState(addressToEdit?.address1);
  const [address2, setAddress2] = useState(addressToEdit?.address2);
  const [zipcode, setZipCode] = useState(addressToEdit?.zip);
  const [city, setCity] = useState(addressToEdit?.city);
  const [countryCode] = useState('92');
  const isPhoNoValid = useMobileNumberValidation(mobileNumber);
  const [deliveryAddress, setDeliveryAddress] = useState(
    addressToEdit?.IsDeliveryAdress,
  );
  const [billingAddress, setBillingAddress] = useState(
    addressToEdit?.IsBillingAdress,
  );
  const [goForUpdate, setGoForUpdate] = useState(false);

  /** api call for update */
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

  /** response of api call for update */
  useEffect(() => {
    if (!updateApi.loading) {
      if (updateApi.response?.status === GeneralResponses.STATUS_OK.CODE) {
        // setIsError(false);
        onSuccessApi(updateApi?.response);
      }
    } else {
      console.log('error occured in update api call');
    }
    setGoForUpdate(false);
  }, [updateApi.loading]);

  /**
   * method on success of api
   * @param {*} addAddressApi api response
   */
  const onSuccessApi = addAddressApi => {
    Toast.show('Address Updated', Toast.SHORT);
    onUpdateComplete();
  };

  /**
   * Method Called onpress of Save Address
   */
  const saveAddress = async () => {
    setGoForUpdate(true);
  };

  /** line component  */
  const Line = () => {
    return (
      <View
        style={{
          height: 5,
          backgroundColor: colors.faint,
          width: 120,
          alignSelf: 'center',
          borderRadius: 10,
          marginTop: 10,
        }}
      />
    );
  };

  return (
    <Modal
      isVisible={visible}
      {...(swipeDown ? {swipeDirection: 'down'} : {})}
      style={styles.bottomModal}
      backdropOpacity={0.5}
      onBackdropPress={() => {
        onBackdropPress && onSwipeComplete();
      }}
      onSwipeComplete={() => onSwipeComplete()}
    >
      <SafeAreaView
        style={[styles.boxContainer, {backgroundColor: colors.backgroundColor}]}
      >
        {swipeDown === true && <Line />}
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={[{paddingHorizontal: 16, marginVertical: 16}]}
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
                {backgroundColor: colors.lightGray},
              ]}
            >
              <View style={{borderRightWidth: 1, marginRight: 3}}>
                <Text
                  mediumemphasis
                  style={[styles.prefix, {borderColor: colors.mediumemphasis}]}
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
              // arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
              // searchicon={<FontAwesome name="search" size={12} color={'black'} />}
              search={true}
              value={city}
              boxStyles={{
                borderRadius: 0,
                backgroundColor: colors.lightGray,
                borderRadius: 5,
                borderColor: colors.lightGray,
              }}
              inputStyles={{color: city ? colors.mediumemphasis : colors.faint}}
              placeholder={city ? city : 'City/District'}
              dropdownStyles={{
                borderRadius: 0,
                backgroundColor: colors.lightGray,
                borderRadius: 5,
                borderColor: colors.lightGray,
              }}
              dropdownTextStyles={{color: colors.lowemphasis}}
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
                billingAddress == true ||
                (deliveryAddress == true &&
                  firstName.length > 0 &&
                  lastName.length > 0 &&
                  mobileNumber.length > 9 &&
                  address.length > 0 &&
                  zipcode.length > 0)
                  ? false
                  : true
              }
              onPress={saveAddress}
              text="SAVE ADDRESS"
              loading={updateApi.loading}
              buttonStyle={styles.createBtn}
              textStyles={styles.createBtnTxt}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};
export default UpdateAddressModal;
