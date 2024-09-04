import React from 'react';
import {Pressable} from 'react-native';
import styles from './styles';
import {Icon} from '..';

/**
 * Round Button Coponent with Image
 * @param {*} param0  props as parameter
 * @returns React Element
 */
const RoundIcon = ({
  buttonStyle,
  buttonColor = 'rgba(0, 0, 0, 0.4)',
  disabled = false,
  onPress,
  size,
  name,
  color,
  type,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.buttonBody, buttonStyle, {backgroundColor: buttonColor}]}
    >
      <Icon name={name} type={type} size={size} color={color} />
    </Pressable>
  );
};

export default RoundIcon;
