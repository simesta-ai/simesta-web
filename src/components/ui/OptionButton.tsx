import { ReactNode } from "react";
import Button from "./Button";

export default function OptionButton({
  text,
  onClick,
  icon,
  type
}: {
  text: string;
  onClick: () => void;
  icon: ReactNode;
  type?: "ability" | "ability-active";
}) {
  return (
    <Button
      onClick={onClick}
      variant={type ? `outline-${type}` : "outline"}
      size="xxs"
      leftIcon={icon as ReactNode}
    >
      {text}
    </Button>
  );
}
