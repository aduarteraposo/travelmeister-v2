export function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, "-");
}

export function mapById<T extends { id: number }>(
  items: T[]
): Record<number, T> {
  const itemsById = Object.fromEntries(items.map((item) => [item.id, item]));

  return itemsById;
}

export function capitalizeFirstLetter(str: string) {
  const firstLetter = str.charAt(0);
  const restWord = str.slice(1);

  return `${firstLetter.toUpperCase()}${restWord}`;
}

export function uniqueBy<T>(list: T[], key: (item: T) => string | number): T[] {
  const seen = new Set<string | number>();
  return list.filter((item) => {
    const value = key(item);
    if (seen.has(value)) {
      return false;
    } else {
      seen.add(value);
      return true;
    }
  });
}
