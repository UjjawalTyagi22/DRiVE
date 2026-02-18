const User = require('../models/User');

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            phone,
            dateOfBirth,
            location,
            bio,
            organization,
            role,
            profilePhoto,
            coverPhoto,
            modulesCompleted,
            totalHours,
            currentStreak,
            totalPoints,
            overallProgress,
            moduleProgress,
            recentActivity,
            lastAccessedModuleId
        } = req.body;

        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Update fields - Restrict to non-sensitive fields to prevent privilege escalation
        const allowedUpdates = {
            firstName: firstName || user.firstName,
            lastName: lastName || user.lastName,
            phone: phone || user.phone,
            dateOfBirth: dateOfBirth || user.dateOfBirth,
            location: location || user.location,
            bio: bio || user.bio,
            organization: organization || user.organization,
            profilePhoto: profilePhoto || user.profilePhoto,
            coverPhoto: coverPhoto || user.coverPhoto
        };

        const updatedUser = await user.update(allowedUpdates);

        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                user: {
                    id: updatedUser.id,
                    firstName: updatedUser.firstName,
                    lastName: updatedUser.lastName,
                    email: updatedUser.email,
                    phone: updatedUser.phone,
                    dateOfBirth: updatedUser.dateOfBirth,
                    location: updatedUser.location,
                    bio: updatedUser.bio,
                    organization: updatedUser.organization,
                    role: updatedUser.role,
                    profilePhoto: updatedUser.profilePhoto,
                    coverPhoto: updatedUser.coverPhoto,
                    modulesCompleted: updatedUser.modulesCompleted,
                    totalHours: updatedUser.totalHours,
                    currentStreak: updatedUser.currentStreak,
                    totalPoints: updatedUser.totalPoints,
                    overallProgress: updatedUser.overallProgress,
                    moduleProgress: updatedUser.moduleProgress ? JSON.parse(updatedUser.moduleProgress) : [],
                    recentActivity: updatedUser.recentActivity ? JSON.parse(updatedUser.recentActivity) : [],
                    lastAccessedModuleId: updatedUser.lastAccessedModuleId,
                    createdAt: updatedUser.createdAt
                }
            }
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during profile update',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// @desc    Get module enrollment statistics
// @route   GET /api/users/module-stats
// @access  Public
const getModuleStats = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['moduleProgress']
        });

        const stats = {};

        users.forEach(user => {
            if (user.moduleProgress) {
                try {
                    const progress = typeof user.moduleProgress === 'string'
                        ? JSON.parse(user.moduleProgress)
                        : user.moduleProgress;

                    if (Array.isArray(progress)) {
                        progress.forEach(mod => {
                            if (mod.id) {
                                stats[mod.id] = (stats[mod.id] || 0) + 1;
                            }
                        });
                    }
                } catch (e) {
                    console.error('Error parsing moduleProgress for user:', e);
                }
            }
        });

        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error('Get module stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during stats retrieval'
        });
    }
};

module.exports = {
    updateProfile,
    getModuleStats
};
