import React, {useEffect, useState} from 'react';
import {View, Pressable, Animated, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BaseStyle} from '../../../config/styles';
import {
  Button,
  TextInput,
  Text,
  ConfirmationModal,
  Icon,
  Icons,
  BirthDatePicker,
  Payment,
} from '../../../components';
import styles from './styles';
import {useTheme} from '../../../config/theme';
import useEmailValidation from '../../../hooks/useEmailValidation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {API, useFetchPut} from '../../../services';
import {GeneralResponses} from '../../../services/responses';
import {AUTH} from '../../../navigation/ROUTES';
import {getMonthName} from '../../../utils/stringOperations';

const MyDetails = ({navigation}) => {
  const colors = useTheme();

  const uuid = useSelector(state => state.user.uuid);
  const isDarkMode = useSelector(state => state.user.clientDarkMode);

  const [userId, setUserId] = useState();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [goForUpdate, setGoForUpdate] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [countryCode, setCountryCode] = useState('92');
  /** animation functions and methods */
  const [SlideInLeft] = useState(new Animated.Value(0));
  /** datestate will 1 2 3 month day and year respectively */
  const [dateState, setDateState] = useState(1);
  const [dob, setDob] = useState({
    dayIndex: 0,
    day: '',
    monthIndex: 0,
    month: '',
    yearIndex: 0,
    year: '',
  });

  const isEmailValid = useEmailValidation(email);

  /** api call for update */
  const updateApi = useFetchPut(
    API.UPDATE_PROFILE,
    {
      _id: userId,
      UserName: firstName + lastName,
      firstName: firstName,
      lastName: lastName,
      ContactNumber: `+${countryCode}` + mobileNumber,
      DateOfBirth: `${dob.year}-${dob.month}-${dob.day}`,
    },
    goForUpdate,
    uuid,
  );

  /** response of api call for update */
  useEffect(() => {
    if (!updateApi.loading) {
      if (updateApi.response?.status === GeneralResponses.STATUS_OK.CODE) {
        setIsError(false);
        onSuccessApi(updateApi?.response);
      }
    } else {
      console.log('error occured in uodate api call');
    }
    setGoForUpdate(false);
  }, [updateApi.loading]);

  /** function called on success of api */
  const onSuccessApi = async response => {
    const temp = {
      _id: response?.data?.data?._id,
      email: response?.data?.data?.email,
      UserName: response?.data?.data?.UserName,
      firstName: response?.data?.data?.firstName,
      lastName: response?.data?.data?.lastName,
      ContactNumber: response?.data?.data?.ContactNumber,
      DateOfBirth: response?.data?.data?.DateOfBirth,
    };
    try {
      const jsonValue = JSON.stringify(temp);
      await AsyncStorage.removeItem('@userData');
      await AsyncStorage.setItem('@userData', jsonValue).then(() => {
        setUpdateModal(false);
        navigation.replace(AUTH.MYHUB_LOGEDIN);
      });
    } catch (e) {
      // saving error
    }
  };

  /**
   * useEffect to get user Data
   */
  useEffect(() => {
    const getUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@userData');
        if (jsonValue != null) {
          const data = JSON.parse(jsonValue);
          setUserId(data._id && data._id);
          setFirstName(data.firstName && data.firstName);
          setLastName(data.lastName && data.lastName);
          setEmail(data.email && data.email);
          setMobileNumber(
            data.ContactNumber && data.ContactNumber.substring(3),
          );
          const doob = data.DateOfBirth && data.DateOfBirth;
          const date = doob.split('T')[0];
          const splited = date.split('-');
          const year = splited[0];
          const month = splited[1];
          const day = splited[2];

          setDob({
            month: getMonthName(month),
            monthIndex: month - 1,
            day: day,
            dayIndex: day - 1,
            year: year,
            yearIndex: year - 1,
          });
        }
      } catch (e) {
        console.log('No Data Available', e);
        // error reading value
      }
    };
    getUserData();
  }, [navigation]);

  /**
   * function to update data
   */
  const updateDetails = () => {
    setGoForUpdate(true);
  };

  /**
   * function to set date state
   * @param index index will 1 2 3 month day and year respectively
   */
  const selectDOB = index => {
    setDateState(index);
    _start();
  };

  /**
   * function to start date picker animation
   * @returns start animation
   */
  const _start = () => {
    setIsOpen(true);
    return Animated.parallel([
      Animated.timing(SlideInLeft, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  /**
   * function to stop animation
   * @returns stop animation
   */
  const _stop = () => {
    setIsOpen(false);
    return Animated.parallel([
      Animated.timing(SlideInLeft, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  /**
   * function called on change password press
   */
  const ChangePassword = () => {
    navigation.navigate(AUTH.CHANGE_PASSWORD);
  };

  return (
    <>
      <ConfirmationModal
        visible={updateModal}
        title={`Are you sure to update details?`}
        primaryText={`Cancel`}
        secondaryText={`Update`}
        primaryAction={() => setUpdateModal(false)}
        secondaryAction={() => updateDetails()}
      />

      <SafeAreaView
        style={[
          BaseStyle.safeAreaView,
          {backgroundColor: colors.backgroundColor},
        ]}
      >
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            marginTop: 18,
            paddingHorizontal: 16,
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text
              body2
              regular
              style={{color: isDarkMode ? colors.mediumemphasis : colors.faint}}
            >{`Review & modify personal details`}</Text>
            <View style={styles.tInputView}>
              <TextInput
                placeholder="First Name"
                style={styles.firstNameT}
                value={firstName}
                onChangeText={setFirstName}
                maxLength={20}
              />
              <TextInput
                placeholder="Last Name"
                style={styles.lastNameT}
                value={lastName}
                onChangeText={setLastName}
                maxLength={20}
              />
            </View>

            <View style={styles.tInput}>
              <TextInput
                editable={false}
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
                maxLength={50}
                autoCapitalize={'none'}
                keyboardType={'email-address'}
              />
              <Text regular overline iserror>
                {email.length > 0 && !isEmailValid && `Enter a valid email`}
              </Text>
            </View>
          
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
              <View style={{borderRightWidth: 1, marginRight: 3}}>
                <Text
                  mediumemphasis
                  style={[styles.prefix, {borderColor: colors.mediumemphasis}]}
                >
                  {`+${countryCode}`}
                </Text>
              </View>
              <TextInput
                style={{paddingHorizontal: 2,width:150}}
                placeholder={
                  mobileNumber.length > 0 ? 'Phone Number' : '3169825658'
                }
                keyboardType="number-pad"
                maxLength={11}
                value={mobileNumber}
                onChangeText={setMobileNumber}
                isPrefix={true}
              />
            </View>
            <Text regular overline iserror>
              {isError && message}
            </Text>
            <View style={styles.birthDateextra}>
              <Text regular faint overline>{`Birth Date`}</Text>
              <View style={[styles.birthDateContainer]}>
                <Pressable
                  testID={'_selectMonth'}
                  style={[
                    styles.birthDateItem,
                    {
                      backgroundColor: isDarkMode
                        ? colors.txtInputDarkBack
                        : colors.lightGray,
                    },
                  ]}
                  onPress={() => selectDOB(1)}
                >
                  <Text
                    style={{
                      color: dob.month ? colors.mediumemphasis : colors.faint,
                    }}
                  >
                    {dob.month ? dob.month : `Month`}
                  </Text>
                  <Icon
                    type={'AntDesign'}
                    name={Icons.SELECT_DOWN}
                    color={dob.month ? colors.mediumemphasis : colors.faint}
                    size={15}
                  />
                </Pressable>
                <Pressable
                  testID={'_selectDate'}
                  style={[
                    styles.birthDateItem,
                    {
                      backgroundColor: isDarkMode
                        ? colors.txtInputDarkBack
                        : colors.lightGray,
                    },
                  ]}
                  onPress={() => selectDOB(2)}
                >
                  <Text
                    style={{
                      color: dob.day ? colors.mediumemphasis : colors.faint,
                    }}
                  >
                    {dob.day ? dob.day : `Day`}
                  </Text>
                  <Icon
                    type={'AntDesign'}
                    name={Icons.SELECT_DOWN}
                    color={dob.day ? colors.mediumemphasis : colors.faint}
                    size={15}
                  />
                </Pressable>
                <Pressable
                  testID={'_selectYear'}
                  style={[
                    styles.birthDateItem,
                    {
                      backgroundColor: isDarkMode
                        ? colors.txtInputDarkBack
                        : colors.lightGray,
                    },
                  ]}
                  onPress={() => selectDOB(3)}
                >
                  <Text
                    style={{
                      color: dob.year ? colors.mediumemphasis : colors.faint,
                    }}
                  >
                    {dob.year ? dob.year : `Year`}
                  </Text>
                  <Icon
                    type={'AntDesign'}
                    name={Icons.SELECT_DOWN}
                    color={dob.year ? colors.mediumemphasis : colors.faint}
                    size={15}
                  />
                </Pressable>
              </View>
            </View>
            <BirthDatePicker
              SlideInLeft={SlideInLeft}
              _start={_start}
              _stop={_stop}
              setDob={setDob}
              dob={dob}
              dateState={dateState}
              setDateState={setDateState}
            />
            {!isOpen && (
              <Pressable style={{width: '35%'}} onPress={ChangePassword}>
                <Text
                  body2
                  heavy
                  style={{
                    color: isDarkMode
                      ? colors.mediumemphasis
                      : colors.lowemphasis,
                  }}
                >
                  {`Change Password`}
                </Text>
              </Pressable>
            )}
          </View>
          
          <View style={styles.lastView}>
            <Button
              disabled={
                firstName.length > 0 &&
                lastName.length > 0 &&
                email.length > 0 &&
                isEmailValid &&
                mobileNumber.length > 7 &&
                !isOpen
                  ? false
                  : true
              }
              onPress={() => setUpdateModal(true)}
              text={'UPDATE DETAILS'}
              buttonStyle={styles.createBtn}
              textStyles={[
                styles.createBtnTxt,
                {color: isDarkMode ? colors.blackColor : colors.whiteColor},
              ]}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
export default MyDetails;
