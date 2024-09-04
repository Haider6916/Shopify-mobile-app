import React from 'react';
import {FilledBag} from '../../assets';
import {useTheme} from '../../config/theme';
import styles from './styles';
import {Text} from '..';
import Draggable from 'react-native-draggable';
import {Dimensions, View} from 'react-native';

const {width, height} = Dimensions.get('screen');

/**
 * button component custom
 * @param {*} param0  props as parameter
 * @returns React Element
 */
const Button = ({
  onLongPress,
  count = 0,
  onRelease,
  onShortPressRelease,
  bottom = 210,
}) => {
  const colors = useTheme();

  return (
    <Draggable
      x={width - 70}
      y={height - bottom}
      minX={5}
      minY={20}
      maxX={width - 5}
      maxY={height - bottom}
      isCircle={true}
      renderColor={colors.primaryDark}
      renderSize={63}
      onLongPress={onLongPress}
      onRelease={onRelease}
      onShortPressRelease={onShortPressRelease}
      children={
        <View style={styles.childrenViewStyle}>
          <FilledBag height={35} width={35} />
          <Text heavy body2 primaryDark style={styles.text}>
            {count}
          </Text>
        </View>
      }
    />
  );
};

export default Button;
