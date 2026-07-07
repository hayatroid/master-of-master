export const SITE = {
  title: "title",
  name: "name",
  url: "https://site.example",
  handle: "@handle",
  bio: "bio",
  avatar: "/avatar.svg",
  lang: "en",
  meta: [
    { icon: "map-pin", label: "location" },
    { icon: "link", label: "site.example", href: "https://site.example" },
    { icon: "calendar", label: "joined" },
  ],
};

const ICONS: Record<string, string> = {
  数学: "sigma",
  応用数理: "square-function",
  計算機科学: "cpu",
};

export function iconFor(tags: string[]): string {
  for (const tag of tags) {
    const icon = ICONS[tag];
    if (icon) {
      return icon;
    }
  }
  return "file-text";
}
