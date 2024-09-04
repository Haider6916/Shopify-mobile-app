import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BaseStyle} from '../../config/styles';
import {useTheme} from '../../config/theme';
import {Icon, Icons, Text, History, ItemPayment} from '../../components';
import styles from './styles';
import {View, StyleSheet} from 'react-native';
import {AccordionList} from 'accordion-collapse-react-native';

const OrderSummary = () => {
  const colors = useTheme();

  const data = [
    {
      name: 'SUB-TOTAL',
      value: '3599',
    },
    {
      name: 'APP DISCOUNT',
      value: '- 300',
    },
    {
      name: 'DISCOUNTS & VOUCHERS',
      value: '- 900',
    },
    {
      name: 'DELIVERY',
      value: '200',
    },
    {
      name: 'TOTAL TO PAY',
      value: 'Rs.2,899',
    },
  ];

  const [list] = useState([
    {
      id: 1,
      title: 'Order Summary',
      svg1: <History type={'Review'} buttonBackColor={colors.statusBarGray} />,
    },
  ]);

  /** accordion list header component */
  const _head = (item, index, isExpanded) => {
    return (
      <View
        style={StyleSheet.flatten([
          isExpanded === false
            ? styles.noticeViewNotExpanded
            : styles.noticeViewExpanded,
        ])}
      >
        <View style={styles.headFirstView}>
          <Text bold overline>
            {item.title}
          </Text>
          <View style={styles.headSecondView}>
            {isExpanded === false ? (
              <Icon
                name={Icons.CHEVRON_DOWN}
                color={colors.blackColor}
                size={9}
              />
            ) : (
              <Icon
                name={Icons.CHEVRON_UP}
                color={colors.blackColor}
                size={9}
              />
            )}
          </View>
        </View>
      </View>
    );
  };

  /** accordion list body component */
  const _body = item => {
    return (
      <View
        style={[
          {
            backgroundColor: colors.lightGray,
          },
        ]}
      >
        {item.svg1}
        <View
          style={[styles.bodyFirstView, {backgroundColor: colors.lightGray}]}
        >
          {data.map((item, index) => {
            return (
              <ItemPayment
                key={index.toString()}
                name={item.name}
                value={item.value}
                isBold={index === data.length - 1 ? true : false}
              />
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[
        BaseStyle.safeAreaView,
        {
          backgroundColor: colors.lightGray,
        },
      ]}
    >
      <View>
        <AccordionList
          showsVerticalScrollIndicator={false}
          list={list}
          header={_head}
          body={_body}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    </SafeAreaView>
  );
};
export default OrderSummary;
