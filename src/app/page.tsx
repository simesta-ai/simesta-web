import Header from "@/components/layout/Header";
import "@/styles/pages/home.css";
import Chatbox from "@/components/ui/ChatBox";
import FeaturesCard from "@/components/ui/FeaturesCard";
import { Mic } from "lucide-react";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const recommendations = [
    "Data analysis with Python",
    "Quantum Mechanics",
    "Introduction to cloud computing with AWS",
  ];

  const features = [
    {
      icon: <Mic />,
      title: "Voice to Course",
      description:
        "Record your thoughts and let our AI convert them into well-structured lessons.",
    },
    {
      icon: <Mic />,
      title: "Voice to Course",
      description:
        "Record your thoughts and let our AI convert them into well-structured lessons.",
    },
    {
      icon: <Mic />,
      title: "Voice to Course",
      description:
        "Record your thoughts and let our AI convert them into well-structured lessons.",
    },
  ];
  return (
    <main className="relative">
      {/* Background Accent */}
      {/* <div className="background-overlay">
        <Image
          src={IMAGES.BACKGROUND.OVERLAY}
          alt="background"
          className="object-cover opacity-20"
        />
      </div> */}

      <Header />

      {/* Hero Section */}
      <section className="hero items-center flex flex-col">
        <h3 className="hero-text">
          Create a course and{" "}
          <span className="text-primary-600">start learning.</span>
        </h3>
        <p className="text-md subtext">
          Learn anything you want, at your own pace.
        </p>
        <Chatbox />
        <div className="flex gap-4 flex-wrap justify-center items-center padding-4">
          {recommendations.map((r, i) => {
            return (
              <button key={i} type="button" className="recommendation-btn">
                {r}
              </button>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="features items-center flex flex-col">
        <h3 className="hero-text">What&apos;s in store for you?</h3>
        <div className="features-grid">
          {features.map((feat) => {
            return (
              <FeaturesCard
                key={feat.title}
                icon={feat.icon}
                title={feat.title}
                description={feat.description}
              />
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </main>
  );
}
