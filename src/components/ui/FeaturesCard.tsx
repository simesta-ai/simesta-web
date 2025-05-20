import { ReactNode } from "react";

export default function FeaturesCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h4 className="text-xl text feature-title">{title}</h4>
      <p className="text-md text feature-description">{description}</p>
    </div>
  );
}
