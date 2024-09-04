import React from 'react';
import {Image, Pressable, View} from 'react-native';
import styles from './styles';
import Text from '../Text';
import {DarkBag, DarkTrash, Trash, WishlistBag} from '../../assets';
import {useTheme} from '../../config/theme';
import {useSelector} from 'react-redux';

/**
 * card component for wishlist Screen popular
 * @param {*} param0  props as parameter
 * @returns React Element
 */
const WishlistCardTrending = ({
  image,
  amount,
  detail,
  currency,
  goToDetail,
  onPress = () => {},
  removeFromWishlist,
}) => {
  const colors = useTheme();
  const isDarkMode = useSelector(state => state.user.clientDarkMode);
  return (
    <>
      <Pressable style={[styles.card]} onPress={goToDetail}>
        <View style={{ borderWidth:1,
    borderColor:colors.statusBarGray,padding:8}}>
        <Image
          style={styles.image}
          source={{
            uri: image?.src,
          }}
          resizeMode={'contain'}
        />
        </View>
        <View
          style={[
            styles.bottomCard,
            {
              backgroundColor: colors.statusBarGray,
            },
          ]}
        >
          <View style={styles.txtView}>
            <Text
              bold
              caption1
              style={{
                color: isDarkMode ? colors.mediumemphasis : colors.primaryLight,
              }}
            >
              {currency}
              <Text
                bold
                body2
                style={{
                  color: isDarkMode
                    ? colors.highemphasis
                    : colors.textPrimaryBold,
                }}
              >
                {amount}
              </Text>
            </Text>
            <Text
              medium
              overline
              numberOfLines={1}
              style={{
                color: isDarkMode ? colors.mediumemphasis : colors.primaryLight,
              }}
            >
              {detail}
            </Text>
          </View>
          <View
            style={[
              styles.favBtn,
              {
                backgroundColor: colors.headerGray,
              },
            ]}
          >
            <Pressable onPress={onPress}>
              {isDarkMode ? <DarkBag /> : <WishlistBag />}
            </Pressable>
          </View>
        </View>
        <Pressable
          onPress={removeFromWishlist}
          style={{
            height: 37,
            width: 37,
            backgroundColor: colors.statusBarGray,
            position: 'absolute',
            left: '75%',
            top: 12,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {isDarkMode ? <DarkTrash /> : <Trash height={24} width={24} />}
        </Pressable>
      </Pressable>
    </>
  );
};
export default WishlistCardTrending;
