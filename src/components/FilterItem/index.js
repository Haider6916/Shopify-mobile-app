import React from 'react';
import {Pressable} from 'react-native';
import styles from './styles';
import Text from '../Text';
import {useTheme} from '../../config/theme';
import {useSelector} from 'react-redux';

/**
 * filter component under search bar
 * @param {*} param0  props as parameter
 * @returns React Element
 */
const FilterItem = ({text, isSelected, setSelected}) => {
  const colors = useTheme();
  const isDarkMode = useSelector(state => state.user.clientDarkMode);

  return (
    <Pressable
      onPress={() => setSelected(text)}
      style={[
        styles.card,
        {
          borderColor: isDarkMode ? colors.whiteColor : colors.headerGray,
          backgroundColor: isSelected
            ? isDarkMode
              ? colors.whiteColor
              : colors.primaryLight
            : isDarkMode
            ? colors.backgroundColor
            : colors.lightGray,
        },
      ]}
    >
      <Text
        caption1
        heavy
        style={{
          color: isSelected
            ? isDarkMode
              ? colors.blackColor
              : colors.whiteColor
            : isDarkMode
            ? colors.whiteColor
            : colors.lowemphasis,
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default FilterItem;
