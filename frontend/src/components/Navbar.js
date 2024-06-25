import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <Nav>
            <Title>Task Management</Title>
            <NavList>
                {token ? (
                    <>
                        <NavItem>
                            <StyledLink to="/tasks">Tasks</StyledLink>
                        </NavItem>
                        <NavItem>
                            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
                        </NavItem>
                    </>
                ) : (
                    <>
                        <NavItem>
                            <StyledLink to="/login">Login</StyledLink>
                        </NavItem>
                        <NavItem>
                            <StyledLink to="/register">Register</StyledLink>
                        </NavItem>
                    </>
                )}
            </NavList>
        </Nav>
    );
};

const Nav = styled.nav`
    background: #007bff;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.h1`
    color: white;
    margin: 0;
`;

const NavList = styled.ul`
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
`;

const NavItem = styled.li`
    margin-left: 20px;
`;

const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
    font-size: 16px;

    &:hover {
        text-decoration: underline;
    }
`;

const LogoutButton = styled.button`
    padding: 10px 15px;
    background: #0056b3;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background: #004085;
    }
`;

export default Navbar;
