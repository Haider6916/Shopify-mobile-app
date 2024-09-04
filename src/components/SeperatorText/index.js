import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import Text from '../Text';
import {useTheme} from '../../config/theme';

/**
 * seperator component with text
 * @param {*} param0  props as parameter
 * @returns React Element
 */
const SeperatorText = ({color, text}) => {
  const colors = useTheme();
  return (
    <>
      <View style={styles.main}>
        <View
          style={[
            styles.line,
            {
              backgroundColor: colors.backgroundColor,
              borderColor: color,
            },
          ]}
        />
        <Text overline bold style={[styles.text, {color: color}]}>
          {text}
        </Text>
        <View
          style={[
            styles.line,
            {backgroundColor: colors.backgroundColor, borderColor: color},
          ]}
        />
      </View>
    </>
  );
};

export default SeperatorText;
