import React from 'react';
import {Image, View} from 'react-native';
import styles from './styles';
import Text from '../Text';
import LinearGradient from 'react-native-linear-gradient';

/**
 * card component for category screen
 * @param {*} param0  props as parameter
 * @returns React Element
 */
const CardCategory = ({image, style, text, gradColor1, gradColor2}) => {
  return (
    <>
      <LinearGradient
        colors={[gradColor1, gradColor2]}
        style={[styles.card, style]}
      >
        <View style={styles.card1}>
          <Text bold body2 style={styles.text1} numberOfLines={2}>
            {text}
          </Text>
        </View>
        <View>
          {image && (
            <View style={{}}>
              <Image
                style={styles.imageStyle}
                resizeMode={'stretch'}
                source={{
                  uri: image?.src,
                }}
              />
            </View>
          )}
        </View>
      </LinearGradient>
    </>
  );
};

export default CardCategory;
