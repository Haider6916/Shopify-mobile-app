import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import Text from '../Text';

/**
 * card component for Product Details
 * @param {*} param0  props as parameter
 * @returns React Element
 */
const ProductDetails = ({color, style, PatternType, Type, SleeveLength}) => {
  return (
    <View>
      <View style={styles.headingView}>
        <Text title3 bold blackcolor>{`Product Details`}</Text>
      </View>
      <View style={styles.firstView}>
        <View style={styles.colorTxtView}>
          <Text body2 regular mediumemphasis>
            {`Color`}
          </Text>
        </View>
        <View style={styles.colorView}>
          <Text body2 regular mediumemphasis>
            {color}
          </Text>
        </View>
      </View>
      <View style={styles.secondView}>
        <View style={styles.styleTxtView}>
          <Text body2 regular mediumemphasis>
            {`Style`}
          </Text>
        </View>
        <View style={styles.styleView}>
          <Text body2 regular mediumemphasis>
            {style}
          </Text>
        </View>
      </View>
      <View style={styles.thirdView}>
        <View style={styles.patternTxtView}>
          <Text body2 regular mediumemphasis>
            {`Pattern Type`}
          </Text>
        </View>
        <View style={styles.patternView}>
          <Text body2 regular mediumemphasis>
            {PatternType}
          </Text>
        </View>
      </View>
      <View style={styles.fourthView}>
        <View style={styles.typeTxtView}>
          <Text body2 regular mediumemphasis>
            {`Type`}
          </Text>
        </View>
        <View style={styles.typeView}>
          <Text body2 regular mediumemphasis>
            {Type}
          </Text>
        </View>
      </View>
      <View style={styles.fifthView}>
        <View style={styles.sleeveLengthTxtView}>
          <Text body2 regular mediumemphasis>
            {`Sleeve Length`}
          </Text>
        </View>
        <View style={styles.sleeveTxtView}>
          <Text body2 regular mediumemphasis>
            {SleeveLength}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProductDetails;
