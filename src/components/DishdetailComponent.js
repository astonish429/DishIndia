import React, { Component } from 'react';
import {Card, CardTitle, CardImg, CardText, Breadcrumb, BreadcrumbItem, Button,
 Modal, ModalBody, ModalHeader, Label, Row, Col} from 'reactstrap';
import {LocalForm, Control, Errors} from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

//validating author name form field
 
 const minLength = (len) => (val) => val && (val.length >= len);
 const maxLength = (len) => (val) => !(val) || (val.length <= len); 


//class CommentForm here
      class CommentForm extends Component{

        constructor(props){
          super(props);

         //binding

         this.toggleModal =this.toggleModal.bind(this);

          this.state = {
            isModalOpen : false
          }
        }//end of constructor

      //toggleModal function to change the state of isModalOpen:
      
        toggleModal(){
          this.setState({
            isModalOpen : !this.state.isModalOpen
          })
        }

        //handleSubmit function to handle form on submit

        handleSubmit(values){
          //calling the addComment action on submit of form
           this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        }

              
        render(){

          return(
            <React.Fragment>
                <Button outline color="danger" onClick={this.toggleModal}>
                  <span className="fa fa-pencil"></span>
                  &nbsp;Submit Comment
                </Button>
                 
              
                <Modal isOpen ={this.state.isModalOpen} toggle = {this.toggleModal}>
                  <ModalHeader toggle = {this.toggleModal}>Submit Comment</ModalHeader>
                  <ModalBody>
                             {/* react redux local form */}
                    
                      <LocalForm onSubmit = {(values)=> this.handleSubmit(values)}>

                        {/* Rating field row */}
                          <Row className="form-group">
                            <Col md={12}>
                              <Label htmlFor="Rating">Rating</Label>
                              <Control.select model = ".rating" default= "1" id="rating" name="rating"
                                  className="form-control" >
                                    <option value="" selected disabled>rating</option>
                                    <option >1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                  </Control.select>
                            </Col>   
                          </Row>
                         
                          {/* Name field row */}
                          <Row className="form-group">
                            <Col md={12}>
                              <Label htmlFor="author">Your Name</Label>
                              <Control.text model = ".author" id="author" name="author"
                                  className="form-control" 
                                  validators = {{
                                    minLength : minLength(3),
                                    maxLength : maxLength(15)
                                  }}
                                  />
                                  <Errors 
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages = {{
                                      minLength : "Must be greater than 2 characters",
                                      maxLength : "Must be 15 or less characters"
                                    }}
                                  />
                            </Col>   
                          </Row>

                           {/* Comment textare field row */}
                           <Row className="form-group">
                            <Col md={12}>
                              <Label htmlFor="comment">Comment</Label>
                              <Control.textarea model = ".comment" id="comment" name="comment"
                                  className="form-control" rows="6" />
                            </Col>   
                          </Row>

                          {/* Submit Button */}

                          <Row className="form-group justify-content-center">
                            
                              <Button type="submit" color="danger">Submit</Button>
                            
                          </Row>

                      </LocalForm>
                  </ModalBody>
                </Modal>
              </React.Fragment> 
           
              )//end of return
          }//end of render
      } //end of class


  //rendering the selected dish and its detail  

    function RenderDish({dish}){
            return(
              <FadeTransform in
                transformProps = {{
                    exitTransform : 'scale(0.5) translateY(-50%)'
                }}>
                  <Card>
                      <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                      <CardTitle style={{color: "#DC3545", fontSize:"18px", fontWeight:"bold", textAlign:"center"}}>{dish.name}</CardTitle>
                      <CardText style={{ padding: "5px"}}>{dish.description}</CardText>
                  </Card>
              </FadeTransform>  
            )
        }//end of rendering dish fn():


   //rendering the comments of selected dish if any else return empty div

      function RenderComments({commentsErrMess, comments, postComment, dishId}){

          if(commentsErrMess){
            return(
              <h3>{commentsErrMess}</h3>
            )
          }
           
          else
              return(
                  <div>
                      <h4 style={{color:"#000", fontWeight:"bold", textAlign:"center", marginBottom: "10px"}}>Comments</h4>
                      <ul className="list-unstyled">
                        <Stagger in>
                        {comments.map((cmnt)=>{
                            return( 
                              <Fade in>
                                 <li key = {cmnt.id} style={{marginBottom: "5px"}}>
                                   <p>--{cmnt.comment}</p>
                                   <p><font style={{color:"#DC3545"}}>{cmnt.author}</font>,&nbsp; 
                                   {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(cmnt.date)))}                               </p>  
                                 </li>
                              </Fade> 
                             )//end of list return
                            }//end of dishComments mapping
                          )}
                        </Stagger>
                      </ul>

                      {/* adding CommentForm Component in RenderComments fn(): */}
                        <p>
                          <CommentForm postComment={postComment} dishId={dishId} />
                        </p>
                  </div>
              )//end of whole div return
          
           }//end of render comments fn():


  //the main DishDetail Component here :    

  const DishDetail = (props) =>{

          //render Loading component if isLoading true 
             if(props.isLoading){
              return(
                  <div className="container">
                      <div className="row">
                          <Loading />
                      </div>
                  </div>
                )
              }  
 
          //render error message if any
 
          else if(props.errMess){
               return(
                   <div className="container">
                       <div className="row">
                           <div className="col-12">
                             <h4>{props.errMess}</h4>
                           </div>
                       </div>
                   </div>
               )
          }

      // check if dish is not null
      else if(props.dish != null){
            return(
              <div className="container">

                  <div className="row">
                      <Breadcrumb>
                        <BreadcrumbItem><Link to = '/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                      </Breadcrumb>

                      <div className="col-12">
                          <h2>{props.dish.name}</h2>
                          <hr />
                      </div>
                  </div>
              <div className="row">
                  <div className="col-12 col-md-5 m-1">
                      <RenderDish dish = {props.dish} />
                  </div>
                  <div className="col-12 col-md-5 m-1">
                      <RenderComments comments = {props.comments}
                        commentsErrMess = {props.commentsErrMess}
                        postComment = {props.postComment}
                        dishId = {props.dish.id}
                      />
                  </div>
                </div>
              </div>
              )
          }// end 

      else{    
        return(
          <div></div>
        )
      }

   }//end of DishDetail function




export default DishDetail;  