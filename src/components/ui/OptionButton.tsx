import { ReactNode } from "react";
import Button from "./Button";

export default function OptionButton({
  text,
  onClick,
  icon,
}: {
  text: string;
  onClick: () => void;
  icon: ReactNode;
}) {
  return (
    <Button variant="outline" size="xs" leftIcon={icon as ReactNode}>
      {text}
    </Button>
  );
}
