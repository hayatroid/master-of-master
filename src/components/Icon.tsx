import { icons } from "@iconify-json/lucide/index.js";
import { getIconData, iconToSVG } from "@iconify/utils";

interface Props {
  name: string;
  size: number;
}

const Icon = ({ name, size }: Props) => {
  const data = getIconData(icons, name);
  if (!data) {
    throw new Error(`unknown icon: ${name}`);
  }

  const { attributes, body } = iconToSVG(data, {
    width: size,
    height: size,
  });

  return <svg {...attributes} innerHTML={body} />;
};

export default Icon;
