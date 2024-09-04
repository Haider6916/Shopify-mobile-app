import {StyleSheet} from 'react-native';

/**
 * Fontweight setting
 * - This font weight will be used for style of screens where needed
 * - Check more how to use font weight with url below
 * @url http://passionui.com/docs/felix-travel/theming
 */
export const FontWeight = {
  thin: '100',
  ultraLight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  heavy: '800',
  black: '900',
};

/**
 * Typography setting
 * - This font weight will be used for all template
 * - Check more how to use typography in url below
 * @url http://passionui.com/docs/felix-travel/theming
 */
export const Typography = StyleSheet.create({
  header: {
    fontSize: 34,
  },
  heading: {
    fontSize: 30,
  },
  title: {
    fontSize: 26,
  },
  title1: {
    fontSize: 28,
  },
  title2: {
    fontSize: 22,
  },
  title3: {
    fontSize: 20,
  },
  title4: {
    fontSize: 18,
  },
  headline: {
    fontSize: 17,
  },
  body1: {
    fontSize: 16,
  },
  body2: {
    fontSize: 14,
  },
  subhead: {
    fontSize: 15,
  },
  footnote: {
    fontSize: 13,
  },
  caption1: {
    fontSize: 12,
  },
  caption2: {
    fontSize: 11,
  },
  overline: {
    fontSize: 10,
  },
  small: {
    fontSize: 8,
  },
});
