import {useTheme} from '../../config/theme';
import React, {forwardRef} from 'react';
import {Pressable, TextInput, View} from 'react-native';
import Text from '../Text';
import {styles} from './styles';
import {useSelector} from 'react-redux';

const ButtonInput = forwardRef((props, ref) => {
  const {
    style,
    onChangeText,
    placeholder,
    value,
    success,
    secureTextEntry,
    keyboardType,
    multiline,
    textAlignVertical,
    icon,
    onSubmitEditing,
    inputStyle,
    buttonOnPress,
    buttonText,
    disabled,
    ...attrs
  } = props;

  const colors = useTheme();
  const isDarkMode = useSelector(state => state.user.clientDarkMode);

  return (
    <View
      style={[
        styles.textInput,
        {
          backgroundColor: isDarkMode
            ? colors.txtInputDarkBack
            : colors.lightGray,
        },
        style,
      ]}
    >
      <TextInput
        ref={ref}
        style={[
          styles.textInputStyle,
          {color: isDarkMode ? colors.whiteColor : colors.mediumemphasis},
          inputStyle,
        ]}
        onChangeText={text => onChangeText(text)}
        autoCorrect={false}
        placeholder={placeholder}
        placeholderTextColor={colors.faint}
        secureTextEntry={secureTextEntry}
        value={value}
        keyboardType={keyboardType}
        multiline={multiline}
        textAlignVertical={textAlignVertical}
        onSubmitEditing={onSubmitEditing}
        {...attrs}
      />
      <Pressable
        disabled={disabled}
        onPress={buttonOnPress}
        style={[
          styles.button,
          {backgroundColor: isDarkMode ? colors.whiteColor : colors.primaryDark, opacity: disabled ? 0.5 : 1},
        ]}
      >
        <Text body1 bold style={{color: isDarkMode ? colors.btnTxt : colors.whiteColor,}}>
          {buttonText}
        </Text>
      </Pressable>
    </View>
  );
});

export default ButtonInput;
