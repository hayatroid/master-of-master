const TABS = {
  articles: { label: "Articles", href: "/" },
  scraps: { label: "Scraps", href: "/scraps/" },
};

interface Props {
  active: keyof typeof TABS;
}

const Tabs = ({ active }: Props) => {
  return (
    <nav class="divider flex">
      {Object.entries(TABS).map(([key, tab]) => (
        <a href={tab.href} class="hover:bg-hover flex flex-1 justify-center">
          <span
            class={`relative py-3 font-medium ${
              key === active
                ? "text-text after:bg-primary after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:rounded-full after:content-['']"
                : "text-text-muted"
            }`}
          >
            {tab.label}
          </span>
        </a>
      ))}
    </nav>
  );
};

export default Tabs;
