import { useState } from "react";
import { Course } from "@/lib/types";
import { getTimeDescription } from "@/lib/workers";
import { ChevronDown, Check } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Module = ({ module }: { module: Course["modules"][0] }) => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <div className="module">
      <div className="module-header-con">
        <div className="flex flex-col gap-2">
          <Link href={`${pathname}/module/${module.id}`}>
            <h3 className="module-title">{module.title}</h3>
          </Link>
          <p className="course-desc-text text-sm">
            Module {module.position} • {getTimeDescription(1000)}
          </p>
        </div>
        <button
          onClick={handleExpand}
          className={`module-header-collapse-btn ${
            isExpanded ? "expanded" : ""
          }`}
        >
          <span>Module Details</span>
          <ChevronDown className={`dropdown-icon ${isExpanded ? "up" : ""}`} />
        </button>
      </div>
      <div className={`module-details ${isExpanded ? "expanded" : ""}`}>
        <p className="course-desc-text text-md">{module.description}</p>
        <h5 className="font-bold text-sm">
          What you will learn in this module
        </h5>
        <div className="flex flex-col gap-2">
          {module.learning_outcomes.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <Check size={16} />
              <p className="course-desc-text module-outcome-text text-sm">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Module;
