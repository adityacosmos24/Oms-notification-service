export enum ItemCountBucket {
  QTY_1 = 'QTY_1',
  QTY_2 = 'QTY_2',
  QTY_3_PLUS = 'QTY_3_PLUS',
}

export function getItemCountBucket(itemCount: number): ItemCountBucket {
  if (itemCount <= 1) return ItemCountBucket.QTY_1;
  if (itemCount === 2) return ItemCountBucket.QTY_2;
  return ItemCountBucket.QTY_3_PLUS;
}