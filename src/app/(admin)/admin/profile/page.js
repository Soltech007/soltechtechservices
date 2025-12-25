"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import toast, { Toaster } from "react-hot-toast";
import {
  User,
  Mail,
  Shield,
  Camera,
  KeyRound,
  Save,
  Activity,
  Clock,
  Smartphone,
  Globe,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profile, setProfile] = useState({
    full_name: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          setUser(user);
          setProfile({
            full_name: user.user_metadata?.full_name || "Admin User",
          });
        }
      } catch (error) {
        toast.error("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { data, error } = await supabase.auth.updateUser({
        data: { full_name: profile.full_name },
      });

      if (error) throw error;

      setUser(data.user);
      toast.success("Profile updated successfully! ✨", {
        style: {
          borderRadius: "12px",
          background: "#10b981",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error(error.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setSavingPassword(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password updated successfully! 🔐", {
        style: {
          borderRadius: "12px",
          background: "#10b981",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error(error.message || "Failed to update password.");
    } finally {
      setSavingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <Toaster position="top-center" />

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-4xl font-bold border-4 border-white/30">
            {user?.email?.[0]?.toUpperCase() || "A"}
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-1">
              {profile.full_name || "Admin User"}
            </h1>
            <p className="text-white/80 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {user?.email}
            </p>
            <div className="flex items-center gap-4 mt-3">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                Administrator
              </span>
              <span className="text-sm text-white/70">
                Member since {new Date(user?.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleProfileUpdate}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
          >
            <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Profile Information
                  </h2>
                  <p className="text-sm text-slate-500">
                    Update your personal details
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={profile.full_name}
                    onChange={(e) =>
                      setProfile({ ...profile, full_name: e.target.value })
                    }
                    className="
                      w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl
                      focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white
                      transition-all text-slate-900 placeholder:text-slate-400
                    "
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Email - Read Only */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="
                      w-full pl-12 pr-4 py-3 bg-slate-100 border-2 border-slate-200 rounded-xl
                      text-slate-600 cursor-not-allowed
                    "
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Email cannot be changed for security reasons
                </p>
              </div>

              {/* Account Info */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-500 mb-1">Account Type</p>
                  <p className="font-semibold text-slate-900">Administrator</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-500 mb-1">Last Updated</p>
                  <p className="font-semibold text-slate-900">
                    {new Date(
                      user?.updated_at || user?.created_at
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-200">
              <button
                type="submit"
                disabled={saving}
                className="
                  w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl
                  hover:from-indigo-600 hover:to-purple-700 font-medium
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-200 shadow-lg shadow-indigo-500/25
                  hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98]
                  flex items-center justify-center gap-2
                "
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Security Settings */}
        <div className="lg:col-span-1 space-y-6">
          {/* Password Update */}
          <form
            onSubmit={handlePasswordUpdate}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
          >
            <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Security</h2>
                  <p className="text-sm text-slate-500">Update password</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="
                      w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl
                      focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white
                      transition-all text-slate-900 placeholder:text-slate-400
                    "
                    placeholder="Enter new password"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="
                      w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl
                      focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white
                      transition-all text-slate-900 placeholder:text-slate-400
                    "
                    placeholder="Confirm password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={savingPassword}
                className="
                  w-full px-4 py-2.5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl
                  hover:from-red-600 hover:to-orange-600 font-medium text-sm
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-200 shadow-lg shadow-red-500/25
                  hover:shadow-xl hover:shadow-red-500/30 hover:scale-[1.02] active:scale-[0.98]
                  flex items-center justify-center gap-2
                "
              >
                {savingPassword ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Update Password</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-500" />
              Account Stats
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">Total Logins</span>
                <span className="font-semibold text-slate-900">127</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">Last Login</span>
                <span className="font-semibold text-slate-900">Today</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">Account Age</span>
                <span className="font-semibold text-slate-900">
                  {Math.floor(
                    (new Date() - new Date(user?.created_at)) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  days
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Recent Activity
              </h2>
              <p className="text-sm text-slate-500">
                Your account activity log
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {/* Activity Items */}
            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">Password Updated</p>
                <p className="text-sm text-slate-500 mt-0.5">
                  Security settings changed successfully
                </p>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" />2 hours ago • 192.168.1.1
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">Profile Updated</p>
                <p className="text-sm text-slate-500 mt-0.5">
                  Full name changed
                </p>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" />1 day ago • Chrome on Windows
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">New Device Login</p>
                <p className="text-sm text-slate-500 mt-0.5">
                  Logged in from iPhone
                </p>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" />3 days ago • Safari on iOS
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">
                  Login from New Location
                </p>
                <p className="text-sm text-slate-500 mt-0.5">Mumbai, India</p>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" />1 week ago • Firefox on MacOS
                </p>
              </div>
            </div>
          </div>

          {/* View More */}
          <div className="mt-6 text-center">
            <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
              View All Activity →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
