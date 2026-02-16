import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  MapPinIcon,
  PencilIcon,
  CameraIcon,
  BellIcon,
  ShieldCheckIcon,
  DocumentArrowDownIcon,
  TrashIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const UserProfile = () => {
  const { user, updateUserProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // File input refs
  const profileInputRef = React.useRef(null);
  const coverInputRef = React.useRef(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    location: '',
    bio: 'Tell us about yourself...',
    organization: '',
    role: 'Student',
    profilePhoto: null,
    coverPhoto: null
  });

  // Sync with auth user data
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        bio: user.bio || 'Tell us about yourself...',
        dateOfBirth: user.dateOfBirth || '',
        organization: user.organization || '',
        role: user.role || 'Student',
        profilePhoto: user.profilePhoto || null,
        coverPhoto: user.coverPhoto || null
      }));
    }
  }, [user]);

  const userAchievements = user?.achievements || [];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File is too large. Please select an image under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        // Create an image to compress it if needed
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Compress to 70% quality JPEG Base64
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);

          setFormData(prev => ({
            ...prev,
            [type]: compressedBase64
          }));
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const result = await updateUserProfile(formData);
    if (result.success) {
      setIsEditing(false);
      alert('Profile updated and saved successfully!');
    } else {
      alert(`Failed to save profile: ${result.message}`);
    }
  };

  const handleAction = async (action) => {
    switch (action) {
      case 'Privacy Settings':
        alert('Your profile privacy is currently set to Private. Only you can see your learning progress.');
        break;

      case 'Notifications':
        setNotificationsEnabled(!notificationsEnabled);
        alert(`Notifications ${!notificationsEnabled ? 'Enabled' : 'Disabled'}!`);
        break;

      case 'Data Download':
        try {
          const exportData = {
            profile: {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              location: user.location,
              bio: user.bio,
              joined: user.createdAt
            },
            stats: {
              modulesCompleted: user.modulesCompleted,
              totalHours: user.totalHours,
              currentStreak: user.currentStreak,
              totalPoints: user.totalPoints,
              overallProgress: user.overallProgress
            },
            learningProgress: user.moduleProgress || []
          };

          const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `DRiVE_Learning_Data_${user.firstName}_${new Date().toISOString().split('T')[0]}.json`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        } catch (error) {
          alert('Failed to generate data download. Please try again.');
        }
        break;

      case 'Delete Account':
        const confirmDelete = window.confirm(
          'ARE YOU SURE? This will permanently delete your DRiVE account, all your progress, and earned certificates. This action cannot be undone.'
        );
        if (confirmDelete) {
          // In a real app, we'd call a backend delete endpoint
          alert('Account deletion request received. You will be logged out now.');
          logout();
        }
        break;

      default:
        alert(`${action} functionality coming soon!`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={profileInputRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => handleFileChange(e, 'profilePhoto')}
      />
      <input
        type="file"
        ref={coverInputRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => handleFileChange(e, 'coverPhoto')}
      />

      {/* Page Title */}
      <div className="mb-8 font-inter">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600">Manage your account information and preferences</p>
      </div>

      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        {/* Cover Photo */}
        <div
          className="h-40 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden"
          style={formData.coverPhoto ? { backgroundImage: `url(${formData.coverPhoto})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
        >
          <button
            onClick={() => coverInputRef.current?.click()}
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white p-2 rounded-xl hover:bg-white/30 transition-all z-10"
          >
            <CameraIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Info */}
        <div className="relative px-8 pb-8">
          <div className="flex items-end justify-between -mt-16 mb-6">
            <div className="relative">
              <div className="w-32 h-32 bg-white rounded-3xl p-1 shadow-2xl">
                <div
                  className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[1.25rem] flex items-center justify-center text-white text-4xl font-bold overflow-hidden"
                  style={formData.profilePhoto ? { backgroundImage: `url(${formData.profilePhoto})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                >
                  {!formData.profilePhoto && (formData.firstName?.charAt(0) || <UserCircleIcon className="w-16 h-16" />)}
                </div>
              </div>
              <button
                onClick={() => profileInputRef.current?.click()}
                className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-xl shadow-lg hover:bg-blue-700 transition-all transform hover:scale-110 z-20"
              >
                <CameraIcon className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white border border-gray-200 text-gray-700 px-6 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center shadow-sm"
            >
              <PencilIcon className="w-4 h-4 mr-2 text-blue-600" />
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
          </div>

          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-1">
              {formData.firstName} {formData.lastName}
            </h2>
            <p className="text-gray-500 font-medium mb-4">DRiVE Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '2024'}</p>
            <p className="text-gray-600 leading-relaxed mb-8 bg-gray-50 p-4 rounded-2xl border border-gray-100 italic">
              "{formData.bio}"
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
              <div className="flex items-center p-3 bg-white border border-gray-50 rounded-2xl shadow-sm">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mr-3">
                  <EnvelopeIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Email</p>
                  <p className="font-semibold text-gray-900 truncate">{formData.email}</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-white border border-gray-50 rounded-2xl shadow-sm">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mr-3">
                  <PhoneIcon className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Phone</p>
                  <p className="font-semibold text-gray-900">{formData.phone || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-white border border-gray-50 rounded-2xl shadow-sm">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center mr-3">
                  <MapPinIcon className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Location</p>
                  <p className="font-semibold text-gray-900">{formData.location || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-white border border-gray-50 rounded-2xl shadow-sm">
                <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center mr-3">
                  <CalendarIcon className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Born</p>
                  <p className="font-semibold text-gray-900">{formData.dateOfBirth ? new Date(formData.dateOfBirth).getFullYear() : 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Insights Section - Full Width for better balance */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 border-b border-gray-50 pb-4">Learning Insights</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="relative group overflow-hidden p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl text-white shadow-lg shadow-blue-500/10">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
            <div className="relative z-10 text-center">
              <div className="text-5xl font-black mb-1">{user?.modulesCompleted || 0}</div>
              <div className="text-blue-100 text-[10px] font-black uppercase tracking-[0.2em]">Modules Completed</div>
            </div>
          </div>

          <div className="relative group overflow-hidden p-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl text-white shadow-lg shadow-emerald-500/10">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
            <div className="relative z-10 text-center">
              <div className="text-5xl font-black mb-1">{user?.totalHours || 0}h</div>
              <div className="text-emerald-100 text-[10px] font-black uppercase tracking-[0.2em]">Hours Invested</div>
            </div>
          </div>

          <div className="relative group overflow-hidden p-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl text-white shadow-lg shadow-orange-500/10">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
            <div className="relative z-10 text-center">
              <div className="text-5xl font-black mb-1">{user?.currentStreak || 0}</div>
              <div className="text-orange-100 text-[10px] font-black uppercase tracking-[0.2em]">Day Streak</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Forms & Settings */}
        <div className="lg:col-span-8 space-y-8">
          {/* Edit Form */}
          {isEditing && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 transform transition-all duration-300 scale-100 opacity-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 border-b border-gray-50 pb-4">Personal Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm font-medium"
                    placeholder="+91 00000 00000"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm font-medium"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Bio</label>
                  <textarea
                    name="bio"
                    rows="4"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm font-medium resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-10">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2.5 rounded-xl font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all text-sm"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Account Settings */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 border-b border-gray-50 pb-4">Security & Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => handleAction('Privacy Settings')}
                className="flex items-center p-4 rounded-2xl hover:bg-blue-50 border border-gray-50 transition-all text-left group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mr-4 group-hover:bg-blue-600 transition-colors">
                  <ShieldCheckIcon className="w-6 h-6 text-blue-600 group-hover:text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">Privacy Settings</div>
                  <div className="text-xs text-gray-500">Manage your data visibility</div>
                </div>
              </button>

              <button
                onClick={() => handleAction('Notifications')}
                className="flex items-center p-4 rounded-2xl hover:bg-indigo-50 border border-gray-50 transition-all text-left group"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center mr-4 group-hover:bg-indigo-600 transition-colors">
                  <BellIcon className="w-6 h-6 text-indigo-600 group-hover:text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">Notifications</div>
                  <div className="text-xs text-gray-500">Control alerts and updates</div>
                </div>
              </button>

              <button
                onClick={() => handleAction('Data Download')}
                className="flex items-center p-4 rounded-2xl hover:bg-purple-50 border border-gray-50 transition-all text-left group"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mr-4 group-hover:bg-purple-600 transition-colors">
                  <DocumentArrowDownIcon className="w-6 h-6 text-purple-600 group-hover:text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">Download Data</div>
                  <div className="text-xs text-gray-500">Get a copy of your learning history</div>
                </div>
              </button>

              <button
                onClick={() => handleAction('Delete Account')}
                className="flex items-center p-4 rounded-2xl hover:bg-red-50 border border-red-50 transition-all text-left group"
              >
                <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mr-4 group-hover:bg-red-600 transition-colors">
                  <TrashIcon className="w-6 h-6 text-red-600 group-hover:text-white" />
                </div>
                <div>
                  <div className="font-bold text-red-600 text-sm">Delete Account</div>
                  <div className="text-xs text-red-400">Permanently close your account</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Achievements */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900">Achievements</h3>
              <span className="text-blue-600 text-sm font-bold bg-blue-50 px-3 py-1 rounded-full">{userAchievements.length}/15</span>
            </div>
            <div className="space-y-4">
              {userAchievements.length > 0 ? (
                userAchievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-start space-x-4 p-4 bg-gray-50/50 rounded-[2rem] border border-gray-50 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full -mr-8 -mt-8"></div>
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm z-10 shrink-0 transform group-hover:rotate-12 transition-transform duration-300">
                      {achievement.icon}
                    </div>
                    <div className="flex-1 min-w-0 z-10">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">{achievement.title}</h4>
                      <p className="text-xs text-gray-600 leading-tight mb-2 opacity-80">{achievement.description}</p>
                      <div className="flex items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        <CalendarIcon className="w-3 h-3 mr-1" />
                        {new Date(achievement.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                  <StarIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-bold">No achievements earned yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
