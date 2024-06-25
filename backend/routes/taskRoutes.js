const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getTasks,getAllTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');

router.get('/', auth, getTasks);
router.post('/', auth, createTask);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);
router.get('/all', getAllTasks);

module.exports = router;
