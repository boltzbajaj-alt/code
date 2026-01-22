import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import axios from "axios";
import platforms from "../../data/platform";
import {
    CircleX,
    LayoutDashboard,
    Calendar,
    LogOut,
    User,
    ChevronRight,
    Menu,
    Pencil,
    Save,
    Code2,
    School,
    Target,
    Trophy,
    Clock,
    Mail,
    Globe,
    BookOpen,
    GraduationCap,
    MapPin,
    Building
} from "lucide-react";

export default function Profile() {
    const navigate = useNavigate();
    const { user, isLoaded } = useUser();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");
    const [profileData, setProfileData] = useState({
        email: "",
        image: "",
        username: "",
        salutation: "",
        degree: "",
        fieldOfStudy: "",
        yearOfGraduation: "",
        collegeName: "",
        country: "",
        currentLevel: "intermediate",
        primaryGoal: [],
        preferredCodingLanguage: [],
        targetPlatform: [],
        dailyPractice: "",
        emailNotification: false,
        socialLinks: {
            linkedin: "",
            github: "",
            twitter: "",
            insta: "",
        },
    });

    const levelOptions = ["beginner", "intermediate", "advanced"];
    const primaryGoalOptions = ["Placement", "DSA Mastery", "Competitive Programming", "Interview Prep"];
    const languageOptions = ["C++", "Java", "Python", "JavaScript", "C#", "Go", "Rust", "Swift"];
    const platformOptions = platforms.map((platform) => platform.name);
    const dailyPracticeOptions = ["1", "2", "3", "4", "5+"];
    const salutationOptions = [
        "Developer",
        "Software Developer",
        "Full Stack Developer",
        "Frontend Developer",
        "Backend Developer",
        "Student Developer",
        "Aspiring Developer",
    ];
    const degreeOptions = ["B.Tech", "M.Tech", "B.Sc", "M.Sc", "BCA", "MCA", "B.E", "M.E", "B.Com", "Other"];
    const currentYear = new Date().getFullYear();

    const yearOptions = Array.from(
      { length: 7 },
      (_, i) => (currentYear - 3 + i).toString()
    );
    
    const countryOptions = ["India", "United States", "Canada", "United Kingdom", "Australia", "Germany", "Other"];
    const collegeOptions = [
        "IIT Delhi",
        "IIT Bombay",
        "IIT Madras",
        "NIT Trichy",
        "BITS Pilani",
        "Stanford University",
        "MIT",
        "NSUT",
        "Harvard University",
        "Local College",
        "Other",
    ];

    useEffect(() => {
        if (!isLoaded || !user) return;

        const fetchProfile = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/user/${user.id}/profile`
                );
                if (response.data) {
                    setProfileData((prev) => ({
                        ...prev,
                        ...response.data,
                        socialLinks: {
                            ...prev.socialLinks,
                            ...(response.data.socialLinks || {}),
                        },
                    }));
                }
            } catch (err) {
                setError("Unable to load profile data.");
            }
        };

        fetchProfile();
    }, [isLoaded, user]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProfileData((prev) => ({ ...prev, [name]: value }));
    };

    const handleArrayToggle = (field, value) => {
        setProfileData((prev) => {
            const current = prev[field] || [];
            return {
                ...prev,
                [field]: current.includes(value)
                    ? current.filter((item) => item !== value)
                    : [...current, value],
            };
        });
    };

    const handleSocialChange = (event) => {
        const { name, value } = event.target;
        setProfileData((prev) => ({
            ...prev,
            socialLinks: {
                ...prev.socialLinks,
                [name]: value,
            },
        }));
    };

    const handleSave = async () => {
        if (!user) return;
        setIsSaving(true);
        setError("");

        try {
            await axios.put(`http://localhost:5000/api/user/${user.id}/profile`, {
                username: profileData.username,
                salutation: profileData.salutation,
                degree: profileData.degree,
                fieldOfStudy: profileData.fieldOfStudy,
                yearOfGraduation: Number(profileData.yearOfGraduation),
                collegeName: profileData.collegeName,
                country: profileData.country,
                currentLevel: profileData.currentLevel,
                primaryGoal: profileData.primaryGoal,
                preferredCodingLanguage: profileData.preferredCodingLanguage,
                targetPlatform: profileData.targetPlatform,
                dailyPractice: profileData.dailyPractice,
                emailNotification: profileData.emailNotification,
                socialLinks: profileData.socialLinks,
            });
            setIsEditing(false);
        } catch (err) {
            setError(err?.response?.data?.error || "Unable to save profile.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
            {/* Simple Top Navigation for Mobile */}
            <div className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm lg:hidden">
                <div className="flex items-center justify-between p-4">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="rounded-lg p-2 hover:bg-gray-100"
                    >
                        <Menu size={24} className="text-gray-700" />
                    </button>
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="CodeTrack" className="h-8 w-8" />
                        <span className="font-bold text-gray-900">CodeTrack</span>
                    </div>
                    <UserButton />
                </div>
            </div>

            <div className="flex">
                {/* Sidebar - Simpler Design */}
                <aside
                    className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-gray-200 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    <div className="flex h-full flex-col p-4">
                        {/* Logo */}
                        <div className="mb-8 flex items-center gap-3 px-2">
                            <img src="/logo.png" alt="CodeTrack" className="h-10 w-10" />
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">CodeTrack</h1>
                                <p className="text-xs text-gray-500">by students, for students</p>
                            </div>
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="ml-auto rounded-lg p-1 hover:bg-gray-100 lg:hidden"
                            >
                                <CircleX size={18} className="text-gray-600" />
                            </button>
                        </div>

                        {/* Navigation */}
                        <nav className="space-y-2">
                            <button
                                onClick={() => navigate("/")}
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-gray-100"
                            >
                                <LayoutDashboard size={20} className="text-gray-600" />
                                <span className="font-medium text-gray-700">Dashboard</span>
                            </button>
                            <button
                                onClick={() => navigate("/profile")}
                                className="flex w-full items-center gap-3 rounded-lg bg-blue-50 px-3 py-2.5 text-left font-medium text-blue-700"
                            >
                                <User size={20} className="text-blue-600" />
                                <span>Profile</span>
                            </button>
                        </nav>

                        {/* User Info */}
                        <div className="mt-auto border-t border-gray-200 pt-4">
                            <div className="rounded-lg border border-gray-200 p-3">
                                <div className="flex items-center gap-3">
                                    <UserButton />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">
                                            {profileData.username || "Coder"}
                                        </p>
                                        <p className="text-xs text-gray-500">Free Plan</p>
                                    </div>
                                </div>
                                <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    <LogOut size={16} />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Overlay for mobile */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 z-30 bg-black/20 lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Main Content */}
                <main className="flex-1 p-4 md:p-6 lg:p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">My Profile</h1>
                                <p className="mt-1 text-gray-600">Customize your learning journey</p>
                            </div>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-50"
                            >
                                <Pencil size={18} />
                                {isEditing ? "Cancel Editing" : "Edit Profile"}
                            </button>
                        </div>

                        {error && (
                            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Profile Card */}
                    <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex flex-col items-center gap-6 md:flex-row">
                            {/* Profile Image */}
                            <div className="relative">
                                <img
                                    src={profileData.image || user?.imageUrl || "/logo.png"}
                                    alt="Profile"
                                    className="h-32 w-32 rounded-full border-4 border-white shadow-lg"
                                />
                                {isEditing && (
                                    <button className="absolute bottom-0 right-0 rounded-full bg-blue-500 p-2 text-white shadow-lg">
                                        <Pencil size={16} />
                                    </button>
                                )}
                            </div>

                            {/* Profile Info */}
                            <div className="flex-1 text-center md:text-left">
                                <div className="mb-3">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {user?.fullName || "Student Coder"}
                                    </h2>
                                    <div className="mt-2 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                                        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                                            @{profileData.username || "coder123"}
                                        </span>
                                        <span className="text-gray-400">•</span>
                                        <span className="text-gray-600">
                                            {profileData.email || user?.primaryEmailAddress?.emailAddress || "student@email.com"}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-gray-700">
                                    <GraduationCap size={16} className="mr-2 inline" />
                                    {profileData.salutation || "Aspiring Developer"}
                                </p>
                                <p className="mt-2 text-sm text-gray-500">
                                    <Building size={16} className="mr-2 inline" />
                                    {profileData.collegeName || "Student"}
                                </p>
                            </div>

                            {/* Save Button */}
                            {isEditing && (
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-70"
                                >
                                    <Save size={18} />
                                    {isSaving ? "Saving..." : "Save Changes"}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Grid Sections */}
                    <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
                        {/* Coding Skills */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6">
                            <div className="mb-6 flex items-center gap-3 border-b pb-3">
                                <div className="rounded-lg bg-blue-100 p-2">
                                    <Code2 size={20} className="text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Coding Skills</h3>
                            </div>

                            <div className="space-y-6">
                                {/* Current Level */}
                                <div>
                                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <Trophy size={16} />
                                        Current Level
                                    </label>
                                    {isEditing ? (
                                        <select
                                            name="currentLevel"
                                            value={profileData.currentLevel}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm"
                                        >
                                            {levelOptions.map((option) => (
                                                <option key={option} value={option}>
                                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <div className={`rounded-lg bg-blue-600 p-4`}>
                                            <span className="text-lg font-bold text-white">
                                                {profileData.currentLevel.charAt(0).toUpperCase() + profileData.currentLevel.slice(1)}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Primary Goal */}
                                <div>
                                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <Target size={16} />
                                        Primary Goal
                                    </label>
                                    {isEditing ? (
                                        <div className="flex flex-wrap gap-2">
                                            {primaryGoalOptions.map((option) => (
                                                <button
                                                    key={option}
                                                    onClick={() => handleArrayToggle("primaryGoal", option)}
                                                    className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${profileData.primaryGoal.includes(option)
                                                        ? "bg-blue-100 text-blue-700 border border-blue-200"
                                                        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                                                        }`}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-wrap gap-2">
                                            {profileData.primaryGoal.map((goal) => (
                                                <span
                                                    key={goal}
                                                    className="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700"
                                                >
                                                    {goal}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Languages */}
                                <div>
                                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <Code2 size={16} />
                                        Preferred Languages
                                    </label>
                                    {isEditing ? (
                                        <div className="flex flex-wrap gap-2">
                                            {languageOptions.map((lang) => (
                                                <button
                                                    key={lang}
                                                    onClick={() => handleArrayToggle("preferredCodingLanguage", lang)}
                                                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${profileData.preferredCodingLanguage.includes(lang)
                                                        ? "bg-blue-100 text-blue-700 border border-purple-200"
                                                        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                                                        }`}
                                                >
                                                    {lang}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-wrap gap-2">
                                            {profileData.preferredCodingLanguage.map((lang) => (
                                                <span
                                                    key={lang}
                                                    className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700"
                                                >
                                                    {lang}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Practice & Goals */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6">
                            <div className="mb-6 flex items-center gap-3 border-b pb-3">
                                <div className="rounded-lg bg-blue-100 p-2">
                                    <BookOpen size={20} className="text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Practice Goals</h3>
                            </div>

                            <div className="space-y-6">
                                {/* Platforms */}
                                <div>
                                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <Target size={16} />
                                        Target Platforms
                                    </label>
                                    {isEditing ? (
                                        <div className="flex flex-wrap gap-2">
                                            {platformOptions.slice(0, 6).map((platform) => (
                                                <button
                                                    key={platform}
                                                    onClick={() => handleArrayToggle("targetPlatform", platform)}
                                                    className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${profileData.targetPlatform.includes(platform)
                                                        ? "bg-blue-100 text-blue-700 "
                                                        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                                                        }`}
                                                >
                                                    {platform}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-wrap gap-3">
                                            {platforms
                                                .filter(p => profileData.targetPlatform.includes(p.name))
                                                .map((platform) => (
                                                    <div
                                                        key={platform.name}
                                                        className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5"
                                                    >
                                                        <img src={platform.image} alt={platform.name} className="h-5 w-5" />
                                                        <span className="text-sm font-medium">{platform.name}</span>
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                </div>

                                {/* Daily Practice */}
                                <div>
                                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <Clock size={16} />
                                        Daily Goal
                                    </label>
                                    {isEditing ? (
                                        <div className="flex gap-2">
                                            {dailyPracticeOptions.map((hours) => (
                                                <button
                                                    key={hours}
                                                    onClick={() => setProfileData(prev => ({ ...prev, dailyPractice: hours }))}
                                                    className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-colors ${profileData.dailyPractice === hours
                                                        ? "border border-blue-600 bg-blue-50 text-black"
                                                        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                                                        }`}
                                                >
                                                    {hours} {hours === "5+" ? "hours+" : "hour" + (hours === "1" ? "" : "s")}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="rounded-lg p-4">
                                            <p className="text-3xl font-bold ">
                                                {profileData.dailyPractice || "0"} hour{profileData.dailyPractice !== "1" ? "s" : ""}
                                            </p>
                                            <p className="text-sm text-blue-600">Daily practice target</p>
                                        </div>
                                    )}
                                </div>

                                {/* Notifications */}
                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Mail size={20} className="text-gray-600" />
                                            <div>
                                                <p className="font-medium text-gray-900">Email Notifications</p>
                                                <p className="text-sm text-gray-500">Get study reminders</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex cursor-pointer items-center">
                                            <input
                                                type="checkbox"
                                                checked={profileData.emailNotification}
                                                onChange={(e) => setProfileData(prev => ({
                                                    ...prev,
                                                    emailNotification: e.target.checked
                                                }))}
                                                className="sr-only"
                                                disabled={!isEditing}
                                            />
                                            <div className={`h-6 w-11 rounded-full ${profileData.emailNotification ? 'bg-blue-500' : 'bg-gray-300'}`}>
                                                <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${profileData.emailNotification ? 'translate-x-6' : 'translate-x-0.5'}`} />
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Academic Details */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 md:col-span-2">
                            <div className="mb-6 flex items-center gap-3 border-b pb-3">
                                <div className="rounded-lg bg-blue-100 p-2">
                                    <School size={20} className="text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Academic Details</h3>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                {[
                                    { label: "Degree", icon: GraduationCap, name: "degree", options: degreeOptions },
                                    { label: "Field of Study", icon: BookOpen, name: "fieldOfStudy", type: "text" },
                                    { label: "Graduation Year", icon: Calendar, name: "yearOfGraduation", options: yearOptions },
                                    { label: "College", icon: Building, name: "collegeName", options: collegeOptions },
                                    { label: "Country", icon: MapPin, name: "country", options: countryOptions, colSpan: "md:col-span-2" },
                                    { label: "Salutation", icon: User, name: "salutation", options: salutationOptions },
                                ].map((field) => (
                                    <div key={field.name} className={field.colSpan || ""}>
                                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                                            <field.icon size={16} />
                                            {field.label}
                                        </label>
                                        {isEditing ? (
                                            field.options ? (
                                                <select
                                                    name={field.name}
                                                    value={profileData[field.name]}
                                                    onChange={handleChange}
                                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm"
                                                >
                                                    <option value="">Select {field.label}</option>
                                                    {field.options.map(option => (
                                                        <option key={option} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <input
                                                    type="text"
                                                    name={field.name}
                                                    value={profileData[field.name]}
                                                    onChange={handleChange}
                                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                                                    placeholder={`Enter ${field.label}`}
                                                />
                                            )
                                        ) : (
                                            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5">
                                                <p className="font-medium text-gray-900">
                                                    {profileData[field.name] || `No ${field.label}`}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 md:col-span-2">
                            <div className="mb-6 flex items-center gap-3 border-b pb-3">
                                <div className="rounded-lg bg-blue-100 p-2">
                                    <Globe size={20} className="text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Social Links</h3>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                {[
                                    { name: "github", label: "GitHub", icon: "https://cdn-icons-png.flaticon.com/256/25/25231.png", color: "bg-gray-900 text-white" },
                                    { name: "linkedin", label: "LinkedIn", icon: "https://openvisualfx.com/wp-content/uploads/2019/10/linkedin-icon-logo-png-transparent.png", color: "bg-blue-600 text-white" },
                                    { name: "twitter", label: "Twitter", icon: "https://img.freepik.com/premium-vector/instagram-vector-logo-icon-social-media-logotype_901408-392.jpg?semt=ais_hybrid&w=740&q=80", color: "bg-sky-500 text-white" },
                                    { name: "insta", label: "Instagram", icon: "https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?semt=ais_hybrid&w=740&q=80", color: "bg-pink-500 text-white" },
                                ].map((social) => (
                                    <div key={social.name}>
                                        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                                            <img src={social.icon} alt={social.label} className="h-5 w-5" />
                                            {social.label}
                                        </label>
                                        {isEditing ? (
                                            <input
                                                name={social.name}
                                                value={profileData.socialLinks?.[social.name] || ""}
                                                onChange={handleSocialChange}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                                                placeholder={`${social.label} username`}
                                            />
                                        ) : (
                                            <div>
                                                {profileData.socialLinks?.[social.name] ? (
                                                    <a
                                                        href={profileData.socialLinks[social.name]}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium ${social.color} hover:opacity-90`}
                                                    >
                                                        View {social.label}
                                                    </a>
                                                ) : (
                                                    <div className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5">
                                                        <p className="text-sm text-gray-500">Not connected</p>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    
                </main>
            </div>
        </div>
    );
}