import React from 'react';
import {Image, Pressable, View} from 'react-native';
import styles from './styles';
import Text from '../Text';
import {useTheme} from '../../config/theme';
import {useSelector} from 'react-redux';

/**
 * card component for Subcategory screen
 * @param {*} param0  props as parameter
 * @returns React Element
 */
const SubCategoryCard = ({
  color = '#EDEDED',
  viewColor = '#FFADAD',
  text = 'View All',
  image,
  imageDark,
  imageStyle = {},
  imageViewStyle = {},
  navigateTo,
}) => {
  const colors = useTheme();
  const isDarkMode = useSelector(state => state.user.clientDarkMode);
  return (
    <Pressable
      onPress={navigateTo}
      style={[styles.mainView, {backgroundColor: color}]}
    >
      <View
        style={[
          styles.secondView,
          imageViewStyle,
          {backgroundColor: viewColor},
        ]}
      >
        {isDarkMode && text !== 'Log out' ? (
          imageDark
        ) : (
          <Image style={[imageStyle]} source={image} />
        )}
      </View>
      <View style={styles.txtView}>
        <Text
          body1
          semibold
          style={{
            color:
              text === 'Log out'
                ? '#B20000DE'
                : isDarkMode
                ? colors.whiteColor
                : colors.mediumemphasis,
          }}
        >
          {text}
        </Text>
      </View>
    </Pressable>
  );
};
export default SubCategoryCard;
