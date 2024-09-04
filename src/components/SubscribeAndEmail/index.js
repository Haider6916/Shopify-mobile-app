import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import Text from '../Text';

/**
 * subcribe via email component
 * @param {*} param0  props as parameter
 * @returns React Element
 */
const SubscribeAndEmail = ({text1, text2}) => {
  return (
    <View style={styles.subscribeView}>
      <View style={styles.text1}>
        <Text title3 bold highemphasis textAlign={'center'}>
          {text1}
        </Text>
      </View>

      <View style={styles.subscribeInput}>
        <Text
          body2
          regular
          lowemphasis
          textAlign={'center'}
          style={styles.text2}
        >
          {text2}
        </Text>
      </View>
    </View>
  );
};
export default SubscribeAndEmail;
