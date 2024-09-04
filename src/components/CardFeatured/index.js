import React from 'react';
import {Image, View} from 'react-native';
import styles from './styles';
import Text from '../Text';
import LinearGradient from 'react-native-linear-gradient';

/**
 * card component for home featured
 * @param {*} param0  props as parameter
 * @returns React Element
 */
const CardFeatured = ({
  image,
  style,
  heading,
  paragraph,
  text3,
  paragraphTextColor,
  headingColor,
  topColor = 'rgba(255, 228, 188, 1)',
  bottomColor = 'rgba(255, 202, 202, 1)',
  type = 'dynamic',
  imageAlign,
  isDiscount,
  isNext,
}) => {
  return (
    <>
      {type === 'static' ? (
        <>
          <Image
            resizeMode={'stretch'}
            style={styles.imageStyle}
            source={{uri: image}}
          />
        </>
      ) : (
        <>
          <LinearGradient
            colors={[topColor, bottomColor]}
            style={[
              styles.card,
              style,
              {
                flexDirection: imageAlign === 'left' ? 'row-reverse' : 'row',
              },
            ]}
          >
            <View style={styles.card1}>
              <Text
                title2
                bold
                numberOfLines={2}
                textAlign={imageAlign === 'left' ? 'right' : 'left'}
                style={[styles.text1, {color: headingColor}]}
              >
                {heading}
              </Text>
              {paragraph ? (
                <Text
                  caption1
                  numberOfLines={2}
                  textAlign={imageAlign === 'left' ? 'right' : 'left'}
                  style={[styles.text2, {color: paragraphTextColor}]}
                >
                  {paragraph}
                </Text>
              ):(
                <Text>
                  
                </Text>
              )}
              {text3 && (
                <Text
                  caption1
                  textAlign={imageAlign === 'left' ? 'right' : 'left'}
                  numberOfLines={2}
                >
                  {text3}
                </Text>
              )}
              <Text
                caption1
                bold
                textAlign={imageAlign === 'left' ? 'right' : 'left'}
                style={{color: paragraphTextColor}}
              >
                {isNext ? `TAP TO VIEW` : isDiscount ? 'TAP TO APPLY' : ''}
              </Text>
            </View>
            <View style={styles.card2}>
              <Image style={styles.imageStyle2} source={{uri: image}} />
            </View>
          </LinearGradient>
        </>
      )}
    </>
  );
};

export default CardFeatured;
