import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from '..';
import {useTheme} from '../../config/theme';
import styles from './styles';

const ToggleButton = ({option1, option2, onSelectSwitch, selectionColor}) => {
  const colors = useTheme();

  const [getSelectionMode, setSelectionMode] = useState(1);

  /** function to switch button */
  const updatedSwitchData = val => {
    setSelectionMode(val);
    onSelectSwitch(val);
  };

  return (
    <View>
      <View style={[styles.mainView, {borderColor: selectionColor}]}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(1)}
          style={[
            styles.firstBtn,
            {
              backgroundColor:
                getSelectionMode == 1 ? selectionColor : colors.headerGray,
            },
          ]}
        >
          <Text
            style={{
              color: getSelectionMode == 1 ? colors.whiteColor : selectionColor,
            }}
          >
            {option1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(2)}
          style={[
            styles.secondBtn,
            {
              backgroundColor:
                getSelectionMode == 2 ? selectionColor : colors.headerGray,
            },
          ]}
        >
          <Text
            style={{
              color: getSelectionMode == 2 ? colors.whiteColor : selectionColor,
            }}
          >
            {option2}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ToggleButton;
