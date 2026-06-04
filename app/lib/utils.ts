export function slugify(str: string) {
  return str.toLowerCase().replace(/\s+/g, "-");
}

export function mapById<T extends { id: number }>(
  items: T[]
): Record<number, T> {
  const itemsById = Object.fromEntries(
    items.map((item) => [
      item.id,
      {
        ...item,
      },
    ])
  );

  return itemsById;
}

export function capitalizeFirstLetter(str: string) {
  const firstLetter = str.charAt(0);
  const restWord = str.slice(1);

  return `${firstLetter.toUpperCase()}${restWord}`;
}
