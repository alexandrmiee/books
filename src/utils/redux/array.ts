export function insertItemToArray<T = any>(
  array: Array<T>,
  index: number,
  item: T
): Array<T> {
  return [...array.slice(0, index), item, ...array.slice(index)];
}

export function removeItemFromArray<T = any>(
  array: Array<T>,
  index: number
): Array<T> {
  return [...array.slice(0, index), ...array.slice(index + 1)];
}

export function updateObjectInArray<T extends object = any>(
  array: Array<T>,
  itemIndex: number,
  newItem: Partial<T> | ((item: T) => T)
): Array<T> {
  return array.map((item: T, index: number) => {
    if (itemIndex !== index) {
      return item;
    }

    return typeof newItem === "function"
      ? newItem(item)
      : {
          ...item,
          ...newItem,
        };
  });
}
