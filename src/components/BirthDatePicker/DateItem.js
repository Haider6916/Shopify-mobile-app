import React from 'react';
import {Pressable} from 'react-native';
import {Text, Icon, Icons} from '..';
import {styles} from './styles';
import {useTheme} from '../../config/theme';
import {useSelector} from 'react-redux';

const DateItems = ({key, item, index, id, selectFunction, testID}) => {
  let colors = useTheme();
  const isDarkMode = useSelector(state => state.user.clientDarkMode);

  /**
   * method to get month name
   * @param month month
   * @returns month name according to language
   */
  return (
    <Pressable
      style={styles.dataItem}
      key={key}
      onPress={() => selectFunction(index, item)}
    >
      <Text mediumemphasis footnote>
        {item}
      </Text>
      {index === id && (
        <Icon
          name={Icons.CHECK}
          color={isDarkMode ? colors.whiteColor : colors.primaryDark}
          size={16}
        />
      )}
    </Pressable>
  );
};

export default DateItems;
