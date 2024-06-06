
const { getAllUsers, addUserDb, updateUserDb } = require('../model/userQueries');


exports.getTableUsers = async (req, res, next) => {
    try { 
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Error in getTableUsers:', error);
        next(error);
    }
};

exports.addUser = async (req, res, next) => {
    try {
        console.log('Request body:', req.body);
        const newUser = await addUserDb(req.body);
        res.json({ message: 'User added successfully', user: newUser});
    } catch (error) {
        console.error('Error in addUser:', error);
        next(error);
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        console.log('Request body:', req.body);
        const updatedUser = await updateUserDb(req.body);
        res.json({ message: 'User updated successfully', user: updatedUser});
    } catch (error){
        console.error('Error in updateUser:', error);
        next(error);
    }
}