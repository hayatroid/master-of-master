import Icon from "./Icon";

interface Props {
  entries: {
    href: string;
    icon: string;
    title: string;
    subtitle?: string;
    pinned?: boolean;
  }[];
}

const EntryList = ({ entries }: Props) => {
  return (
    <ul>
      {entries.map((entry) => (
        <li class="divider">
          <a
            href={entry.href}
            class="hover:bg-hover flex flex-col gap-1 px-4 py-3"
          >
            {entry.pinned && (
              <div class="text-text-muted flex items-center gap-2">
                <div class="flex w-11 shrink-0 justify-end">
                  <Icon name="pin" size={14} />
                </div>
                <p class="text-sm font-bold">固定</p>
              </div>
            )}
            <div class="flex items-center gap-2">
              <div class="border-border text-text-muted flex size-11 shrink-0 items-center justify-center rounded-full border">
                <Icon name={entry.icon} size={20} />
              </div>
              <div class="flex min-w-0 flex-col gap-1">
                {entry.subtitle && (
                  <p class="text-text-muted">{entry.subtitle}</p>
                )}
                <p>{entry.title}</p>
              </div>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default EntryList;
