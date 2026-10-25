export function groupEntries<T extends { groupLabel: string }>(entries: T[]) {
  const groupMap: Map<string, T[]> = new Map();

  for (const entry of entries) {
    const group = groupMap.get(entry.groupLabel);
    if (group) {
      group.push(entry);
    } else {
      groupMap.set(entry.groupLabel, [entry]);
    }
  }

  return Array.from(groupMap, ([label, entries]) => ({ label, entries }));
}
