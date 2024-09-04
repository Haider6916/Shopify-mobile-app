import {useTheme} from '../../config/theme';
import {BaseStyle} from '../../config/styles';
import React, {forwardRef, useRef, useEffect} from 'react';
import {TextInput, View, Animated} from 'react-native';
import styles from './styles';
import {Text} from '..';
import {useSelector} from 'react-redux';

const Index = forwardRef((props, ref) => {
  const {
    style,
    onChangeText,
    placeholder,
    isPlaceholder = true,
    value,
    success,
    secureTextEntry,
    keyboardType,
    multiline,
    textAlignVertical,
    icon,
    onSubmitEditing,
    inputStyle,
    iconLeft,
    isPrefix,
    ...attrs
  } = props;

  const colors = useTheme();
  const isDarkMode = useSelector(state => state.user.clientDarkMode);

  const moveText = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (value !== '') {
      moveTextTop();
    } else if (value === '') {
      moveTextBottom();
    }
  }, [value]);

  /** when input is focused */
  const onFocusHandler = () => {
    if (value !== '') {
      moveTextTop();
    }
  };

  /** blur handler of input */
  const onBlurHandler = () => {
    if (value === '') {
      moveTextBottom();
    }
  };

  /** function to animate placeholder */
  const moveTextTop = () => {
    Animated.timing(moveText, {
      toValue: 1,
      duration: 120,
      useNativeDriver: true,
    }).start();
  };

  /** function to animate back placeholder */
  const moveTextBottom = () => {
    Animated.timing(moveText, {
      toValue: 0,
      duration: 120,
      useNativeDriver: true,
    }).start();
  };

  /** value of Y in animation */
  const yVal = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [0, isDarkMode ? -34 : -32],
  });

  /** animation styles */
  const animStyle = {
    transform: [
      {
        translateY: yVal,
      },
    ],
    position: 'absolute',
    left: value !== '' ? (isPrefix ? -40 : 0) : iconLeft ? 38 : 15,
  };

  return (
    <View
      style={[
        BaseStyle.textInput,
        {
          backgroundColor: isDarkMode
            ? colors.txtInputDarkBack
            : colors.lightGray,
        },
        style,
      ]}
    >
      {iconLeft}
      {isPlaceholder && (
        <Animated.View style={[animStyle]}>
          <Text
            regular
            style={{
              fontSize: value === '' ? 16 : 10,
              color: isDarkMode ? colors.lowemphasis : colors.faint,
            }}
          >
            {placeholder}
          </Text>
        </Animated.View>
      )}
      <TextInput
        ref={ref}
        style={[
          styles.input,
          {color: isDarkMode ? colors.whiteColor : colors.mediumemphasis},
          inputStyle,
        ]}
        onChangeText={text => onChangeText(text)}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        autoCorrect={false}
        underlineColorAndroid="transparent"
        placeholderTextColor={colors.faint}
        secureTextEntry={secureTextEntry}
        value={value}
        keyboardType={keyboardType}
        multiline={multiline}
        textAlignVertical={textAlignVertical}
        onSubmitEditing={onSubmitEditing}
        {...attrs}
      />
      {icon}
    </View>
  );
});
export default Index;
