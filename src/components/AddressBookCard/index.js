import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import Text from '../Text';
import {useTheme} from '../../config/theme';
import {DarkTrash, Edit, Trash} from '../../assets';
import Button from '../Button';
import {Icon, Icons} from '..';
import {useSelector} from 'react-redux';

/**
 * card component for Address Book Page
 * @param {*} param0  props as parameter
 * @returns React Element
 */
const AddressBookCard = ({
  key,
  IsDeliveryAdress,
  IsBillingAdress,
  text,
  phnNo,
  add1,
  add2,
  city,
  postal,
  isButton,
  onPressDelete,
  onPressUpdate,
  item,
  selectedAddress,
  setSelectedAddress,
  from = 'address',
}) => {
  const colors = useTheme();

  const isDarkMode = useSelector(state => state.user.clientDarkMode);

  const getHeader = (delivery, billing) => {
    if (delivery && billing) {
      return 'DELIVER & BILL TO';
    } else if (delivery) {
      return 'DELIVER TO';
    } else if (billing) {
      return 'BILL TO';
    } else {
      return '';
    }
  };
  return (
    <View
      key={key}
      style={[styles.mainView, {backgroundColor: colors.statusBarGray}]}
    >
      <View style={styles.innerView}>
        <View style={styles.nameTxtView}>
          <Text
            small
            regular
            style={[
              styles.headingStyle,
              {color: isDarkMode ? colors.whiteColor : colors.highemphasis},
            ]}
          >
            {getHeader(IsDeliveryAdress, IsBillingAdress)}
          </Text>
          <Text
            numberOfLines={1}
            bold
            body1
            style={{
              color: isDarkMode ? colors.whiteColor : colors.highemphasis,
            }}
          >
            {text}
          </Text>
        </View>
        {isButton === false ? (
          <View style={styles.svgMainView}>
            <Pressable
              onPress={onPressUpdate}
              style={[styles.editSvgView, {backgroundColor: colors.headerGray}]}
            >
              {isDarkMode ? (
                <Icon
                  name={Icons.EDIT}
                  type={'ant'}
                  color={colors.highemphasis}
                  size={16}
                />
              ) : (
                <Edit />
              )}
            </Pressable>
            {from === 'address' ? (
              <Pressable
                style={[
                  styles.trashSvgView,
                  {backgroundColor: colors.headerGray},
                ]}
                onPress={onPressDelete}
              >
                {isDarkMode ? <DarkTrash /> : <Trash />}
              </Pressable>
            ) : (
              <Pressable
                onPress={() =>
                  setSelectedAddress(
                    selectedAddress !== item._id ? item._id : '',
                  )
                }
              >
                {selectedAddress !== item._id ? (
                  <View
                    style={[
                      styles.buttonBody,
                      {backgroundColor: colors.headerGray},
                    ]}
                  >
                    <Icon
                      name={Icons.CHECKANT}
                      type={'Ant'}
                      size={24}
                      color={colors.whiteColor}
                    />
                  </View>
                ) : (
                  <View style={[styles.buttonBody, {backgroundColor: 'green'}]}>
                    <Icon
                      name={Icons.CHECKANT}
                      type={'Ant'}
                      size={24}
                      color={colors.whiteColor}
                    />
                  </View>
                )}
              </Pressable>
            )}
          </View>
        ) : (
          <Button
            buttonStyle={[styles.btnStyle, {borderColor: colors.faint}]}
            buttonColor={colors.statusBarGray}
            textStyles={[styles.btnTxt, {color: colors.blackColor}]}
            text="CHANGE"
          />
        )}
      </View>
      <View>
        <Text
          regular
          caption1
          primaryDark
          style={[
            styles.txtStyle,
            {color: isDarkMode ? colors.mediumemphasis : colors.lowemphasis},
          ]}
        >
          {phnNo}
        </Text>
        <Text
          regular
          caption1
          primaryDark
          lowemphasis
          style={[
            styles.txtStyle,
            {color: isDarkMode ? colors.mediumemphasis : colors.lowemphasis},
          ]}
        >
          {add1}
        </Text>
        <Text
          regular
          caption1
          primaryDark
          lowemphasis
          style={[
            styles.txtStyle,
            {color: isDarkMode ? colors.mediumemphasis : colors.lowemphasis},
          ]}
        >
          {add2}
        </Text>
        <Text
          regular
          caption1
          primaryDark
          lowemphasis
          style={[
            styles.txtStyle,
            {color: isDarkMode ? colors.mediumemphasis : colors.lowemphasis},
          ]}
        >
          {city}
        </Text>
        <Text
          regular
          caption1
          primaryDark
          lowemphasis
          style={[
            styles.txtStyle,
            {color: isDarkMode ? colors.mediumemphasis : colors.lowemphasis},
          ]}
        >
          {postal}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  firstView: {
    marginBottom: 15,
    marginTop: 15,
  },
  mainView: {
    height: 183,
    borderRadius: 5,
    paddingHorizontal: 18,
    marginBottom: 16,
  },
  innerView: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 8,
  },
  nameTxtView: {
    flex: 1,
  },
  headingStyle: {
    letterSpacing: 2,
  },
  svgMainView: {
    flexDirection: 'row',
  },
  editSvgView: {
    borderRadius: 22,
    height: 37,
    width: 37,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trashSvgView: {
    borderRadius: 22,
    height: 37,
    width: 37,
    marginLeft: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtStyle: {
    marginBottom: 3,
  },
  buttonBody: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 9,
    width: 36,
    height: 36,
    borderRadius: 24,
  },
  btnTxt: {
    fontSize: 12,
    fontWeight: '700',
  },
  btnStyle: {
    borderWidth: 2,
    borderRadius: 5,
    height: 30,
    width: 109,
  },
});

export default AddressBookCard;
