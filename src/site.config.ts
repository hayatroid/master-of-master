interface Site {
  title: string;
  name: string;
  url: string;
  handle: string;
  bio: string;
  avatar?: string;
  banner?: string;
  lang: string;
  meta: { icon: string; label: string; href?: string }[];
}

export const SITE: Site = {
  title: "title",
  name: "name",
  url: "https://x.kayama.ooo",
  handle: "@handle",
  bio: "bio",
  avatar: "/avatar.svg",
  banner: "/banner.svg",
  lang: "en",
  meta: [
    { icon: "map-pin", label: "location" },
    { icon: "link", label: "site.example", href: "https://site.example" },
    { icon: "calendar", label: "joined" },
  ],
};

export const GISCUS = {
  repo: "hayatroid/master-of-master",
  repoId: "R_kgDOTQjLTw",
  category: "Announcements",
  categoryId: "DIC_kwDOTQjLT84DA4qG",
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
