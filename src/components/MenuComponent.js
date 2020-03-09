import React from 'react';
import {Card, CardTitle, CardImg, CardImgOverlay, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';

    function RenderMenuItem({dish}){
          return(
            <Card key = {dish.id}  style={{cursor:'pointer'}}>
                {/* adding the link to go to specific path */}
                <Link to = {`/menu/${dish.id}`} >
                    <CardImg src={baseUrl + dish.image} width = "100%" style={{opacity : .9}} alt = {dish.name} />
                    <CardImgOverlay>
                        <CardTitle style={{fontSize : '24px', color: '#000', fontWeight:'bold'}}>{dish.name}</CardTitle>
                    </CardImgOverlay>
                </Link>
            </Card>
          )
    }
    
    
    const Menu = (props) => {

           const menu = props.dishes.dishes.map((dish) => {
               return(
                   <div className = "col-12 col-md-5 m-1">
                       
                       {/* calling the functional component RenderMenuItem */}

                     <RenderMenuItem dish = {dish} />
                   </div>
               );
           }); //end of mapping


       //render Loading component if isLoading true 
         if(props.dishes.isLoading){
             return(
                 <div className="container">
                     <div className="row">
                         <Loading />
                     </div>
                 </div>
             )
         }  

         //render error message if any

         else if(props.dishes.errMess){
              return(
                  <div className="container">
                      <div className="row">
                          <div className="col-12">
                            <h4>{props.dishes.errMess}</h4>
                          </div>
                      </div>
                  </div>
              )
         }

         //else render all the dishes
       else{
          return(
                 <div className="container">
                     <div className="row">
                         <Breadcrumb>
                           <BreadcrumbItem><Link to = '/home'>Home</Link></BreadcrumbItem>
                           <BreadcrumbItem active>Menu</BreadcrumbItem>
                         </Breadcrumb>

                         <div className="col-12">
                             <h2>Menu</h2>
                             <hr />
                         </div>
                     </div>
                     <div className="row">
                        {menu}
                     </div>            
                 </div>    
                 
            );
          } //end of else part

     }//end of Menu function
 
    
    
 

export default Menu;
        