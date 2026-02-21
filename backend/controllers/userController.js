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
        // Note: Progress-related fields are allowed so the frontend learning logic can sync data.
        const allowedUpdates = {
            firstName: firstName !== undefined ? firstName : user.firstName,
            lastName: lastName !== undefined ? lastName : user.lastName,
            phone: phone !== undefined ? phone : user.phone,
            dateOfBirth: dateOfBirth !== undefined ? dateOfBirth : user.dateOfBirth,
            location: location !== undefined ? location : user.location,
            bio: bio !== undefined ? bio : user.bio,
            organization: organization !== undefined ? organization : user.organization,
            profilePhoto: profilePhoto !== undefined ? profilePhoto : user.profilePhoto,
            coverPhoto: coverPhoto !== undefined ? coverPhoto : user.coverPhoto,
            // Learning progress fields
            modulesCompleted: modulesCompleted !== undefined ? modulesCompleted : user.modulesCompleted,
            totalHours: totalHours !== undefined ? totalHours : user.totalHours,
            currentStreak: currentStreak !== undefined ? currentStreak : user.currentStreak,
            totalPoints: totalPoints !== undefined ? totalPoints : user.totalPoints,
            overallProgress: overallProgress !== undefined ? overallProgress : user.overallProgress,
            moduleProgress: moduleProgress !== undefined ? JSON.stringify(moduleProgress) : user.moduleProgress,
            recentActivity: recentActivity !== undefined ? JSON.stringify(recentActivity) : user.recentActivity,
            lastAccessedModuleId: lastAccessedModuleId !== undefined ? lastAccessedModuleId : user.lastAccessedModuleId
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
