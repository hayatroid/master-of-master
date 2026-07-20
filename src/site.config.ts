interface Site {
  title: string;
  name: string;
  url: string;
  handle: string;
  bio: string;
  avatar?: string;
  banner?: string;
  pinned?: string;
  lang: string;
  meta: { icon: string; label: string; href?: string }[];
}

export const SITE: Site = {
  title: "X",
  name: "諸々",
  url: "https://x.kayama.ooo",
  handle: "@NuruwoYCY",
  bio: "色々に対抗して、諸々",
  avatar: "/avatar.png",
  pinned: "mcs-all",
  lang: "ja",
  meta: [
    { icon: "map-pin", label: "大岡山" },
    {
      icon: "link",
      label: "過去問",
      href: "https://admissions.isct.ac.jp/ja/013/graduate/examination-questions",
    },
    { icon: "calendar", label: "2016年度から解き始めています" },
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
