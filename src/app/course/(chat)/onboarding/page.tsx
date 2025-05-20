"use client";

import "@/styles/pages/onboarding.css";
import { IMAGES } from "@/lib/constants";
import { Info } from "lucide-react";
import { useState } from "react";

export default function OnboardingPage() {
  const [visibleTooltip, setVisibleTooltip] = useState<number | null>(null);
  const learningMethods = [
    {
      title: "Visual",
      description:
        "Learners prefer using images, diagrams, colors, and spatial understanding to grasp concepts. Charts, mind maps, and visual aids help them retain information best.",
      image: IMAGES.LEARNING_METHODS.VISUAL,
    },
    {
      title: "Kinesthetic",
      image: IMAGES.LEARNING_METHODS.VISUAL,
      description:
        "Learners understand best through hands-on experiences and physical activities. They prefer to touch, build, move, and engage directly with learning materials.",
    },
    {
      title: "Aural",
      image: IMAGES.LEARNING_METHODS.AURAL,
      description:
        "Also known as auditory learners, they retain information better through listening. Discussions, lectures, music, and verbal explanations are most effective for them.",
    },
    {
      title: "Read/Write",
      image: IMAGES.LEARNING_METHODS.READ_WRITE,
      description:
        "These learners absorb information through reading and writing. They benefit most from notes, lists, definitions, and reading detailed text-based content.",
    },
  ];

  return (
    <div className="onboarding-container">
      <div className="flex items-center justify-center flex-col">
        <h1 className="onboarding-title ai-gradient-text">Hello, Samuel!</h1>
        <p className="onboard-subtext">Let&apos;s know how you learn.</p>
      </div>
      <div className="learning-methods-container flex justify-center items-center gap-6">
        {learningMethods.map((method, index) => (
          <div key={index} className="learning-method-card relative gap-4">
            {visibleTooltip === index && (
              <div className="info-tooltip">
                <p>{method.description}</p>
              </div>
            )}
            <p className="method-description">{method.description}</p>
            <div className="flex justify-between items-center w-full px-2">
              <h4 className="method-title text-2xl ai-gradient-text">
                {method.title}
              </h4>
              <button
                onMouseEnter={() => setVisibleTooltip(index)}
                onMouseLeave={() => setVisibleTooltip(null)}
                onClick={() =>
                  setVisibleTooltip(visibleTooltip === index ? null : index)
                }
                className="flex justify-center items-center"
              >
                <Info size={20} className="info-icon" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
