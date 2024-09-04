import React from 'react';
import {View, Pressable} from 'react-native';
import styles from './styles';
import Text from '../Text';
import {Icon, Icons} from '..';
import {useTheme} from '../../config/theme';
import {useSelector} from 'react-redux';

/**
 * card component for Product Size & Price
 * @param {*} param0  props as parameter
 * @returns React Element
 */
const ProductSizePrice = ({
  toggleFavourite = () => {},
  isFavourite = false,
  Description = '',
  currency = 'Rs.',
  Price = '',
  discount = '',
  inventoryQuantity,
  error,
  errMsg,
}) => {
  const color = useTheme();
  const isDarkMode = useSelector(state => state.user.clientDarkMode);
  return (
    <View>
      <View style={styles.firstView}>
        <View style={styles.main}>
          <View style={styles.productDesView}>
            <Text
              regular
              title3
              numberOfLines={1}
              style={{
                color: isDarkMode ? color.whiteColor : color.mediumemphasis,
              }}
            >
              {Description}
            </Text>
          </View>
          <View style={styles.priceView}>
            <Text
              body1
              bold
              style={{
                color: isDarkMode ? color.whiteColor : color.faint,
              }}
            >
              {currency + '.'}
              <Text
                title2
                heavy
                style={{
                  color: isDarkMode ? color.whiteColor : color.lowemphasis,
                }}
              >
                {Price}
              </Text>
            </Text>
            <View style={styles.discountView}>
              <Text
                bold
                body2
                style={[
                  styles.discountTxt,
                  {color: isDarkMode ? color.whiteColor : color.faint},
                ]}
              >
                {discount}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.heartIconView}>
          <Pressable
            onPress={toggleFavourite}
            style={[styles.heartIcon, {backgroundColor: color.statusBarGray}]}
          >
            <Icon
              name={isFavourite ? Icons.HEART_FILL : Icons.HEART_EMPTY}
              size={22}
              color={
                isFavourite
                  ? isDarkMode
                    ? color.whiteColor
                    : color.mediumemphasis
                  : isDarkMode
                  ? color.whiteColor
                  : color.primaryLight
              }
              type={'ant'}
            />
          </Pressable>
        </View>
      </View>
      {!error ? (
        <Text lowemphasis>
          {inventoryQuantity < 10
            ? `${inventoryQuantity} items remaining in stock`
            : 'In Stock'}
        </Text>
      ) : (
        <Text lowemphasis iserror>
          {errMsg}
        </Text>
      )}
    </View>
  );
};

export default ProductSizePrice;
