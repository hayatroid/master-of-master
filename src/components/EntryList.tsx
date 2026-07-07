import Icon from "./Icon";

interface Props {
  entries: { href: string; icon: string; title: string; subtitle?: string }[];
}

const EntryList = ({ entries }: Props) => {
  return (
    <ul>
      {entries.map((entry) => (
        <li class="divider">
          <a
            href={entry.href}
            class="hover:bg-hover flex items-center gap-2 px-4 py-3"
          >
            <div class="border-border text-text-muted flex size-11 shrink-0 items-center justify-center rounded-full border">
              <Icon name={entry.icon} size={20} />
            </div>
            <div class="flex min-w-0 flex-col gap-1">
              {entry.subtitle && (
                <p class="text-text-muted">{entry.subtitle}</p>
              )}
              <p>{entry.title}</p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default EntryList;
