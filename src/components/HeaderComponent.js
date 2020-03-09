import React, { Component } from 'react';
import {Navbar, NavbarBrand, Nav, NavItem, NavbarToggler, Collapse, Jumbotron,
  Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { NavLink } from 'react-router-dom';


class Header extends Component{

    constructor(props){
        super(props);

   this.toggleNav = this.toggleNav.bind(this); 
   this.toggleModal = this.toggleModal.bind(this); 
   this.handleLogin = this.handleLogin.bind(this);   

        this.state={
            isNavOpen : false,
            isModalOpen : false
        }
    }//end of constructor

    // function to toggle the navbar
    
      toggleNav(){
          this.setState({
              isNavOpen : !this.state.isNavOpen
          })
      }

       // function to toggle Modal
    
       toggleModal(){
        this.setState({
            isModalOpen : !this.state.isModalOpen
        })
    }

    //function handleLogin here :

    handleLogin(event){
       this.toggleModal();
       alert("Username is : " + this.username.value + " Password is : " + this.password.value 
       + " checkbox is set to : " + this.remember.checked);
       event.preventDefault();
    }


    render(){
        return(
            <React.Fragment>
                <Navbar dark expand = "md">
                  <div className="container">


                    <NavbarToggler onClick={this.toggleNav} />   
                    <NavbarBrand logo href="/">Dishindia&nbsp;
                      <img src="./assets/images/dish-logo.png" width="35" height="40" alt="logo" />
                    </NavbarBrand> 

                     <Collapse isOpen={this.state.isNavOpen} navbar>
                         <Nav navbar>
                             <NavItem>
                                 <NavLink className= "nav-link" to="/home">home&nbsp;
                                 <span className="fa fa-home"></span>
                                 </NavLink> 
                             </NavItem>
                             <NavItem>
                                 <NavLink className= "nav-link" to="/aboutus">About Us&nbsp;
                                 <span className="fa fa-user-o"></span>
                                 </NavLink> 
                             </NavItem>
                             <NavItem>
                                 <NavLink className= "nav-link" to="/menu">Menu&nbsp;
                                 <span className="fa fa-list"></span>
                                 </NavLink> 
                             </NavItem>
                             <NavItem>
                                 <NavLink className= "nav-link" to="/contact">Contact Us&nbsp;
                                 <span className="fa fa-phone"></span>
                                 </NavLink> 
                             </NavItem>
                         </Nav>
                         {/* added a Login button */}
                         <Nav className = "ml-auto" navbar>
                             <NavItem>
                                 <Button outline onClick={this.toggleModal}>
                                     <span className="fa fa-sign-in fa-lg"></span>
                                     Login
                                 </Button>
                             </NavItem>
                         </Nav>

                     </Collapse> 


                  </div>
                </Navbar>
                
                <Jumbotron>
                <div className="container">
                  <div className="row row-header">
                     <div className="col-12 col-sm-6 ">
                       <h1>WELCOME TO DISHINDIA</h1>
                       <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                     </div>
                   </div>
                 </div>
                </Jumbotron>
                
                {/* Modal to host the uncontrolled form */}

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle = {this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" name="username" id="username"
                                  innerRef = {(input)=> this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" name="password" id="password"
                                  innerRef = {(input)=> this.password = input} />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                    innerRef = {(input) => this.remember = input}/>
                                    Remember Me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>

            </React.Fragment>
        )
    }
}

export default Header;