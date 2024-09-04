import React, {useState} from 'react';
import {View, Switch} from 'react-native';
import {Text} from '../../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BaseStyle} from '../../../config/styles';
import {useTheme} from '../../../config/theme';
import styles from './styles';

const Notification = () => {
  const colors = useTheme();
  const [allNotification, setAllNotification] = useState(false);
  const [genral, setGenral] = useState(false);
  const [newCollection, setNewCollection] = useState(false);
  const [flashSales, setFlashSale] = useState(false);
  const [discount, setDiscount] = useState(false);

  /**
   * this function will change all toggle
   * @param {*} state new value of toggels
   */
  const toggleAllNotification = state => {
    setAllNotification(state);
    setGenral(state);
    setNewCollection(state);
    setFlashSale(state);
    setDiscount(state);
  };

  /**
   * this function will change general toggle
   * @param {*} state new value of toggle
   */
  const toggleGeneral = state => {
    setGenral(state);
  };

  /**
   * this function will change setNewCollection toggle
   * @param {*} state new value of toggle
   */
  const toggleNewcollection = state => {
    setNewCollection(state);
  };

  /**
   * this function will change Flashsales toggle
   * @param {*} state new value of toggle
   */
  const toggleFlashsales = state => {
    setFlashSale(state);
  };

  /**
   * this function will change Discount toggle
   * @param {*} state new value of toggle
   */
  const toggleDiscount = state => {
    setDiscount(state);
  };

  return (
    <SafeAreaView
      style={[
        BaseStyle.safeAreaView,
        {backgroundColor: colors.backgroundColor},
      ]}
    >
      <View style={styles.container}>
        <View style={styles.allNotification}>
          <Text bold title3 highemphasis>{`All Notifications`}</Text>
          <Switch
            trackColor={{false: colors.headerGray, true: colors.headerGray}}
            thumbColor={
              allNotification ? colors.primaryDark : colors.primaryDark
            }
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleAllNotification(!allNotification)}
            value={allNotification}
          />
        </View>
        <View style={styles.subView}>
          <View style={styles.row}>
            <Text bold title3 highemphasis>{`General`}</Text>
            <Switch
              trackColor={{false: colors.headerGray, true: colors.headerGray}}
              thumbColor={genral ? colors.primaryDark : colors.primaryDark}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => toggleGeneral(!genral)}
              value={genral}
            />
          </View>

          <View style={styles.row}>
            <Text bold title3 highemphasis>{`New Collection`}</Text>
            <Switch
              trackColor={{false: colors.headerGray, true: colors.headerGray}}
              thumbColor={
                newCollection ? colors.primaryDark : colors.primaryDark
              }
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => toggleNewcollection(!newCollection)}
              value={newCollection}
            />
          </View>

          <View style={styles.row}>
            <Text bold title3 highemphasis>{`Flash Sales`}</Text>
            <Switch
              trackColor={{false: colors.headerGray, true: colors.headerGray}}
              thumbColor={flashSales ? colors.primaryDark : colors.primaryDark}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => toggleFlashsales(!flashSales)}
              value={flashSales}
            />
          </View>

          <View style={styles.row}>
            <Text bold title3 highemphasis>{`Discounts`}</Text>
            <Switch
              trackColor={{false: colors.headerGray, true: colors.headerGray}}
              thumbColor={discount ? colors.primaryDark : colors.primaryDark}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => toggleDiscount(!discount)}
              value={discount}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Notification;
