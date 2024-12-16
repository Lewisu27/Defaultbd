import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from 'axios';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { API_ENDPOINT } from './Api';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {jwtDecode} from 'jwt-decode';
import Form from 'react-bootstrap/Form';
import Dashboard from './Dashboard';
import Login from './Login';
import deleteUser from './assets/component/delete';
import './App.css';
import Profile from './Profile';

function App() {
  return (
    <>
      <Router>
        <Row>
          <Col md={12}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/delete" element={<deleteUser/>} />
              <Route path="/Profile" element={<Profile/>} />

            </Routes>
          </Col>
        </Row>
      </Router>
    </>
  );
}

export default App;
