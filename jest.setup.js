import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import {jest} from '@jest/globals';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.doMock('react-native-simple-toast', () => ({
  SHORT: jest.fn(),
}));
jest.doMock('react-native-sqlite-storage');
