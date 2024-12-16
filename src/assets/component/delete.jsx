import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import {jwtDecode} from 'jwt-decode';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { FormControl, Dropdown, DropdownButton } from 'react-bootstrap';


import { Navbar, Nav, Container } from 'react-bootstrap';
// import { LinkContainer } from 'react-bootstrap';

import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";

import Swal from 'sweetalert2'
function deleteUser() {
  

    /* 1. DISPLAY USERS */
    const [users, setUsers] = useState([]);
    
    const userdata = JSON.parse(localStorage.getItem('token'));
    const token = userdata.data.token;

    const headers = {
        accept: 'application/json',
        Authorization: token
    };

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        await axios.get(`${API_ENDPOINT}/user/`, { headers: headers }).then(({ data }) => {
            setUsers(data)
        })
    }
  

    /* 2. DELETE USER */
    const deleteUser = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            return result.isConfirmed
        });

        if (!isConfirm) {
            return;
        }

        await axios.delete(`${API_ENDPOINT}/user/${id}`, { headers: headers }).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: "Successfully Deleted"
            })
            fetchUsers()
        }).catch(({ response: { data } }) => {
            Swal.fire({
                text: data.message,
                icon: "error"
            })
        })
    }
    

    
    return (
    <>

<br/>

<div className='container'>

<table className='table table-bordered'>
  <thead>
    <tr>
      <th style={{padding: 1, margin: 0}}>ID</th>
      <th style={{padding: 1, margin: 0}}>Username</th>
      <th style={{padding: 1, margin: 0}}>Password</th>
      <th style={{padding: 1, margin: 0}}>
        <center>Action</center>
      </th>
    </tr>
  </thead>
  <tbody>
    {
      users.length > 0 && (
        users.map((row_users, key)=>(
          <tr key={row_users.id}>
            <td style={{padding: 1, margin: 0}}>{row_users.id}</td>
            <td style={{padding: 1, margin: 0}}>{row_users.username}</td>
            <td style={{padding: 1, margin: 0}}>{row_users.fullname}</td>
            <td style={{padding: 1, margin: 0}}>
              <center>
                <Button variant='danger' size='sm' onClick={()=>deleteUser(row_users.id)}>Delete</Button>
              </center>
            </td>
          </tr>
        ))
      )
    }
  </tbody>
</table>
</div>


    {selectedUser ? (
      <div>
        <p><strong>ID:</strong> {selectedUser.id}</p>
        <p><strong>Fullname:</strong> {selectedUser.fullname}</p>
        <p><strong>Username:</strong> {selectedUser.username}</p>
      </div>
    ) : (
      <p>No data available</p>
    )}
    </>
  );
}

export default deleteUser;
