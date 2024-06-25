import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/userService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await loginUser({ email, password });
            localStorage.setItem('token', res.token);
            navigate('/tasks');
        } catch (err) {
            setError('Login failed');
            console.error(err);
        }
    };

    return (
        <Container>
            <Title>Login</Title>
            <Form onSubmit={handleSubmit}>
                <FormRow>
                    <Label>Email:</Label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormRow>
                <FormRow>
                    <Label>Password:</Label>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormRow>
                <Button type="submit">Login</Button>
                {error && <Error>{error}</Error>}
            </Form>
        </Container>
    );
};

const Container = styled.div`
    padding: 20px;
    max-width: 400px;
    margin: 0 auto;
`;

const Title = styled.h2`
    text-align: center;
    margin-bottom: 20px;
`;

const Form = styled.form`
    background: #f9f9f9;
    padding: 20px;
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

const Button = styled.button`
    padding: 10px 15px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    font-size: 16px;
    margin-top: 10px;

    &:hover {
        background: #0056b3;
    }
`;

const Error = styled.p`
    color: red;
    margin-top: 10px;
`;

export default Login;
