import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import About from './AboutComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProp = state =>{
   return {
       dishes : state.dishes,
       leaders : state.leaders,
       promotions : state.promotions,
       comments : state.comments
   }
}

const mapDispatchToProps = dispatch =>({
  postComment : (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes : () => {dispatch(fetchDishes())},
  fetchComments : ()=> {dispatch(fetchComments())},
  fetchPromos : ()=> {dispatch(fetchPromos())},
  fetchLeaders : ()=> {dispatch(fetchLeaders())},
  postFeedback : (firstname, lastname, email, telnum, agree, contactType, message)=> {dispatch(postFeedback(firstname, lastname, email, telnum, agree, contactType, message))},
  resetFeedbackForm : () => {dispatch(actions.reset('feedback'))}
})



 class Main extends Component{

     

    //calling fetchDishes as the component mount
      componentDidMount(){
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
      }

  
    //Main render
    render(){

      //setting HomePage to return Home Component
        const HomePage = ()=>{
          return(
            <Home dish = {this.props.dishes.dishes.filter((dish) => dish.featured)[0]} 
                  dishesLoading = {this.props.dishes.isLoading}
                  dishesErrMess = {this.props.dishes.errMess}

                  leaders = {this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                  leadersLoading = {this.props.leaders.isLoading} 
                  leadersErrMess = {this.props.leaders.errMess}

                  promotion = {this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                  promoLoading = {this.props.promotions.isLoading}
                  promoErrMess = {this.props.promotions.errMess}
            />
          );
        }

      //setting DishWithId to render Dishdetail Component
      const DishWithId = ({match})=>{
           return(
             <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                         isLoading = {this.props.dishes.isLoading}
                         errMess = {this.props.dishes.errMess}
                        
                comments={this.props.comments.comments.filter((comment)=> comment.dishId === parseInt(match.params.dishId, 10))}
                commentsErrMess = {this.props.comments.errMess}
                
                postComment = {this.props.postComment}
              />  
           )
      } 

      //setting ContactPage

      const ContactPage = () =>{
        return(
             <Contact postFeedback = {this.props.postFeedback} 
                   resetFeedbackForm = {this.props.resetFeedbackForm} />
             );     
        }

        
      return (
        <div>
          <Header />
          {/* transition animation between components */}
          <TransitionGroup>
              <CSSTransition key={this.props.location.key} classNames="page" timeout={300} >
                    {/* Using Switch to define the route in our applcn */}
                    <Switch>
                      <Route path="/home" component={HomePage} />
                        {/* route for about us Component */}
                      <Route path="/aboutus" component={()=> 
                          <About leaders = {this.props.leaders} />
                        } />
                      <Route exact path="/menu" component={()=> 
                        //  sending props, so uses inside function
                        <Menu dishes = {this.props.dishes} />
                        } />
                        {/* route for the selected dish that can have any id */}
                        <Route path="/menu/:dishId" component={DishWithId} />
                          {/* route for contact page */}
                        <Route exact path="/contact" component={ContactPage} />
                        {/* setting default path to home */}
                         <Redirect to= "/home" />
                     </Switch>
                  </CSSTransition>
              </TransitionGroup>
           <Footer />
        </div>
      );
    }//end of render
  }//end of class

export default withRouter(connect(mapStateToProp, mapDispatchToProps)(Main));
