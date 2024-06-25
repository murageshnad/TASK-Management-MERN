import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getAllTasks, deleteTask } from '../services/taskService';
import TaskForm from './TaskForm';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userFilter, setUserFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasks = await getAllTasks(token);
                setTasks(tasks);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tasks', error);
            }
        };

        fetchTasks();
    }, [token]);

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(taskId, token);
            setTasks(tasks.filter(t => t._id !== taskId));
        } catch (error) {
            console.error('Error deleting task', error);
        }
    };

    const handleTaskAdded = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    const handleTaskUpdated = (updatedTask) => {
        setTasks(tasks.map(t => t._id === updatedTask._id ? updatedTask : t));
    };

    const filteredTasks = tasks.filter(task => {
        let matchesUser = true;
        let matchesDate = true;

        if (userFilter) {
            console.log('sssss',task.user.name);
            matchesUser = task.user && task.user.name && task.user.name.includes(userFilter);
        }

        if (dateFilter) {
            matchesDate = new Date(task.dueDate).toISOString().split('T')[0] === dateFilter;
        }

        return matchesUser && matchesDate;
    });

    if (loading) return <Loading>Loading...</Loading>;

    return (
        <Container>
            <Title>All Tasks</Title>
            <FilterContainer>
                <Label>
                    Filter by User:
                    <Input
                        type="text"
                        value={userFilter}
                        onChange={(e) => setUserFilter(e.target.value)}
                    />
                </Label>
                <Label>
                    Filter by Date:
                    <Input
                        type="date"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                    />
                </Label>
            </FilterContainer>
            <TaskForm onTaskAdded={handleTaskAdded} />
            <TaskListContainer>
                {filteredTasks.map(task => (
                    <TaskItem key={task._id}>
                        <TaskTitle>{task.title}</TaskTitle>
                        <TaskDetail>Status: {task.status}</TaskDetail>
                        <TaskDetail>Due Date: {new Date(task.dueDate).toLocaleDateString()}</TaskDetail>
                        <TaskDetail>Assigned To: {task.user.name}</TaskDetail>
                        <Button onClick={() => handleDeleteTask(task._id)}>Delete</Button>
                        <TaskForm task={task} onTaskUpdated={handleTaskUpdated} />
                    </TaskItem>
                ))}
            </TaskListContainer>
        </Container>
    );
};

const Container = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
`;

const Title = styled.h2`
    text-align: center;
    margin-bottom: 20px;
`;

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const Label = styled.label`
    display: flex;
    flex-direction: column;
    font-weight: bold;
`;

const Input = styled.input`
    padding: 5px;
    font-size: 16px;
    margin-top: 5px;
`;

const TaskListContainer = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const TaskItem = styled.li`
    background: #f4f4f4;
    margin-bottom: 10px;
    padding: 15px;
    border-radius: 5px;
`;

const TaskTitle = styled.h3`
    margin: 0;
`;

const TaskDetail = styled.p`
    margin: 5px 0;
`;

const Button = styled.button`
    padding: 10px 15px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;

    &:hover {
        background: #0056b3;
    }
`;

const Loading = styled.div`
    text-align: center;
    font-size: 24px;
    font-weight: bold;
`;

export default TaskList;
