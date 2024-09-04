import React from 'react';
import {Pressable, View, ActivityIndicator} from 'react-native';
import styles from './styles';
import Text from '../Text';
import {useSelector} from 'react-redux';
import {useTheme} from '../../config/theme';

/**
 * button component custom
 * @param {*} param0  props as parameter
 * @returns React Element
 */
const Button = ({
  buttonStyle,
  textStyles,
  text = 'LOG IN',
  buttonColor = '#4f4f4f',
  disabled = false,
  onPress,
  iconLeft,
  iconRight,
  loading,
}) => {
  const colors = useTheme();
  const isDarkMode = useSelector(state => state.user.clientDarkMode);
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading ? true : false}
      style={[
        styles.buttonBody,
        buttonStyle,
        {
          backgroundColor: isDarkMode ? colors.whiteColor : buttonColor,
          opacity: disabled ? 0.5 : 1,
        },
      ]}
    >
      {loading ? (
        <>
          <ActivityIndicator
            size="large"
            color={isDarkMode ? colors.btnTxt : '#fff'}
          />
        </>
      ) : (
        <>
          <View style={styles.leftIconView}>{iconLeft && iconLeft}</View>
          <Text
            whiteColor
            title4
            bold
            textAlign={'center'}
            style={[textStyles]}
          >
            {text}
          </Text>
          <View style={styles.rightIconView}>{iconRight && iconRight}</View>
        </>
      )}
    </Pressable>
  );
};

export default Button;
