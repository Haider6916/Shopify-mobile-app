import React, {useState} from 'react';
import {View, Pressable, Linking, TouchableOpacity} from 'react-native';
import styles from './styles';
import Text from '../Text';
import {useTheme} from '../../config/theme';
import {
  Location,
  Instagram,
  Facebook,
  Twitter,
  DarkLocation,
  TwitterDark,
  DarkFacebook,
  DarkInsta,
} from '../../assets';
import {useSelector} from 'react-redux';
import GestureRecognizer from 'react-native-swipe-gestures';

/**
 * card component for store location
 * @param {*} param0  props as parameter
 * @returns React Element
 */
const StoreLocation = ({mapData}) => {
  const colors = useTheme();

  const isDarkMode = useSelector(state => state.user.clientDarkMode);

  const [selectedTab, seTSelectedTab] = useState(mapData.locationData[0]);

  /**
   * function handle and manipulate api calling accoring to selected tab
   * @param itemData
   */
  const setTabsAndApiCallings = itemData => {
    seTSelectedTab(itemData);
  };

  /**
   * method to open google map
   */
  const openMap = selectedTab => {
    // const lat = selectedTab.lat;
    // const lng = selectedTab.long;
    // const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    // const latLng = `${lat},${lng}`;
    // const label = 'Negative Apparel';
    // const url = Platform.select({
    //   ios: `${scheme}${label}@${latLng}`,
    //   android: `${scheme}${latLng}(${label})`,
    // });

    Linking.openURL(selectedTab?.link);
  };

  /**
   * method to open Instagram and fb
   */
  const social = link => {
    Linking.openURL(link);
  };

  const changeData = movement => {
    if (movement === 'right') {
      if (selectedTab.key > 1) {
        const selected = mapData.locationData.filter(item => {
          if (item.key === selectedTab.key - 1) return item;
        });
        seTSelectedTab(selected[0]);
      }
    } else {
      if (mapData.locationData.length > selectedTab?.key) {
        const selected = mapData.locationData.filter(item => {
          if (item.key === selectedTab.key + 1) return item;
        });
        seTSelectedTab(selected[0]);
      }
    }
  };
  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          {mapData?.locationData.length > 0 && (
            <Text
              light
              overline
              highemphasis
              style={styles.storeText}
            >{`STORE LOCATION`}</Text>
          )}
          {mapData?.locationData.length > 0 && (
            <Text bold title3 highemphasis>
              {`Find Us Here`}
              </Text>
          )}
        </View>
        {mapData.accounts.length > 0 && (
          <>
            <View style={{flexDirection: 'row'}}>
              {mapData.accounts.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index.toString()}
                    onPress={() => social(item.accountLink)}
                  >
                    {item?.name == 'Instagram' && item.accountLink != '' && (
                      <View
                        style={[
                          styles.instaIcon,
                          {
                            backgroundColor: colors.headerGray,
                          },
                        ]}
                      >
                        {isDarkMode ? <DarkInsta /> : <Instagram />}
                      </View>
                    )}
                    {item?.name == 'Facebook' && item.accountLink != '' && (
                      <View
                        style={[
                          styles.instaIcon,
                          {
                            backgroundColor: colors.headerGray,
                          },
                        ]}
                      >
                        {isDarkMode ? <DarkFacebook /> : <Facebook />}
                      </View>
                    )}
                    {item?.name == 'Twitter' && item.accountLink != '' && (
                      <View
                        style={[
                          styles.instaIcon,
                          {
                            backgroundColor: colors.headerGray,
                          },
                        ]}
                      >
                        {isDarkMode ? <TwitterDark /> : <Twitter />}
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}
      </View>

      {mapData?.locationData.length > 0 && (
        <View
          style={[
            styles.mapView,
            {
              backgroundColor: colors.lightGray,
            },
          ]}
        >
          <View
            style={[styles.selectBar, {borderBottomColor: colors.bordercolor}]}
          >
            <View style={styles.selectBarView}>
              {mapData.locationData.map((item, index) => {
                return (
                  <TopBarItems
                    key={index.toString()}
                    tabName={item?.city}
                    seTSelectedTab={setTabsAndApiCallings}
                    selectedTab={selectedTab?.city}
                    index={index}
                    item={item}
                  />
                );
              })}
            </View>
          </View>

          <GestureRecognizer
            onSwipeLeft={() => changeData('left')}
            onSwipeRight={() => changeData('right')}
            style={styles.mapViewInner}
          >
            <View style={styles.mapViewLeft}>
              <Text regular footnote highemphasis>
                {selectedTab?.address}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => openMap(selectedTab)}
              style={styles.mapViewRight}
            >
              <View
                style={[
                  styles.locationIcon,
                  {
                    backgroundColor: colors.headerGray,
                  },
                ]}
              >
                {isDarkMode ? <DarkLocation /> : <Location />}
              </View>
            </TouchableOpacity>
          </GestureRecognizer>

          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            {mapData.locationData.map((item, index) => {
              return (
                <View
                  key={index.toString()}
                  style={{
                    height: 12,
                    width: 12,
                    borderRadius: 6,
                    backgroundColor:
                      selectedTab?.city === item.city
                        ? isDarkMode
                          ? colors.whiteColor
                          : colors.faint
                        : isDarkMode
                        ? colors.faint
                        : colors.whiteColor,
                    marginRight: 5,
                    borderWidth: 1,
                    borderColor: colors.bordercolor,
                    bottom: 17,
                  }}
                />
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
};
export default StoreLocation;

/** top banner item component */
const TopBarItems = ({tabName, seTSelectedTab, selectedTab, index, item}) => {
  return (
    <Pressable
      key={index.toString()}
      style={styles.notSelectedItem}
      onPress={() => {
        seTSelectedTab(item);
      }}
    >
      {selectedTab !== tabName ? (
        <Text caption1 regular lowemphasis>
          {tabName}
        </Text>
      ) : (
        <Text caption1 bold highemphasis>
          {tabName}
        </Text>
      )}
    </Pressable>
  );
};
