import { Check } from "lucide-react";

const CheckIcon = ({ size }: { size: number }) => {
  return (
    <div className="check-con flex items-center gap-2">
      <Check className="check-icon" size={size} />
    </div>
  );
};

export default CheckIcon;
