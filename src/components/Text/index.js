import {Typography} from '../../config/typography';
import {useTheme} from '../../config/theme';
import React from 'react';
import {StyleSheet, Text} from 'react-native';

export default function Index(props) {
  const colors = useTheme();
  const {
    //props style
    header,
    heading,
    title,
    title1,
    title2,
    title3,
    title4,
    small,
    headline,
    body1,
    body2,
    subhead,
    footnote,
    caption1,
    caption2,
    overline,
    // props font
    thin,
    ultraLight,
    light,
    regular,
    medium,
    semibold,
    bold,
    heavy,
    black,
    //custom color
    lightGray,
    whiteColor,
    blackColor,
    primaryDark,
    primaryLight,
    textPrimaryBold,
    statusBarGray,
    headerGray,
    faint,
    blueColor,
    bordercolor,
    lowemphasis,
    mediumemphasis,
    highemphasis,
    titleGray,
    numberOfLines,
    textAlign,
    //custom
    style,
    //children
    children,
    iserror,
  } = props;

  // const { colors } = useTheme();
  // const font = useFont();

  let textStyle = StyleSheet.flatten([
    header && Typography.header,
    title && Typography.title,
    title1 && Typography.title1,
    title2 && Typography.title2,
    title3 && Typography.title3,
    title4 && Typography.title4,
    heading && Typography.heading,
    small && Typography.small,
    headline && Typography.headline,
    body1 && Typography.body1,
    body2 && Typography.body2,
    subhead && Typography.subhead,
    footnote && Typography.footnote,
    caption1 && Typography.caption1,
    caption2 && Typography.caption2,
    overline && Typography.overline,

    //custom for font
    // thin && {fontWeight: FontWeight.thin},
    // ultraLight && {fontWeight: FontWeight.ultraLight},
    // light && {fontWeight: FontWeight.light},
    // regular && {fontWeight: FontWeight.regular},
    // medium && {fontWeight: FontWeight.medium},
    // semibold && {fontWeight: FontWeight.semibold},
    // // bold && {fontWeight: FontWeight.bold},
    // heavy && {fontWeight: FontWeight.heavy},
    // black && {fontWeight: FontWeight.black},
    // default color
    {color: colors.blackColor},
    //custom for color
    lightGray && {color: colors.lightGray},
    whiteColor && {color: colors.whiteColor},
    blackColor && {color: colors.blackColor},
    primaryDark && {color: colors.primaryDark},
    primaryLight && {color: colors.primaryLight},
    textPrimaryBold && {color: colors.textPrimaryBold},
    statusBarGray && {color: colors.statusBarGray},
    headerGray && {color: colors.headerGray},
    bordercolor && {color: colors.bordercolor},
    lowemphasis && {color: colors.lowemphasis},
    faint && {color: colors.faint},
    mediumemphasis && {color: colors.mediumemphasis},
    titleGray && {color: colors.titleGray},
    highemphasis && {color: colors.highemphasis},
    blueColor && {color: colors.blueColor},
    iserror && {color: colors.errorColor},
    //Lato Fonts
    thin && {fontFamily: 'Lato-Thin'},
    light && {fontFamily: 'Lato-Light'},
    regular && {fontFamily: 'Lato-Regular'},
    bold && {fontFamily: 'Lato-Bold'},
    black && {fontFamily: 'Lato-Black'},

    ultraLight && {fontFamily: 'Lato-Hairline'},
    medium && {fontFamily: 'Lato-Medium'},
    heavy && {fontFamily: 'Lato-Heavy'},
    semibold && {fontFamily: 'Lato-Semibold'},
    {
      textAlign,
    },
    style && style,
  ]);

  return (
    <Text style={textStyle} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
}
