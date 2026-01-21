// App.jsx
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import SignInPage from "./components/SignIn";
import SignUpPage from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Landing from "./components/Landing";
import Contact from "./components/Contact";
import Profile from "./components/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/contact" element={<Contact />} />

        {/* Home Route - Landing when signed out, Dashboard when signed in */}
        <Route
          path="/"
          element={
            <>
              <SignedIn>
                <Dashboard />
              </SignedIn>
              <SignedOut>
                <Landing />
              </SignedOut>
            </>
          }
        />
        <Route path="/profile"
        element={
          <>
              <SignedIn>
                <Profile />
              </SignedIn>
            </>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;