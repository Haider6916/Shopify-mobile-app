import React from 'react';
import {Image, Pressable, View} from 'react-native';
import styles from './styles';
import Text from '../Text';
import Button from '../Button';
import {useTheme} from '../../config/theme';
import {DarkTrash, Trash} from '../../assets';
import {useSelector} from 'react-redux';

/**
 * card component for bag item screen
 * @param {*} param0  props as parameter
 * @returns React Element
 */
const BagItemCard = ({
  image,
  onPressDelete,
  onPressUpdate,
  title,
  size,
  color,
  currency = 'Rs.',
  price,
  btnText,
  quantity,
  updateQuan,
  toggleFavourite,
  loading,
  goToDetail,
}) => {
  const colors = useTheme();
  const isDarkMode = useSelector(state => state.user.clientDarkMode);
  return (
    <View style={[styles.mainView, {backgroundColor: colors.statusBarGray}]}>
      <Pressable style={styles.imageView} onPress={goToDetail}>
        <Image
          style={styles.image}
          source={{
            uri: image,
          }}
          resizeMode={'contain'}
        />
      </Pressable>
      <View style={styles.txtMainView}>
        <View style={styles.txtView}>
          <View style={styles.txtSecondView}>
            <View style={{flex: 1}}>
              <Text medium caption1 highemphasis numberOfLines={1}>
                {title}
              </Text>
            </View>
            <Text
              bold
              caption1
              style={{
                color: isDarkMode ? colors.mediumemphasis : colors.lowemphasis,
              }}
            >
              {'x' + quantity}
            </Text>
          </View>
          <View style={styles.currencyPriceView}>
            <Text caption1 bold primaryLight>
              {currency}
              <Text
                body1
                haevy
                style={{
                  color: isDarkMode
                    ? colors.mediumemphasis
                    : colors.textPrimaryBold,
                }}
              >
                {price}
              </Text>
            </Text>
          </View>
          <View style={{marginTop: 5}}>
            <Text
              bold
              small
              style={{color: isDarkMode ? colors.mediumemphasis : colors.faint}}
            >{`Size: ${size}`}</Text>
            <Text
              bold
              small
              style={{color: isDarkMode ? colors.mediumemphasis : colors.faint}}
            >{`Color: ${color}`}</Text>
          </View>
        </View>
        <View style={styles.btnView}>
          <Button
            onPress={toggleFavourite}
            text={btnText}
            textStyles={[
              styles.btnTxt,
              {color: isDarkMode ? colors.blackColor : colors.mediumemphasis},
            ]}
            buttonColor={colors.statusBarGray}
            buttonStyle={[
              styles.btnStyle,
              {
                borderColor: isDarkMode
                  ? colors.whiteColor
                  : colors.bordercolor,
              },
            ]}
            loading={loading}
          />
          <Pressable
            onPress={onPressDelete}
            style={[styles.editBtn, {backgroundColor: colors.headerGray}]}
          >
            {isDarkMode ? <DarkTrash /> : <Trash />}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default BagItemCard;
