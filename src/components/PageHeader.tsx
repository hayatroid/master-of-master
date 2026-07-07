import Icon from "./Icon";

interface Props {
  label: string;
  href: string;
}

const PageHeader = ({ label, href }: Props) => {
  return (
    <header class="divider flex items-center gap-4 p-2">
      <a href={href} class="hover:bg-hover rounded-full p-2">
        <Icon name="arrow-left" size={20} />
      </a>
      <span class="text-xl font-bold">{label}</span>
    </header>
  );
};

export default PageHeader;
