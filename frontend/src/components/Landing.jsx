import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import heroImage from "../assets/hero.png";
import icon1 from "../assets/icon1.png";
import icon2 from "../assets/icon2.png";
import icon3 from "../assets/icon3.png";
import { 
  FaCheckCircle, 
  FaChartLine, 
  FaBell, 
  FaLightbulb, 
  FaCalendarAlt,
  FaArrowRight,
  FaStar,
  FaGithub,
  FaLinkedin,
  FaCode
} from "react-icons/fa";

const Landing = () => {
  const features = [
    {
      icon: <FaCode className="text-2xl" />,
      title: "🧠 Smart Question Tracking",
      description: [
        "Add any coding question you solve from:",
        "• LeetCode • Codeforces • CodeChef",
        "• GFG • Any other platform",
        "All questions live in one clean dashboard.",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FaLightbulb className="text-2xl" />,
      title: "📝 Solution Method Tagging",
      description: [
        "For every question, mark how you solved it:",
        "• Solved completely by yourself",
        "• Took hints • Used AI hints",
        "• Watched YouTube/editorial",
        "This gives honest insight into your understanding.",
      ],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <FaChartLine className="text-2xl" />,
      title: "📊 Confidence Level Calculation",
      description: [
        "We automatically calculate your confidence score based on:",
        "• Your solving method",
        "• Revision history",
        "• Time gap since last attempt",
        "No guessing. Just data.",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <FaBell className="text-2xl" />,
      title: "⏰ Smart Revision Reminders",
      description: [
        "Get email reminders to revisit questions:",
        "• After 1 week • After 2 weeks",
        "• After 1 month",
        "Based on your confidence level, not random schedules.",
      ],
      color: "from-orange-500 to-yellow-500",
    },
    {
      icon: <FaCheckCircle className="text-2xl" />,
      title: "📈 Progress That Actually Matters",
      description: [
        "Track what counts:",
        "• Strong vs weak topics",
        "• Questions you truly understand",
        "• Problems that need revision",
        "Prepare smarter for interviews, contests, and exams.",
      ],
      color: "from-red-500 to-rose-500",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const teamMembers = [
    {
      name: "Kumar Piyush",
      role: "Full Stack Developer",
      bio: "Passionate about building tools that help developers learn better.",
      avatar: "https://i.pravatar.cc/300?img=12",
      github: "#",
      linkedin: "#",
    },
    {
      name: "Bhushan",
      role: "Backend Developer",
      bio: "Loves solving complex problems and building scalable systems.",
      avatar: "https://i.pravatar.cc/300?img=8",
      github: "#",
      linkedin: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 mb-6">
                🚀 Built for Developers by Developers
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Track What You
                <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Solve & Master.
                </span>
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                Stop losing solved problems in bookmarks and notes. Our platform helps you track every coding question, 
                measure your confidence, and reminds you exactly when to revise.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/sign-in"
                  className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 text-base font-semibold text-white shadow-lg hover:from-blue-700 hover:to-cyan-700"
                >
                  Get Started Free
                  <FaArrowRight className="ml-2" />
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-700 hover:bg-gray-50"
                >
                  <FaStar className="mr-2 text-yellow-500" />
                  See How It Works
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl border border-gray-200 bg-white p-2 shadow-2xl">
                <img
                  src={heroImage}
                  alt="CodeTrack dashboard preview"
                  className="rounded-xl"
                />
                <div className="absolute -bottom-4 -right-4 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 text-white shadow-lg">
                  📈 Confidence Score: 92%
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 px-4 py-2 text-sm font-semibold text-blue-700">
              ✨ What We Provide
            </div>
            <h2 className="mt-4 text-4xl font-bold text-gray-900 sm:text-4xl">
              Everything You Need to Master Coding
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              A comprehensive platform designed to optimize your learning journey
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* Feature Selection */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <button
                  key={feature.title}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`flex w-full items-center rounded-xl p-4 text-left transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 shadow-lg"
                      : "border border-gray-200 hover:border-blue-300 hover:shadow-md"
                  }`}
                >
                  <div className={`mr-4 rounded-lg bg-gradient-to-br ${feature.color} p-3 text-white`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">{feature.title}</h3>
                  </div>
                  <FaArrowRight className={`ml-2 transition-transform ${
                    activeIndex === index ? "text-blue-600" : "text-gray-400"
                  }`} />
                </button>
              ))}
            </div>

            {/* Feature Details */}
            <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-white p-8 shadow-xl">
              <div className={`inline-flex rounded-lg bg-gradient-to-r ${features[activeIndex].color} p-3 text-white mb-6`}>
                {features[activeIndex].icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-900">
                {features[activeIndex].title}
              </h3>
              <ul className="mt-6 space-y-4">
                {features[activeIndex].description.map((line, idx) => (
                  <li key={idx} className="flex items-start">
                    <FaCheckCircle className="mr-3 mt-1 flex-shrink-0 text-green-500" />
                    <span className="text-gray-700 text-lg">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center rounded-full bg-gradient-to-r from-orange-100 to-yellow-100 px-4 py-2 text-md font-semibold text-orange-700">
              📊 How It Helps Students
            </div>
            <h2 className="mt-4 text-4xl font-bold text-gray-900 sm:text-4xl">
              The Difference is Clear
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* Without Platform */}
            <div className="rounded-2xl border-2 border-red-100 bg-white p-8 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
                  ❌ Without Our Platform
                </div>
                <div className="text-4xl">😔</div>
              </div>
              <ul className="mt-6 space-y-4">
                {[
                  "Solved problems get forgotten over time",
                  "No clear visibility on weak areas",
                  "Random, ineffective revision schedules",
                  "Overconfidence from watching solutions",
                  "Scattered notes across multiple platforms",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center text-lg text-gray-600">
                    <div className="mr-3 h-2 w-2 rounded-full bg-red-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* With Platform */}
            <div className="rounded-2xl border-2 border-green-100 bg-white p-8 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                  ✅ With Our Platform
                </div>
                <div className="text-4xl">🚀</div>
              </div>
              <ul className="mt-6 space-y-4">
                {[
                  "Every solved problem is systematically tracked",
                  "Clear confidence levels for each question",
                  "Data-driven revision reminders",
                  "Accurate self-assessment of understanding",
                  "All data centralized in one dashboard",
                ].map((item, idx) => (
                  <li key={idx} className="flex text-lg items-center text-gray-600">
                    <div className="mr-3 h-2 w-2 rounded-full bg-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="about" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 text-md font-semibold text-purple-700">
              🔄 How It Works
            </div>
            <h2 className="mt-4 text-4xl font-bold text-gray-900 sm:text-4xl">
              Simple 3-Step Process
            </h2>
          </div>

          <div className="relative mt-16">
            {/* Connecting Line */}
            <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-blue-400 via-purple-400 to-green-400 md:block" />
            
            {/* Steps */}
            <div className="space-y-16 md:space-y-0">
              {[
                {
                  icon: <img src={icon1} alt="Solve anywhere" className="h-16 w-16" />,
                  title: "Solve Anywhere",
                  description: "Solve coding problems on any platform you prefer - LeetCode, Codeforces, CodeChef, or any other.",
                  step: "01",
                },
                {
                  icon: <img src={icon2} alt="Add to dashboard" className="h-16 w-16" />,
                  title: "Add & Analyze",
                  description: "Add the question to your dashboard, mark your solving approach, and get instant confidence analysis.",
                  step: "02",
                  reverse: true,
                },
                {
                  icon: <img src={icon3} alt="Revise smartly" className="h-16 w-16" />,
                  title: "Revise Smartly",
                  description: "Receive intelligent reminders based on your confidence score to revise before you forget.",
                  step: "03",
                },
              ].map((step, idx) => (
                <div
                  key={step.title}
                  className={`relative flex flex-col items-center md:flex-row ${
                    step.reverse ? "md:flex-row-reverse" : ""
                  } ${idx !== 2 ? "md:mb-32" : ""}`}
                >
                  <div className={`md:w-1/2 ${step.reverse ? "md:pl-16" : "md:pr-16"}`}>
                    <div className="text-center md:text-left">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-lg font-bold text-white md:ml-24">
                        {step.step}
                      </div>
                      <h3 className="mt-4 text-2xl font-bold text-gray-900 md:ml-24">{step.title}</h3>
                      <p className="mt-2 text-gray-600 text-lg md:w-[72%] md:ml-24">{step.description}</p>
                    </div>
                  </div>
                  <div className="mt-8 md:absolute md:left-1/2 md:top-1/2 md:mt-0 md:-translate-x-1/2 md:-translate-y-1/2">
                    <div className="relative rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl">
                      {step.icon}
                      <div className="absolute -top-3 -right-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 p-2">
                        <FaStar className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-2 text-sm font-semibold text-indigo-700">
              👥 Meet The Team
            </div>
            <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Built by Students, for Students
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Passionate developers creating tools to help fellow learners
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-transform hover:scale-[1.02]"
              >
                <div className="flex items-center">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="h-20 w-20 rounded-full border-4 border-white shadow-lg"
                  />
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-blue-600">{member.role}</p>
                    <div className="mt-3 flex space-x-4">
                      <a href={member.github} className="text-gray-400 hover:text-gray-900">
                        <FaGithub className="h-5 w-5" />
                      </a>
                      <a href={member.linkedin} className="text-gray-400 hover:text-blue-600">
                        <FaLinkedin className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
                <p className="mt-6 text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-white">
                Ready to Master Coding?
              </h2>
              <p className="mt-4 text-blue-100">
                Join thousands of developers who are already improving their skills
              </p>
              <Link
                to="/sign-in"
                className="mt-8 inline-flex items-center rounded-lg bg-white px-8 py-3 text-lg font-semibold text-blue-600 shadow-lg hover:bg-gray-100"
              >
                Start Your Free Journey
                <FaArrowRight className="ml-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;