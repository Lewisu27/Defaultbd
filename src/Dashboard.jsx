import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Dashboard.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import {jwtDecode} from 'jwt-decode';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { FormControl, Dropdown, DropdownButton } from 'react-bootstrap';
import { API_ENDPOINT } from './Api';

import { Navbar, Nav, Container } from 'react-bootstrap';
// import { LinkContainer } from 'react-bootstrap';

import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";

import Swal from 'sweetalert2'
function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  /* Verify if User in Session in Local Storage */
  useEffect(() => {
    const fetchDecodedUserID = async () => {
      try {
        const response = JSON.parse(localStorage.getItem('token'));
        setUser(response.data);

        const decodedToken = jwtDecode(response.data.token);
        setUser(decodedToken);
      } catch (error) {
        navigate('/login');
      }
    };

    fetchDecodedUserID();
  }, []);

  /* Performs Logout Method */
  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

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
    
    const [show,setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [fullname, setfullname] = useState("")
    const [username, setusername] = useState("")
    const [passwordx, setpasswordx] = useState("")
    const [validationError, setValidationError] = useState({})
  
    const createUser = async (e) => {
      e.preventDefault();

      const formData = new FormData()

      formData.append('fullname',fullname)
      formData.append('username',username)
      formData.append('passwordx',passwordx)

      await axios.post(`${API_ENDPOINT}/auth/register`, { fullname,username,passwordx },{headers: headers}).then(({ data }) => {
        Swal.fire({
            icon:"success",
            text:data.message
        })
        fetchUsers();
        }).catch(({response})=>{
          if(response.status===422){
            setValidationError(response.data.errors)
          }else {
            Swal.fire ({
              text:response.data.message,
              icon:"error"
            })
          }
        })
        }
      
        const [selectedUser,setSelectedUser] = useState(null);
        const [show1, setShow1] = useState(false);

        const handleClose1 = () => setShow1(false);

        const handleShow1 = (row_users) => {
          setSelectedUser(row_users);
          setShow1(true);

          console.log(row_users);
        };
  

        //for update 
        // Add State for Update Modal
const [showUpdate, setShowUpdate] = useState(false);
const [updateFormData, setUpdateFormData] = useState({
  id: '',
  fullname: '',
  username: '',
  passwordx: '',
});

const handleCloseUpdate = () => setShowUpdate(false);

// Show Update Modal
const handleShowUpdate = (row_users) => {
  setUpdateFormData({
    id: row_users.id,
    fullname: row_users.fullname,
    username: row_users.username,
    passwordx: '', // Password is initially empty
  });
  setShowUpdate(true);
};

// Function to Update User
const updateUser = async (e) => {
  e.preventDefault();

  await axios
    .put(
      `${API_ENDPOINT}/user/${updateFormData.id}`,
      {
        fullname: updateFormData.fullname,
        username: updateFormData.username,
        passwordx: updateFormData.passwordx,
      },
      { headers: headers }
    )
    .then(({ data }) => {
      Swal.fire({ icon: 'success', text: 'User updated successfully' });
      fetchUsers();
      setShowUpdate(false);
    })
    .catch(({ response }) => {
      Swal.fire({
        icon: 'error',
        text: response.data.message || 'Failed to update user',
      });
    });
};

  
    return (
    <>
   <Navbar data-bs-theme="dark">

<Container>
  <Navbar.Brand href="#home">My React Website.</Navbar.Brand>
  <Nav className="me-auto">
    <Nav.Link href="#update">Update</Nav.Link>
    <Nav.Link href="#create">Create</Nav.Link>
    <Nav.Link href="#delete">Delete</Nav.Link>
  </Nav>

  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ms-auto">
      <NavDropdown title={user ? `User: ${user.username}` : 'Dropdown'} id="basic-nav-dropdown">
        <NavDropdown.Item href="#Profile">Profile</NavDropdown.Item>
        <NavDropdown.Item href="#">Settings</NavDropdown.Item>
        <NavDropdown.Item href="#" onClick={handleLogout}>Logout</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
</Container>

</Navbar>


<br/>

<div className='container'>

<div className='col-12'>
  <Button variant="btn btn-primary mb-2 float-end btn-sm me-2" onClick={handleShow}>Create User</Button>
</div>

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
                <Button variant='secondary' size='sm' onClick={()=>handleShow1(row_users)}>Read</Button>
                <Button variant='danger' size='sm' onClick={()=>deleteUser(row_users.id)}>Delete</Button>
                <Button variant='success' size='sm' onClick={()=>handleShowUpdate(row_users)}>Update</Button>
              </center>
            </td>
          </tr>
        ))
      )
    }
  </tbody>
</table>
</div>

<Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Create User</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <form onSubmit={createUser}>
      <Row>
        <Col>
          <Form.Group controlId="Name">
            <Form.Label>Fullname</Form.Label>
            <Form.Control type="text" value={fullname} onChange={(event)=>{setfullname(event.target.value)}} required/>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="Username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" value={username} onChange={(event)=>{setusername(event.target.value)}} required/>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="Password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={passwordx} onChange={(event)=>{setpasswordx(event.target.value)}} required/>
          </Form.Group>
        </Col>
      </Row>
      <Button variant="primary" className="mt-2" size="sm" block="block" type="submit">Save</Button>
    </form>
  </Modal.Body>
</Modal>

<Modal show={show1} onHide={handleClose1}>
  <Modal.Header closeButton>
    <Modal.Title>Row Details</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedUser ? (
      <div>
        <p><strong>ID:</strong> {selectedUser.id}</p>
        <p><strong>Fullname:</strong> {selectedUser.fullname}</p>
        <p><strong>Username:</strong> {selectedUser.username}</p>
      </div>
    ) : (
      <p>No data available</p>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose1}>
      Close
    </Button>
  </Modal.Footer>
</Modal>


<Modal show={showUpdate} onHide={handleCloseUpdate}>
  <Modal.Header closeButton>
    <Modal.Title>Update User</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <form onSubmit={updateUser}>
      <Row>
        <Col>
          <Form.Group controlId="UpdateFullname">
            <Form.Label>Fullname</Form.Label>
            <Form.Control
              type="text"
              value={updateFormData.fullname}
              onChange={(e) =>
                setUpdateFormData({ ...updateFormData, fullname: e.target.value })
              }
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="UpdateUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={updateFormData.username}
              onChange={(e) =>
                setUpdateFormData({ ...updateFormData, username: e.target.value })
              }
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="UpdatePassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Leave blank to keep unchanged"
              value={updateFormData.passwordx}
              onChange={(e) =>
                setUpdateFormData({ ...updateFormData, passwordx: e.target.value })
              }
            />
          </Form.Group>
        </Col>
      </Row>
      <Button variant="primary" className="mt-3" type="submit">
        Update
      </Button>
    </form>
  </Modal.Body>
</Modal>

    </>
  );
}

export default Dashboard;
