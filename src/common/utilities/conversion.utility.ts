export function fixedDecimalPoint(number: number | string, position = 2) {
  if (!Number(number)) return 0;

  const fixedPosition = Number(number).toFixed(position);

  return Number(fixedPosition);
}
