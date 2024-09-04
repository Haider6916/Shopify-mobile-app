import {View} from 'react-native';
import React from 'react';
import Text from '../Text';
import styles from './styles';

const ItemPayment = ({key, name, value, isBold = false}) => {
  return (
    <View key={key} style={styles.subTotalView}>
      {isBold ? (
        <>
          <Text heavy body2 highemphasis>
            {name}
          </Text>
          <Text heavy body1 highemphasis>
            {value}
          </Text>
        </>
      ) : (
        <>
          <Text highemphasis body2 medium>
            {name}
          </Text>
          <Text highemphasis body1 medium>
            {value}
          </Text>
        </>
      )}
    </View>
  );
};

export default ItemPayment;
