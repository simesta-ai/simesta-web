import { Course } from "@/lib/types";
import React from "react";
import Module from "@/components/ui/Module";

const Modules = ({ modules }: { modules: Course["modules"] }) => {
  return (
    <div className="modules-wrapper">
      {modules
        .sort((a, b) => a.position - b.position)
        .map((module) => (
          <Module key={module.id} module={module} />
        ))}
    </div>
  );
};

export default Modules;
