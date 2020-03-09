import React from 'react';
import {Card, CardTitle, CardSubtitle, CardImg, CardText, CardBody} from 'reactstrap';
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';

function RenderCard({item, isLoading, errMess}){

       //render Loading Component if deshes loading
        if(isLoading){
          return(
            <Loading />
          )
        }

        //render error message if any
        else if(errMess){
          return(
            <h4>{errMess}</h4>
          )
        }

        //render dishes in card otherwise
        else{
          return(
            <FadeTransform in 
               transformProps = {{
                  exitTransform : 'scale(0.5) translateY(-50%)'
               }}>
                    <Card>
                      <CardImg src = {baseUrl + item.image} alt={item.name} height="300px" />
                      <CardBody>
                        <CardTitle>{item.title}</CardTitle>
                        {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                        <CardText>{item.description}</CardText>
                      </CardBody>
                    </Card>
            </FadeTransform>  
          )
      }//else stmnt end:  
 }//end of fn RenderCard


function Home(props){
    return(
        <div className="container">
          <div className="row align-item-start">

            <div className="col-12 col-md m-1">
               <RenderCard item = {props.dish} isLoading = {props.dishesLoading} errMess = {props.dishesErrMess}/>
            </div>

            <div className="col-12 col-md m-1">
               <RenderCard item = {props.promotion} isLoading = {props.promoLoading} errMess = {props.promoErrMess} />
            </div>

            <div className="col-12 col-md m-1">
               <RenderCard item = {props.leaders} isLoading = {props.leadersLoading} errMess = {props.leadersErrMess} />
            </div>
          </div>
        </div>
    )
}

export default Home;