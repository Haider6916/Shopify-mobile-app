import React from 'react';
import {Image, View} from 'react-native';
import styles from './styles';
import Text from '../Text';
import LinearGradient from 'react-native-linear-gradient';

/**
 * top banner card component for subcategory screen
 * @param {*} param0  props as parameter
 * @returns React Element
 */
const SubcategoryTopBanner = ({image, style, text, gradColor1, gradColor2}) => {
  return (
    <>
      <LinearGradient
        colors={[gradColor1, gradColor2]}
        style={[styles.card, style]}
      >
        <View style={styles.card1}>
          <Text bold body1 style={styles.text1}>
            {text}
          </Text>
        </View>
        <View style={styles.card2}>
          <Image style={styles.image} source={image} />
        </View>
      </LinearGradient>
    </>
  );
};
export default SubcategoryTopBanner;
