import React from 'react';
import {Image, View} from 'react-native';
import styles from './styles';
import Text from '../Text';
import LinearGradient from 'react-native-linear-gradient';

/**
 * card component for Promocode Banner
 * @param {*} param0  props as parameter
 * @returns React Element
 */
const PromocodeBanner = ({image, style, text, grad1, grad2}) => {
  return (
    <LinearGradient colors={[grad1, grad2]} style={[styles.card, style]}>
      <View style={styles.card1}>
        <Text body1 regular style={[styles.text1]} numberOfLines={6}>
          {text}
        </Text>
      </View>
      <View style={styles.card2}>
        <Image style={styles.imageStyle} source={image} resizeMode="stretch" />
      </View>
    </LinearGradient>
  );
};

export default PromocodeBanner;
