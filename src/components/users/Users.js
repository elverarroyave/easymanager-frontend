import React, { Component } from 'react'
import axios from 'axios'

import { Modal, Container, Row, Col} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';



export default class Users extends Component {

    state = {
        users: [],
        isOpen: false,
        form:{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            numberPhone: '',
            typeDocument: 'CC',
            numDocument: ''
        }
    };

    handleChange=async e=>{
        e.persist();
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form)
    }

    openModal = () => this.setState({ isOpen: true });  
    
    closeModal = () => this.setState({ isOpen: false});

    async componentDidMount(){
       const res = await axios.get('/users');
       this.setState({users: res.data.result});    
       console.log(this.state.users);
    }

    postPeticion=async()=>{
        await axios.post('/users',this.state.form).then(response=>{
            this.closeModal();
            this.componentDidMount();
        }).catch(error=>{
            console.log(error.message);
        });  
    }

  

    render() {
        const {form}=this.state;

        return (
            <div className="d-flex flex-column bd-highlight mb-3">
                <div className="col-md-9 container p-4">
                <table className="table ">
                    <thead>
                        <tr>
                        <th scope="col">id</th>
                        <th scope="col">Nombres</th>
                        <th scope="col">Apelludos</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Teléfono</th>
                        <th scope="col">Documento</th>
                        <th scope="col">Role</th>
                        <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map(user => 
                                <tr key={user.id}>
                                    <th>
                                        {user.id}
                                    </th>
                                    <td>
                                        {user.firstName}
                                    </td>
                                    <td>
                                        {user.lastName}
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                    <td>
                                        {user.numberPhone}
                                    </td>
                                    <td>
                                        {user.numDocument}
                                    </td>
                                    <td>
                                        Null
                                    </td>
                                    <td>
                                        <button className="btn btn-primary"><FontAwesomeIcon icon={faEdit}/></button>
                                        {"   "}
                                        <button className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt}/></button>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                    </table>

            <div className="d-flex flex-row-reverse ">
                <button className="btn btn-outline-dark" onClick={this.openModal}>Crear nuevo usuario</button>   
            </div>
                <Modal show={this.state.isOpen} onHide={this.closeModal}>
                    <Modal.Header>
                        <h3>
                            Crear nuevo usuario
                        </h3>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col xs={12} md={12}>
                                <label htmlFor="name">Nombres</label>
                                <input className="form-control" placeholder="Ingrese su nombre" type="text" name="firstName" id="name" onChange={this.handleChange} value={form.firstName}/>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={6} md={12}>
                                <label htmlFor="lastName">Apellidos</label>
                                <input className="form-control" placeholder="Ingrese sus apellidos" type="text" name="lastName" id="lastName" onChange={this.handleChange} value={form.lastName}/>
                                </Col> 
                            </Row>

                            <Row>
                                <Col xs={6} md={7}>
                                <label htmlFor="email">Email</label>
                                <input className="form-control" placeholder="Ingrese su e-mail" type="text" name="email" id="email" onChange={this.handleChange} value={form.email}/>
                                </Col> 
                                <Col xs={6} md={5}>
                                <label htmlFor="phone">Teléfono</label>
                                <input className="form-control" placeholder="Ingrese su teléfono" type="text" name="numberPhone" id="phone" onChange={this.handleChange}  value={form.numberPhone}/>
                                </Col>
                            </Row>

                            <Row>

                                <Col xs={6} md={6}>
                                    <label htmlFor="typeDocument">Tipo Documento</label>
                                    <select className="custom-select custom-select-lg mb-3" name="typeDocument" id="typeDocument">
                                        <option value="0">Documento</option>
                                        <option value="1">Cedula de ciudadanía</option>
                                        <option value="2">Tarjeta identidad</option>
                                        <option value="2">Documento Extanjero</option>
                                    </select>
                                </Col>
                                
                                <Col xs={6} md={6}>
                                <label htmlFor="document">N. Documento</label>
                                <input className="form-control" placeholder="Ingrese su documento" type="text" name="numDocument"onChange={this.handleChange} id="document"  value={form.numDocument}/>
                                </Col>  
                            </Row>

                            <Row>
                                <Col xs={6} md={6}>
                                <label htmlFor="document">Contraseña</label>
                                <input className="form-control" placeholder="Ingrese su contraseña" type="text" name="password" id="document" onChange={this.handleChange} value={form.password}/>
                                </Col>  
                            </Row>

                        </Container>                      
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-outline-dark" onClick={this.postPeticion}>Crear</button>
                        <button className="btn btn-outline-dark" onClick={this.closeModal}>Cerrar</button>
                    </Modal.Footer>
                </Modal>
            </div>
            </div>
        )
    }
}

/*
<div className="form-group">
                            <label htmlFor="id">Nombres</label>
                            <input className="form-control" type="text" name="id" id="id" readOnly/>
                            <br />
                            <label htmlFor="nombre">Apellidos</label>
                            <input className="form-control" type="text" name="name" id="nombre" />
                            <br />
                            <label htmlFor="nombre">Teléfono</label>
                            <input className="form-control" type="text" name="lastName" id="pais" />
                            <br />
                            <label htmlFor="capital_bursatil">Documento</label>
                            <input className="form-control" type="text" name="capital_bursatil" id="capital_bursatil" />
                        </div>   

                        */