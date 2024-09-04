import React from 'react';
import {Image, Pressable, View} from 'react-native';
import styles from './styles';
import Text from '../Text';
import {Icon, Icons} from '..';
import {useTheme} from '../../config/theme';
import {useSelector} from 'react-redux';

/**
 * card component for home popular
 * @param {*} param0  props as parameter
 * @returns React Element
 */
const CardTrending = ({
  image = null,
  amount,
  detail,
  disable,
  currency,
  isFavourite = false,
  toggleFavourite,
  onPress,
  mainstyle,
}) => {
  const colors = useTheme();

  const isDarkMode = useSelector(state => state.user.clientDarkMode);

  return (
    <>
      <Pressable
        disabled={disable}
        onPress={onPress}
        style={[styles.card, mainstyle]}
      >
        <View style={{borderWidth:1,borderRadius:4, padding:8, borderColor:colors.statusBarGray}}>
        {image ? (
          <>
            <Image
              resizeMode={'contain'}
              style={styles.image}
              source={{
                uri: image.src,
              }}
            />
          </>
        ) : (
          <>
            <Image style={styles.image} />
          </>
        )}
        </View>
        <View style={styles.bottomCard}>
          <View style={{flex: 1}}>
            <Text
              bold
              body2
              style={{
                color: isDarkMode ? colors.highemphasis : colors.primaryLight,
              }}
            >
              {currency + '.'}
              <Text
                bold
                title3
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
              body2
              style={{
                flex: 1,
                color: isDarkMode
                  ? colors.highemphasis
                  : colors.textPrimaryBold,
              }}
              numberOfLines={1}
            >
              {detail}
            </Text>
          </View>
          <Pressable
            disabled={disable}
            onPress={toggleFavourite}
            style={[styles.favBtn, {backgroundColor: colors.statusBarGray}]}
          >
            <Icon
              name={isFavourite ? Icons.HEART_FILL : Icons.HEART_EMPTY}
              size={18}
              color={
                isFavourite
                  ? isDarkMode
                    ? colors.whiteColor
                    : colors.mediumemphasis
                  : isDarkMode
                  ? colors.whiteColor
                  : colors.lowemphasis
              }
              type={'ant'}
            />
          </Pressable>
        </View>
      </Pressable>
    </>
  );
};

export default CardTrending;
