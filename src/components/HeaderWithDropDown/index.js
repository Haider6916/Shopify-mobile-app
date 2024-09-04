import React from 'react';
import {Pressable, View} from 'react-native';
import styles from './styles';
import Text from '../Text';
import {Icon, Icons} from '..';
import {useTheme} from '../../config/theme';

/**
 * header component with dropdown
 * @param {*} param0  props as parameter
 * @returns React Element
 */
const HeaderWithDropDown = ({text1, text2, onPressBack, onPressRight}) => {
  const color = useTheme();

  return (
    <View style={[styles.headerMain, {backgroundColor: color.lightGray}]}>
      <View style={styles.headerView1}>
        <Pressable onPress={onPressBack}>
          <Icon
            color={color.highemphasis}
            size={18}
            name={Icons.ARROW_LEFT}
            type={'ant'}
          />
        </Pressable>
        <Text
          semibold
          body2
          highemphasis
          numberOfLines={1}
          style={styles.view1Text}
        >
          {text1}
        </Text>
      </View>
      <View style={styles.headerView3}>
        <Pressable onPress={onPressRight}>
          <Text semibold body2 numberOfLines={1} highemphasis>
            {text2}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HeaderWithDropDown;
