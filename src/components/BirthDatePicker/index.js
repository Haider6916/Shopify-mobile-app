/**
 * modal for date and day picker for birthdate
 */
import React, {useState} from 'react';
import {
  View,
  Animated,
  Dimensions,
  Pressable,
  ScrollView,
  Platform,
} from 'react-native';
import {Text, Icon, Icons} from '..';
import {styles} from './styles';
import DateItems from './DateItem';
import {useTheme} from '../../config/theme';
import DatePicker from '../DatePicker';

const height = Dimensions.get('window').height;

/** function will return birth  date pickker modal */
const BirthDatePicker = ({
  SlideInLeft,
  _start,
  _stop,
  dob,
  setDob,
  dateState,
  setDateState,
}) => {
  const colors = useTheme();

  const [callDate, setCalldate] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  var {years, days, months} = DatePicker(
    callDate,
    selectedMonth,
    setCalldate,
    selectedYear,
    dob,
    setDob,
  );

  const animationStyle = {
    transform: [
      {
        translateY: SlideInLeft.interpolate({
          inputRange: [0, 1],
          outputRange: [height, 0],
        }),
      },
    ],
    width: '100%',
    position: 'absolute',
    bottom: 0,
    padding: 10,
    height: 380,
  };
  const selectFunction = (indexData, itemData) => {
    if (dateState === 1) {
      setDob({
        ...dob,
        monthIndex: indexData,
        month: itemData,
      });
    } else if (dateState === 2) {
      setDob({
        ...dob,
        dayIndex: indexData,
        day: itemData,
      });
    } else {
      setDob({
        ...dob,
        yearIndex: indexData,
        year: itemData,
      });
    }
    _stop();
  };
  return (
    <View style={[styles.container]}>
      <Animated.View
        style={[
          animationStyle,
          {
            backgroundColor: colors.backgroundColor,
            opacity: Platform.OS === 'ios' ? 1 : 0.92,
          },
        ]}
      >
        <View>
          <Pressable
            onPress={() => _stop()}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 3,
              marginTop: 10,
            }}
          >
            <Text regular highemphasis overline>{`Birth Date`}</Text>
            <Icon name={Icons.CROSS} color={colors.mediumemphasis} size={12} />
          </Pressable>
          <View style={styles.birthDateContainer}>
            <Pressable
              testID={'_openMonths'}
              style={[
                styles.birthDateItem,
                {
                  backgroundColor: colors.lightGray,
                  borderColor: colors.bordercolor,
                },
              ]}
              onPress={() => setDateState(1)}
            >
              <Text
                highemphasis
                textAlign="center"
                testID={`_dobMonth`}
                onPress={() => _start()}
              >
                {dob.month ? dob.month : `Month`}
              </Text>
              <Icon
                type={'AntDesign'}
                name={Icons.SELECT_DOWN}
                color={colors.mediumemphasis}
                size={15}
              />
            </Pressable>

            <Pressable
              testID={'_OpenDate'}
              style={[
                styles.birthDateItem,
                {
                  backgroundColor: colors.lightGray,
                  borderColor: colors.bordercolor,
                },
              ]}
              onPress={() => setDateState(2)}
            >
              <Text highemphasis>{dob.day ? dob.day : `Day`}</Text>
              <Icon
                type={'AntDesign'}
                name={Icons.SELECT_DOWN}
                color={colors.mediumemphasis}
                size={15}
              />
            </Pressable>
            <Pressable
              testID={'_OpenYear'}
              style={[
                styles.birthDateItem,
                {
                  backgroundColor: colors.lightGray,
                  borderColor: colors.bordercolor,
                },
              ]}
              onPress={() => setDateState(3)}
            >
              <Text highemphasis>{dob.year ? dob.year : `Year`}</Text>
              <Icon
                type={'AntDesign'}
                name={Icons.SELECT_DOWN}
                color={colors.mediumemphasis}
                size={15}
              />
            </Pressable>
          </View>
          <Pressable onPress={() => _stop()} style={[styles.dataContainer]}>
            <ItemScroller
              state={dateState}
              data={months}
              indexAt={dob.monthIndex}
              selectFunction={(indexData, itemData) => {
                setSelectedMonth(itemData);
                setCalldate(true);
                selectFunction(indexData, itemData);
              }}
              itemState={1}
              testID={'_month'}
            />
            <ItemScroller
              state={dateState}
              data={days}
              indexAt={dob.dayIndex}
              selectFunction={(indexData, itemData) => {
                selectFunction(indexData, itemData);
              }}
              itemState={2}
              testID={'_day'}
            />
            <ItemScroller
              state={dateState}
              data={years}
              indexAt={dob.yearIndex}
              selectFunction={(indexData, itemData) => {
                setSelectedYear(itemData);
                setCalldate(true);
                selectFunction(indexData, itemData);
              }}
              itemState={3}
              testID={'year'}
            />
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
};

const ItemScroller = ({
  state,
  data,
  indexAt,
  selectFunction,
  itemState,
  testID,
}) => {
  let colors = useTheme();
  return (
    <View
      style={[
        styles.topDataContainer,
        state === itemState && [
          {
            borderColor: colors.bordercolor,
            borderWidth: 1,
            backgroundColor: colors.lightGray,
          },
        ],
      ]}
    >
      {state === itemState && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          {state === itemState &&
            data.map((item, index) => (
              <DateItems
                key={index.toString()}
                testID={testID}
                item={item}
                index={index}
                id={indexAt}
                selectFunction={(indexData, itemData) =>
                  selectFunction(indexData, itemData)
                }
              />
            ))}
        </ScrollView>
      )}
    </View>
  );
};

export default BirthDatePicker;
