/**
 * confirmation modal component
 * @param param0 props accepted by this component
 * @returns React Component
 */
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Pressable,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import {styles} from './styles';
import Button from '../Button';
import Text from '../Text';
import {useTheme} from '../../config/theme';
import {Line, FilledBag, MinusSvg, PlusSvg, DarkFilledBag} from '../../assets';
import {useSelector} from 'react-redux';
import {Icon, Icons} from '..';

const AddToBagModal = props => {
  const {
    visible,
    secondaryAction,
    onSwipeComplete,
    swipeDown = true,
    loading,
    onBackdropPress = false,
    optionsData,
    selectedItem,
    selectedColorItem,
    selectedMaterial,
    selectedStyle,
    selectItem,
    error,
    errMsg,
    inventoryQuantity,
    disable,
    quantity,
    decrement,
    increment,
    loadingApi,
  } = props;
  const colors = useTheme();
  const isDarkMode = useSelector(state => state.user.clientDarkMode);

  const Line = () => {
    return (
      <View
        style={{
          height: 5,
          backgroundColor: colors.faint,
          width: 120,
          alignSelf: 'center',
          borderRadius: 10,
          marginTop: 10,
        }}
      />
    );
  };
  return (
    <Modal
      isVisible={visible}
      {...(swipeDown ? {swipeDirection: 'down'} : {})}
      style={styles.bottomModal}
      backdropOpacity={0.5}
      onBackdropPress={() => {
        onBackdropPress && onSwipeComplete();
      }}
      onSwipeComplete={() => onSwipeComplete()}
    >
      <SafeAreaView
        style={[styles.boxContainer, {backgroundColor: colors.backgroundColor}]}
      >
        {swipeDown === true && <Line />}
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalStyle}
        >
          <View style={styles.headerContainer}>
            <Text
              body1
              bold
              style={{
                color: isDarkMode ? colors.whiteColor : colors.highemphasis,
              }}
            >
              {`Review Preferences`}
            </Text>
            {loadingApi ? (
              <View style={{marginTop: 23}}>
                <ActivityIndicator size="large" color={colors.primaryLight} />
              </View>
            ) : (
              <>
                {optionsData && (
                  <>
                    {optionsData.map((data, index) => {
                      if (data.name !== 'Title')
                        return (
                          <View key={index.toString()}>
                            <View style={styles.titleView}>
                              <Text
                                body2
                                medium
                                style={{
                                  color: isDarkMode
                                    ? colors.whiteColor
                                    : colors.lowemphasis,
                                }}
                              >
                                {data.name}
                              </Text>
                            </View>

                            <View>
                              <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                data={data.values}
                                renderItem={({item}) => {
                                  return (
                                    <View style={styles.selectedItemView}>
                                      <SelectedItem
                                        text={item}
                                        isSelected={
                                          selectedItem === item ||
                                          selectedColorItem === item ||
                                          selectedMaterial === item ||
                                          selectedStyle === item
                                            ? true
                                            : false
                                        }
                                        name={data.name}
                                        setSelected={selectItem}
                                      />
                                    </View>
                                  );
                                }}
                              />
                            </View>
                          </View>
                        );
                    })}
                  </>
                )}
              </>
            )}
          </View>

          <View
            style={{
              marginTop: 42,
            }}
          >
            {!error ? (
              <Text
                style={{
                  color: isDarkMode
                    ? colors.mediumemphasis
                    : colors.lowemphasis,
                }}
              >
                {inventoryQuantity < 10
                  ? `${inventoryQuantity} items remaining in stock`
                  : 'In Stock'}
              </Text>
            ) : (
              <Text lowemphasis iserror>
                {errMsg}
              </Text>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <View
              style={[
                styles.iconsView,
                {backgroundColor: colors.statusBarGray},
              ]}
            >
              <View>
                <Pressable onPress={decrement}>
                  <Icon
                    name={Icons.MINUS_CIRCLE}
                    size={22}
                    color={
                      isDarkMode ? colors.whiteColor : colors.mediumemphasis
                    }
                    type={'ant'}
                  />
                </Pressable>
              </View>
              <Text title4 regular highemphasis>
                {quantity}
                {console.log(quantity)}
              </Text>
              <View>
                <Pressable onPress={increment}>
                  <Icon
                    name={Icons.PLUS_CIRCILE}
                    size={22}
                    color={
                      isDarkMode ? colors.whiteColor : colors.mediumemphasis
                    }
                    type={'ant'}
                  />
                </Pressable>
              </View>
            </View>

            <Button
              disabled={disable}
              type={'primary'}
              loading={loading}
              onPress={() => secondaryAction()}
              buttonStyle={styles.btnStyle}
              text={`ADD TO BAG`}
              textStyles={{
                color: isDarkMode ? colors.blackColor : colors.whiteColor,
              }}
              iconLeft={isDarkMode ? <DarkFilledBag /> : <FilledBag />}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default AddToBagModal;

const SelectedItem = ({text, isSelected, name, setSelected, style}) => {
  const colors = useTheme();
  const isDarkMode = useSelector(state => state.user.clientDarkMode);
  return (
    <Pressable
      onPress={() => setSelected(text, name)}
      style={[
        styles.card,
        {
          borderColor: isDarkMode ? colors.whiteColor : colors.statusBarGray,
          backgroundColor: isSelected
            ? isDarkMode
              ? colors.whiteColor
              : colors.bordercolor
            : isDarkMode
            ? colors.backgroundColor
            : colors.lightGray,
        },
        style,
      ]}
    >
      <Text
        body2
        medium
        style={{
          color: isSelected
            ? isDarkMode
              ? colors.blackColor
              : colors.mediumemphasis
            : isDarkMode
            ? colors.whiteColor
            : colors.bordercolor,
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
};
