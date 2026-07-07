interface Props {
  label: string;
}

const Badge = ({ label }: Props) => {
  return (
    <span class="border-border text-text-muted rounded-full border px-2 py-1 text-xs">
      {label}
    </span>
  );
};

export default Badge;
