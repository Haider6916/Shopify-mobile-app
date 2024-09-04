import React from 'react';
import {View, Image} from 'react-native';
import styles from './styles';
import {useTheme} from '../../config/theme';
import {Text, Button} from '..';
import {useSelector} from 'react-redux';

/**
 * card component for order history
 * @param {*} param0  props as parameter
 * @returns React Element
 */
const OrderHistoryCard = ({index, priceTotal, orderId, products, date}) => {
  const colors = useTheme();
  const isDarkMode = useSelector(state => state.user.clientDarkMode);

  return (
    <View
      key={index.toString()}
      style={[
        styles.card,
        {
          backgroundColor: isDarkMode
            ? colors.txtInputDarkBack
            : colors.whiteColor,
        },
      ]}
    >
      <View style={[styles.orderNameView, {borderColor: colors.bordercolor}]}>
        <Text
          body1
          bold
          style={{color: isDarkMode ? colors.whiteColor : colors.blackColor}}
        >{`Order Name`}</Text>
        <Text
          regular
          body2
          style={{
            color: isDarkMode ? colors.whiteColor : colors.mediumemphasis,
          }}
        >
          {date}
        </Text>
      </View>

      <View style={styles.orderIdMainView}>
        <View>
          <View style={styles.orderIdView}>
            <Text
              regular
              body2
              style={{
                color: isDarkMode ? colors.whiteColor : colors.mediumemphasis,
              }}
            >{`ORDER ID: `}</Text>
            <Text
              regular
              medium
              style={{
                color: isDarkMode ? colors.whiteColor : colors.mediumemphasis,
              }}
            >
              {orderId}
            </Text>
          </View>
          <View style={styles.totalPriceView}>
            <Text
              regular
              body2
              style={{
                color: isDarkMode ? colors.whiteColor : colors.mediumemphasis,
              }}
            >{`TOTAL: `}</Text>
            <Text
              regular
              medium
              style={{
                color: isDarkMode ? colors.whiteColor : colors.mediumemphasis,
              }}
            >
              {`PKR. ${priceTotal}`}
            </Text>
          </View>
        </View>

        {/* <Button
          text={`REORDER`}
          textStyles={[
            styles.btnTxtStyle,
            {color: isDarkMode ? colors.blackColor : colors.whiteColor},
          ]}
          buttonStyle={styles.btnStyle}
          onPress={() => console.log('reorder')}
        /> */}
      </View>
      {products.map((item, index) => {
        return (
          <View
            key={index.toString()}
            style={[styles.mapMainView, {borderColor: colors.bordercolor}]}
          >
            <View style={[styles.imageView,{borderWidth:1,borderRadius:4, padding:8, borderColor:colors.statusBarGray,marginRight:5}]}>
              <Image
                style={styles.imageStyle}
                source={{uri: item.image}}
                resizeMode={'contain'}
              ></Image>
            </View>
            <View style={styles.txtStyle}>
              <Text
                numberOfLines={2}
                medium
                body1
                style={{
                  color: isDarkMode ? colors.whiteColor : colors.mediumemphasis,
                }}
              >
                {item.title}
              </Text>
              <View style={styles.sizeColorTxt}>
                <Text
                  regular
                  body2
                  style={{
                    color: isDarkMode
                      ? colors.whiteColor
                      : colors.mediumemphasis,
                  }}
                >
                  {item.size}
                  {`/`}
                  {item.color}
                </Text>
              </View>
              <View style={styles.priceMainView}>
                <View style={styles.quantityTxtView}>
                  <Text
                    regular
                    body2
                    style={{
                      color: isDarkMode
                        ? colors.whiteColor
                        : colors.mediumemphasis,
                    }}
                  >
                    {`Qty `}
                    {item.quantity}
                  </Text>
                </View>
                <View>
                  <Text
                    regular
                    body2
                    style={{
                      color: isDarkMode
                        ? colors.whiteColor
                        : colors.mediumemphasis,
                    }}
                  >
                    {`PKR `}
                    {item.prodPrice}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default OrderHistoryCard;
