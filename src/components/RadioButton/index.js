import React from 'react';
import {Pressable, View} from 'react-native';
import styles from './styles';
import {Icons, Icon, Text} from '..';
import {useTheme} from '../../config/theme';
import {useSelector} from 'react-redux';

/**
 * Round Button Component
 * @param {*} param0  props as parameter
 * @returns React Element
 */
const RadioButton = ({selected, onPress, text}) => {
  const colors = useTheme();
  const isDarkMode = useSelector(state => state.user.clientDarkMode);

  return (
    <View style={styles.deliveryAddTxt}>
      <Pressable
        onPress={onPress}
        style={[
          styles.buttonBody,
          {backgroundColor: selected ? 'green' : colors.faint},
        ]}
      >
        <Icon
          name={Icons.CHECKANT}
          type={'Ant'}
          size={18}
          color={colors.whiteColor}
        />
      </Pressable>
      <View style={styles.txt}>
        <Text
          body2
          regular
          style={{color: isDarkMode ? colors.mediumemphasis : colors.faint}}
        >
          {text}
        </Text>
      </View>
    </View>
  );
};

export default RadioButton;
