import {View} from 'react-native';
import React from 'react';
import {Text} from '..';
import styles from './styles';
import {SadEmoji} from '../../assets';

const NoRecordFound = ({
  isSearch = true,
  searchedItem,
  searchFrom,
  discription,
}) => {
  return (
    <View style={styles.main}>
      <View style={styles.itemFound}>
        <Text regular caption1 lowemphasis>
          {isSearch ? (
            <>
              0 {searchFrom} found for
              <Text bold caption1 lowemphasis>{` ‘${searchedItem}’`}</Text>
            </>
          ) : (
            ''
          )}
        </Text>
      </View>

      <View style={styles.emoji}>
        <SadEmoji />
      </View>

      <View style={styles.details}>
        <Text
          bold
          title3
          mediumemphasis
          textAlign="center"
        >{`No Results Found.`}</Text>
        <Text regular body1 lowemphasis textAlign="center">
          {discription}
        </Text>
      </View>
    </View>
  );
};

export default NoRecordFound;
