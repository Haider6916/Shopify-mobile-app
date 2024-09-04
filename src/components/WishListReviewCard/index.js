import React, {useState} from 'react';
import {Image, Pressable, View} from 'react-native';
import styles from './styles';
import Text from '../Text';
import Button from '../Button';
import {useTheme} from '../../config/theme';
import {Icons, Icon} from '..';
import {MinusSvg, PlusSvg} from '../../assets';

/**
 * card component for WishListReview screen
 * @param {*} param0  props as parameter
 * @returns React Element
 */
const WishListReviewCard = ({
  image,
  title = 'REVIEW PREFERENCES',
  sizeTxt = 'SIZE:',
  size = ' XS',
  cancelBtn = 'CANCEL',
  doneBtn = 'DONE',
}) => {
  const colors = useTheme();

  const [count, setCount] = useState(1);

  /** function to decrement quantity */
  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };

  /** function to increment quantity */
  const increment = () => {
    setCount(count + 1);
  };
  return (
    <View style={[styles.mainView, {backgroundColor: colors.ButtonBackground}]}>
      <View style={styles.imageView}>
        <Image style={styles.image} source={image} />
      </View>
      <View style={styles.txtMainView}>
        <View style={styles.txtView}>
          <View style={styles.txtSecondView}>
            <Text heavy caption1 bordercolor>
              {title}
            </Text>
          </View>
          <View style={styles.sizeTxtView}>
            <Text body2 regular blackColor>
              {sizeTxt}
              <Text body2 haevy blackColor>
                {size}
              </Text>
            </Text>
            <View style={styles.dropIconView}>
              <Icon
                name={Icons.CHEVRON_DOWN}
                type={`Entypo`}
                size={18}
                color={colors.blackColor}
              />
            </View>
          </View>
        </View>
        <View style={styles.btnMainView}>
          <View style={styles.cancelBtnView}>
            <Button
              text={cancelBtn}
              textStyles={[styles.btnCancelTxt, {color: colors.primaryDark}]}
              buttonColor={colors.ButtonBackground}
              buttonStyle={[styles.btnCancelStyle, {borderColor: colors.faint}]}
            />
          </View>
          <View style={styles.doneBtnView}>
            <Button
              text={doneBtn}
              textStyles={[styles.btnDoneTxt, {color: colors.whiteColor}]}
              buttonStyle={styles.btnDoneStyle}
            />
          </View>
        </View>
      </View>
      <View style={styles.plusMinusMainView}>
        <Pressable onPress={decrement}>
          <MinusSvg />
        </Pressable>
        <View>
          <Text> {count}</Text>
        </View>
        <View style={styles.plusIcon}>
          <Pressable onPress={increment}>
            <PlusSvg />
          </Pressable>
        </View>
      </View>
    </View>
  );
};
export default WishListReviewCard;
