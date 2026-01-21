import { UserButton, useUser } from "@clerk/clerk-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Menu, LogOut, User,CircleX , LayoutDashboard, Search, Plus, Star, ChevronRight, BarChart3, Target } from "lucide-react";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const synced = useRef(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded || !user || synced.current) return;
    synced.current = true;
    axios.post("http://localhost:5000/api/user/sync", {
      clerkUserId: user.id,
      email: user.primaryEmailAddress.emailAddress,
      username: user.username || user.firstName,
      image: user.imageUrl,
    });
  }, [isLoaded, user]);

  // Static data
  const stats = {
    totalQuestions: 150,
    highConfidence: 40,
    lowConfidence: 20,
  };

  const questions = [
    { id: 1, name: "Two Sum", stars: 5, difficulty: "Easy" },
    { id: 2, name: "Maximal Rectangle", stars: 2, difficulty: "Hard" },
    { id: 3, name: "Climbing Stairs", stars: 4, difficulty: "Easy" },
    { id: 4, name: "Binary Tree Traversal", stars: 3, difficulty: "Medium" },
    { id: 5, name: "Longest Substring", stars: 5, difficulty: "Medium" },
  ];

  const renderStars = (count) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={14}
            className={index < count ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex">
          {/* Sidebar */}
          <aside
            className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-gray-200 bg-white shadow-xl transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`}
          >
            <div className="flex h-full flex-col">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between border-b border-gray-100 p-6">
                <div className="flex items-center gap-3">
                  <img src="/logo.png" alt="CodeTrack logo" className="h-10 w-12" />
                  <div>
                    <h1 className="lg:text-2xl text-xl font-bold text-gray-900">CodeTrack</h1>
                    <p className="text-sm text-gray-500">Dashboard</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className=" rounded-lg p-2 hover:bg-gray-100 lg:hidden"
                >
                  <CircleX  size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Sidebar Menu */}
              <nav className="flex-1 space-y-1 p-4">
                <button onClick={() => navigate("/")} className="flex w-full items-center gap-3 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-3 text-left transition-all hover:from-blue-100 hover:to-blue-200">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
                    <LayoutDashboard size={18} className="text-white" />
                  </div>
                  <span className="font-semibold text-blue-700">Dashboard</span>
                </button>
                <Link
                  to="/profile"
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-medium text-gray-700 transition-all hover:bg-gray-100"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-200">
                    <User size={18} className="text-gray-600" />
                  </div>
                  <span className="font-medium text-gray-700">Profile</span>
                </Link>
              </nav>

              {/* Divider */}
              <div>
                <div className="p-4">
                  <div className="rounded-lg bg-gray-50 p-3">
                    <div className="flex items-center gap-3">
                      <UserButton />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {user?.firstName || "User"}
                        </p>
                        <p className="text-xs text-gray-500">Free Plan</p>
                      </div>
                      <ChevronRight size={16} className="text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <div className="border-t border-gray-200 px-4 py-2">
                <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-medium text-gray-700 transition-all hover:bg-red-50 hover:text-red-600">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                    <LogOut size={18} className="text-gray-600 group-hover:text-red-600" />
                  </div>
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Overlay for mobile */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 z-40  bg-opacity-50 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <main className="flex-1">
            {/* Mobile Header */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-white p-4 lg:hidden">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <Menu size={24} className="text-gray-700" />
              </button>
            </div>

            <div className="p-4 sm:p-6 lg:p-8">
              {/* Stats Section */}
              <div className="mb-8">
                <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">Dashboard</h2>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Total Questions Card */}
                  <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-6 shadow-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="mb-2 text-sm font-medium text-blue-100">
                          Total Questions Tracked
                        </h3>
                        <div className="mb-4 flex items-baseline gap-2">
                          <span className="text-4xl font-bold text-white sm:text-5xl">∑</span>
                          <span className="text-4xl font-bold text-white sm:text-5xl">
                            {stats.totalQuestions}
                          </span>
                        </div>
                      </div>
                      <div className="rounded-lg bg-white/20 p-2">
                        <BarChart3 size={24} className="text-white" />
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-blue-100">
                      <span className="font-medium">+12%</span> from last month
                    </div>
                  </div>

                  {/* High Confidence Card */}
                  <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-6 shadow-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="mb-2 text-sm font-medium text-emerald-100">
                          High Confidence Questions
                        </h3>
                        <p className="text-4xl font-bold text-white sm:text-5xl">
                          {stats.highConfidence}
                        </p>
                      </div>
                      <div className="rounded-lg bg-white/20 p-2">
                        <Target size={24} className="text-white" />
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-emerald-100">
                      <span className="font-medium">+8%</span> mastery improvement
                    </div>
                  </div>

                  {/* Low Confidence Card */}
                  <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 p-6 shadow-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="mb-2 text-sm font-medium text-amber-100">
                          Low Confidence Questions
                        </h3>
                        <p className="text-4xl font-bold text-white sm:text-5xl">
                          {stats.lowConfidence}
                        </p>
                      </div>
                      <div className="rounded-lg bg-white/20 p-2">
                        <Target size={24} className="text-white" />
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-amber-100">
                      Needs review
                    </div>
                  </div>
                </div>
              </div>

              {/* Search and Add Section */}
              <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative flex-1">
                    <Search
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="text"
                      placeholder="Search questions..."
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                  <button className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-xl">
                    <Plus size={20} />
                    Add Question
                  </button>
                </div>
              </div>

              {/* Questions List Section */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">Quiz Options</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="hidden sm:inline">Sorted by:</span>
                    <select className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1 text-sm focus:outline-none">
                      <option>Difficulty</option>
                      <option>Recent</option>
                      <option>Rating</option>
                    </select>
                  </div>
                </div>

                <div className="">
                  {questions.map((question) => (
                    <div
                      key={question.id}
                      className={`rounded-xl border border-gray-200 p-5 transition-all hover:border-blue-200 hover:shadow-md ${question.id % 2 === 0 ? "bg-[#344367]" : "bg-[#0F172A]"}`}
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        {/* Question Info */}
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-3">
                            <span className="font-mono text-sm font-medium text-gray-400">
                              {question.id.toString()}
                            </span>
                            <h4 className="text-lg font-semibold text-white text-gray-900">
                              {question.name}
                            </h4>
                          </div>
                          <div className="flex flex-wrap items-center gap-4">
                            <span
                              className={`rounded-full px-3 py-1 text-sm font-medium ${question.difficulty === "Easy"
                                  ? "bg-green-100 text-green-800"
                                  : question.difficulty === "Hard"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                            >
                              {question.difficulty}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                          {renderStars(question.stars)}
                          <button className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100">
                            Review
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* View All Button */}
                <div className="mt-6 flex justify-center">
                  <button className="rounded-xl border border-gray-200 bg-gray-50 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-100">
                    View All Questions
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}