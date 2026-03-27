const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    updateUserRole,
    updateUserStatus,
    deleteUser
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

router.use(protect);
router.use(admin);

router.route('/')
    .get(getAllUsers);

router.put('/:id/role', updateUserRole);
router.put('/:id/status', updateUserStatus);
router.delete('/:id', deleteUser);

module.exports = router;
