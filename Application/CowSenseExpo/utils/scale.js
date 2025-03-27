import { Dimensions } from 'react-native';

// Guideline sizes are based on a standard mobile screen (e.g., iPhone 14: 390x844)
const guidelineBaseWidth = 390;
const guidelineBaseHeight = 844;

const { width, height } = Dimensions.get('window');

const scale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export { scale, verticalScale, moderateScale };