const Task = require("../models/Task");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const getUsers = async (req, res) => {
    try {
        // get all member users except their password
        const users = await User.find({ role: 'member'}).select("-password");
        
        // add task counts to each user
        const userWithTaskCounts = await Promise.all(users.map(async (user) => {
            const pendingTasks = await Task.countDocuments({ assignedTo: user._id, status: "Pending" });
            const inProgressTasks = await Task.countDocuments ({ assignedTo: user._id, status: "In Progress"});
            const completedTasks = await Task.countDocuments ({ assignedTo: user._id, status: "Completed" });

            return {
                ...user._doc, // include all existing user data
                pendingTasks,
                inProgressTasks,
                completedTasks,
            };
        }));

        res.json(userWithTaskCounts);

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message});
    }
};

const getUsersById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
        res.status(404).json({ message: "User Not Found"});
        res.json(user);
        } 
    
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message});
    }
};

// const deleteUser = async (req, res) => {
//     try {

//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message});
//     }
// };

module.exports = {
    getUsers,
    getUsersById,
    //deleteUser
}



