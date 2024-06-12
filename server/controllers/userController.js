
const { getAllUsers, addUserDb, updateUserDb, deleteUserDb } = require('../model/userQueries');


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
        console.log('Updated user:', updatedUser);
        res.json({ message: 'User updated succesfully', user: updatedUser});
    } catch (error){
        console.error('Error in updateUser:', error);
        next(error);
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        console.log('Deleting use with id:', req.params.id);
        const deletedUser = await deleteUserDb(req.params.id);
        res.json({ message: 'User deleted successfully', user: deletedUser});
    } catch (error) {
        console.error('Error in deleteUser:', error);
        next(error);
    }
}