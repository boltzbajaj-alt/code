import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import { CircleX, LayoutDashboard, LogOut, User, ChevronRight, Menu } from "lucide-react";
import Navbar from "./Navbar";

export default function Profile() {
    const navigate = useNavigate();
    const { user } = useUser();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(false);

    const codingSkills = {
        currentLevel: "Intermediate",
        primaryGoal: "Placement",
        placementType: "CP",
        languages: ["C++", "Java", "Python"]
    };

    const practicePreferences = {
        platforms: ["Leetcode", "GFG", "Codeforces", "Codechef","Hackerrank"],
        dailyGoal: 5,
        weeklyGoal: 35
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
                                        <p className="text-sm text-gray-500">Profile</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                    className=" rounded-lg p-2 hover:bg-gray-100 lg:hidden"
                                >
                                    <CircleX size={20} className="text-gray-600" />
                                </button>
                            </div>

                            {/* Sidebar Menu */}
                            <nav className="flex-1 space-y-1 p-4">
                                <button onClick={() => navigate("/")} className="flex w-full items-center gap-3 rounded-lg  px-4 py-3 text-left transition-all hover:from-blue-100 hover:to-blue-200">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-200 ">
                                        <LayoutDashboard size={18} className="text-gray-600" />
                                    </div>
                                    <span className="font-medium text-gray-700">Dashboard</span>
                                </button>
                                <button onClick={() => navigate("/profile")} className="flex w-full items-center gap-3 rounded-lg px-4 bg-gradient-to-r from-blue-50 to-blue-100 py-3 text-left font-medium text-gray-700 transition-all hover:bg-gray-100">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
                                        <User size={18} className="text-white" />
                                    </div>
                                    <span className="font-semibold text-blue-700">Profile</span>
                                </button>
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

                    <main className="flex-1 p-4 md:p-6 lg:p-8">
                        <div className="flex items-center justify-between border-b border-gray-200 bg-white p-4 lg:hidden">
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="rounded-lg p-2 hover:bg-gray-100"
                            >
                                <Menu size={24} className="text-gray-700" />
                            </button>
                        </div>
                        <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">Profile</h2>
                        {/* Profile Header Card */}
                        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
                            <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                                {/* Profile Image */}
                                <div className="flex-shrink-0">
                                    <img src={user?.imageUrl} alt="Profile" className="h-26 w-26 rounded-full" />
                                </div>

                                {/* Profile Info */}
                                <div className="flex-1 text-center sm:text-left">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {user?.fullName || "Kumar Piyush"}
                                    </h2>
                                    <div className="mt-2 space-y-2">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                            <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                                                @{user?.username || "kumar_piyush_24"}
                                            </span>
                                            <span className="text-gray-600">•</span>
                                            <span className="text-gray-700">
                                                {user?.primaryEmailAddress?.emailAddress || "kumarpiyushxd@gmail.com"}
                                            </span>
                                        </div>
                                        <p className="text-gray-600">Developer • Problem Solver • Tech Enthusiast</p>
                                    </div>
                                </div>

                                {/* Edit Button */}
                                <button className="rounded-xl border border-blue-600 bg-white px-6 py-2 font-medium text-blue-600 transition-colors hover:bg-blue-50">
                                    Edit Profile
                                </button>
                            </div>
                        </div>

                        <div className="grid gap-8 lg:grid-cols-2">
                            {/* Left Column - Coding Skills */}
                            <div className="space-y-6">
                                {/* Coding Skills Card */}
                                <div className="rounded-2xl bg-white p-6 shadow-sm">
                                    <h3 className="mb-6 text-2xl font-bold text-gray-900 border-b pb-3">
                                        Coding Skills
                                    </h3>

                                    <div className="space-y-6">
                                        {/* Current Level */}
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-500 mb-3">Current Level</h4>
                                            <div className="rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 p-4">
                                                <span className="text-lg font-bold text-blue-700">{codingSkills.currentLevel}</span>
                                            </div>
                                        </div>

                                        {/* Primary Goal */}
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-500 mb-3">Primary Goal</h4>
                                            <div className="space-y-2 flex gap-6 items-center">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                        <span className="text-blue-600 font-semibold">✓</span>
                                                    </div>
                                                    <span className="font-medium text-gray-900">{codingSkills.primaryGoal}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                                        <span className="text-green-600 font-semibold">•</span>
                                                    </div>
                                                    <span className="font-medium text-gray-900">{codingSkills.placementType}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Preferred Languages */}
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-500 mb-3">Preferred Coding Languages</h4>
                                            <div className="space-y-2">
                                                {codingSkills.languages.map((language, index) => (
                                                    <div key={index} className="flex items-center gap-3">
                                                        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                                                            <span className="text-purple-600 font-semibold">#</span>
                                                        </div>
                                                        <span className="font-medium text-gray-900">{language}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Practice Preferences & Email */}
                            <div className="space-y-6">
                                {/* Practice Preferences Card */}
                                <div className="rounded-2xl bg-white p-6 shadow-sm">
                                    <h3 className="mb-6 text-2xl font-bold text-gray-900 border-b pb-3">
                                        Practice Preferences
                                    </h3>

                                    <div className="space-y-6">
                                        {/* Target Platforms */}
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-500 mb-3">Target Platform</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {practicePreferences.platforms.map((platform, index) => (
                                                    <div key={index} className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2">
                                                        <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
                                                            <span className="text-xs font-bold text-white">✓</span>
                                                        </div>
                                                        <span className="font-medium text-gray-900">{platform}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Practice Goals */}
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-500 mb-3">Daily / Weekly Practice Goal</h4>
                                            <div className="space-y-4">
                                                <div className="rounded-lg bg-gradient-to-r from-green-50 to-green-100 p-4">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="text-sm text-gray-600">Questions per day</p>
                                                            <p className="text-2xl font-bold text-green-700">{practicePreferences.dailyGoal}</p>
                                                        </div>
                                                        <div className="h-10 w-10 rounded-full bg-green-200 flex items-center justify-center">
                                                            <span className="text-green-600 font-bold">D</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 p-4">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="text-sm text-gray-600">Questions per week</p>
                                                            <p className="text-2xl font-bold text-blue-700">{practicePreferences.weeklyGoal}</p>
                                                        </div>
                                                        <div className="h-10 w-10 rounded-full bg-blue-200 flex items-center justify-center">
                                                            <span className="text-blue-600 font-bold">W</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Email Notifications Card */}
                                <div className="rounded-2xl bg-white p-6 shadow-sm">
                                    <h3 className="mb-6 text-xl font-bold text-gray-900 border-b pb-3">
                                        Email Notification
                                    </h3>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-900">Receive email notifications</p>
                                            <p className="text-sm text-gray-500">Get updates on your progress and recommendations</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={emailNotifications}
                                                onChange={(e) => setEmailNotifications(e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>

                                    <div className="mt-6 rounded-lg bg-gray-50 p-4">
                                        <p className="text-sm text-gray-600">
                                            When enabled, you'll receive:
                                        </p>
                                        <ul className="mt-2 space-y-2 text-sm text-gray-600">
                                            <li className="flex items-center gap-2">
                                                <span className="h-4 w-4 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <span className="text-blue-600 text-xs">•</span>
                                                </span>
                                                Daily progress reports
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="h-4 w-4 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <span className="text-blue-600 text-xs">•</span>
                                                </span>
                                                Weekly practice reminders
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="h-4 w-4 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <span className="text-blue-600 text-xs">•</span>
                                                </span>
                                                Platform updates and tips
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Save Changes Button */}
                        <div className="mt-8 flex justify-end">
                            <button className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-3 font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-xl">
                                Save Changes
                            </button>
                        </div>
                    </main>
                </div>
            </div>
        </>

    )
}