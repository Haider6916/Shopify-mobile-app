/**
 * no internet modal complete model as whole
 */
import React from 'react';
import {View, Modal, KeyboardAvoidingView, Platform} from 'react-native';
import {styles} from './styles';
import Button from '../Button';
import {Text} from '..';
import {useTheme} from '../../config/theme';
import {useSelector} from 'react-redux';
import {NoInternetDark, NoInternetLight} from '../../assets';

/**
 * no internet model component
 * @param param0 props accepted by this component
 * @returns React Component
 */
const NoInternetModal = props => {
  const {visible, primaryAction, retrying} = props;
  const colors = useTheme();
  const isDarkMode = useSelector(state => state.user.clientDarkMode);

  return (
    <Modal visible={visible} transparent={true} animationType={'fade'}>
      <KeyboardAvoidingView
        style={styles.mainConatiner}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        <View
          style={[
            styles.boxConatiner,
            {backgroundColor: colors.backgroundColor},
          ]}
        >
          <View style={styles.icon}>
            {isDarkMode ? <NoInternetDark /> : <NoInternetLight />}
          </View>

          <Text bold header highemphasis textAlign={'center'}>
            {`No Internet!`}
          </Text>

          <Text body1 regular highemphasis textAlign={'center'}>
            {`Looks like you’re not connected to the internet. Check your connection and try again`}
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              text={`TRY AGAIN`}
              onPress={primaryAction}
              style={styles.buttonStyle2}
              loading={retrying}
              textStyles={[
                styles.loginBtnTxt,
                {
                  color: isDarkMode ? colors.btnTxt : colors.whiteColor,
                },
              ]}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default NoInternetModal;
