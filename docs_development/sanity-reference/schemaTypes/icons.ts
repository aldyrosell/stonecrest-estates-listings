type IconOption = { title: string; value: string };

const options = (entries: Record<string, string>): IconOption[] =>
  Object.entries(entries).map(([value, title]) => ({ title, value }));

export const FEATURE_ICONS = options({
  heart: "Heart",
  globe: "Globe",
  shield: "Shield",
  user: "Person",
});

export const SERVICE_ICONS = options({
  house: "House",
  tag: "Tag",
  chart: "Chart",
  pin: "Map pin",
  folder: "Folder",
});

export const STAT_ICONS = options({
  buildings: "Buildings",
  house: "House",
  people: "People",
  globe: "Globe",
});

export const SOCIAL_ICONS = options({
  instagram: "Instagram",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  pinterest: "Pinterest",
});
