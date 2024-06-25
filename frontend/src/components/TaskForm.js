import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { createTask, updateTask } from '../services/taskService';

const TaskForm = ({ task, onTaskAdded, onTaskUpdated }) => {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('Scheduled');
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDueDate(new Date(task.dueDate).toISOString().split('T')[0]);
            setStatus(task.status);
        }
    }, [task]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const taskData = { title, dueDate, status };

        try {
            if (task) {
                const updatedTask = await updateTask(taskData, task._id, token);
                onTaskUpdated(updatedTask);
            } else {
                const newTask = await createTask(taskData, token);
                onTaskAdded(newTask);
            }
            setTitle('');
            setDueDate('');
            setStatus('Scheduled');
        } catch (err) {
            console.error('Error saving task', err);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormRow>
                <Label>Title:</Label>
                <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </FormRow>
            <FormRow>
                <Label>Due Date:</Label>
                <Input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </FormRow>
            <FormRow>
                <Label>Status:</Label>
                <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                </Select>
            </FormRow>
            <Button type="submit">{task ? 'Update Task' : 'Add Task'}</Button>
        </Form>
    );
};

const Form = styled.form`
    background: #f9f9f9;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormRow = styled.div`
    margin-bottom: 10px;
`;

const Label = styled.label`
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Select = styled.select`
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Button = styled.button`
    padding: 10px 15px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background: #0056b3;
    }
`;

export default TaskForm;
