import React from 'react';
import {Image, View} from 'react-native';
import styles from './styles';
import Text from '../Text';
import {useTheme} from '../../config/theme';
import {withCommas} from '../../utils/numberFormating';
import {useSelector} from 'react-redux';
import {Popular1} from '../../assets';
import {color} from 'react-native-elements/dist/helpers';

/**
 * card component for WishListReview screen
 * @param {*} param0  props as parameter
 * @returns React Element
 */
const History = ({
  key,
  image,
  buttonBackColor,
  text = 'Blue Button Down Collar',
  date = '14/03',
  type = 'Review',
  data,
}) => {
  const colors = useTheme();
  const isDarkMode = useSelector(state => state.user.clientDarkMode);
  return (
    <View key={key}>
      {type === 'History' ? (
        <View
          style={[
            styles.mainView,
            {
              backgroundColor: isDarkMode
                ? colors.txtInputDarkBack
                : colors.ButtonBackground,
            },
          ]}
        >
          <View style={styles.imageView}>
            <Image style={styles.image} source={image} />
          </View>
          <View style={styles.textMainView}>
            <View style={styles.textView}>
              <Text
                numberOfLines={1}
                regular
                caption1
                style={{
                  color: isDarkMode ? colors.whiteColor : colors.blackColor,
                }}
              >
                {text}{' '}
              </Text>
            </View>
            <View style={styles.dateView}>
              <Text overline medium lowemphasis>
                {date}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View
          style={[
            styles.mainView2,
            {
              backgroundColor: buttonBackColor
                ? buttonBackColor
                : isDarkMode
                ? colors.txtInputDarkBack
                : colors.ButtonBackground,
            },
          ]}
        >
          <View style={styles.imageView2}>
            <Image style={styles.image2} source={{uri: data.image_url}} />
          </View>
          <View style={styles.textMainView2}>
            <View style={styles.textView2}>
              <Text
                style={{
                  flex: 0.9,
                  color: isDarkMode ? colors.whiteColor : colors.blackColor,
                }}
                numberOfLines={1}
                medium
                caption1
              >
                {data.title}
              </Text>
              <Text caption1 bold lowemphasis>
                {`    x${data.quantity}`}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
              <Text
                caption1
                bold
                style={{
                  color: isDarkMode ? colors.mediumemphasis : colors.faint,
                }}
              >
                {`Rs.`}
              </Text>
              <Text
                body1
                heavy
                style={{
                  color: isDarkMode ? colors.lowemphasis : colors.primaryDark,
                }}
              >
                {withCommas(data.price)}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default History;
