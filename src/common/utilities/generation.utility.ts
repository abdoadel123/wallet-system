import { customAlphabet } from 'nanoid';

export const NUMERIC_STRING = '0123456789';

export const ALPHA_STRING = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const randomNumeric = (length = 5) =>
  customAlphabet(NUMERIC_STRING, length)();

export const randomAlphabet = (length = 5) =>
  customAlphabet(ALPHA_STRING, length)();
