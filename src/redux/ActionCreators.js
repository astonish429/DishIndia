import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';

//redux thunk to post a new comment, store it in server and then displaying using addComment

  export const postComment = (dishId, rating, author, comment) => (dispatch) =>{
        const newComment = {
            dishId : dishId,
            rating : rating,
            author : author,
            comment : comment
        }
        
       newComment.date = new Date().toISOString(); 

       //now post the newComment to the server using fetch

       return fetch(baseUrl + 'comments', {
           method : "POST",
           body : JSON.stringify(newComment),
           headers : {
               "Content-Type" : "application/json"
           },
           credential : "same-origin"
       })

         .then(response => {

             if(response.ok){
                 return response;
             }

             else{
                 let error = new Error("Error " + response.status + " : " + response.statusText);
                 error.response = response;
                 throw error;
             }
          },
             error => {
                 let errmess = new Error(error.message);
                 throw errmess;
             })

         .then(response => response.json())
         .then(response => dispatch(addComment(response)))
         .catch(error => {
             console.log("Error : " + error.message);
             alert("Comment can't be posted \n Error : " + error.message);
         })    
  }

//action when a new comment will be add
export const addComment = (comment) => ({
         type : ActionTypes.ADD_COMMENT,
         payload : comment
})



//redux thunk for fetchDishes that setting loading to true and then fetching dishes from baseUrl

export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading(true));

   return fetch(baseUrl + 'dishes')
       .then(response => {
           //checking if response is ok/successful then returning reponse to next then
           if(response.ok){
               return response
           }
           //else throw the error object to the catch
           else{
               let error = new Error("Error " + response.status + " : " + response.statusText);
               error.response = response;
               throw error;
           }
       },
         //handling errors when even the connection get failed
         error =>{
               let errmess = new Error(error.message);               
               throw errmess;
         }
       )
       .then(response => response.json())
       .then(dishes => dispatch(addDishes(dishes)))
       //handling all errors with catch and dispatching dishesFailed action with error message
       .catch(error => dispatch(dishesFailed(error.message)))
}  

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});



//redux thunk for fetchComments that fetching comments from baseUrl
export const fetchComments = () => (dispatch) => {

  return fetch(baseUrl + 'comments')
        .then(response => {

            if(response.ok){
            return response;
            }

            else{
                let error = new Error("Error " + response.status + " : " + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
                let errmess = new Error(error.message);
                throw errmess;
        }
        )
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)))
 }

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});


//redux thunk to fetchPromos from the baseUrl and then adding PROMOS

  export const fetchPromos = () => (dispatch) => {
      dispatch(promosLoading(true));

      return fetch(baseUrl + 'promotions')
            .then(response => {
                //checking if response is ok/successful then returning reponse to next then
                if(response.ok){
                    return response
                }
                //else throw the error object to the catch
                else{
                    let error = new Error("Error " + response.status + " : " + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            //handling errors when even the connection get failed
            error =>{
                    let errmess = new Error(error.message);
                    throw errmess;
            }
            )
        
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        //handling all errors with catch and dispatching dishesFailed action with error message
        .catch(error => dispatch(promosFailed(error.message)))
  }
  
  export const promosLoading = () => ({
      type : ActionTypes.PROMOS_LOADING,     
  })

  export const promosFailed = (errmess) => ({
      type : ActionTypes.PROMOS_FAILED,
      payload : errmess
  })

  export const addPromos = (promos) => ({
      type : ActionTypes.ADD_PROMOS,
      payload : promos
  })


  //Redux thunk for fetching leaders information from the server

  export const fetchLeaders = () => (dispatch) => {
        dispatch(leadersLoading(true));

        return fetch(baseUrl + 'leaders')

           .then(response => {

                if(response.ok){
                    return response;
                }
                else{
                    let error = new Error("Error " + response.status + " : " + response.statusText);
                     error.response = response;
                     throw error;
                }
            },
              error =>{
                  let errmess = new Error(error.message);
                  throw errmess;
              }
            )

            .then(response => response.json())
            .then(leaders => dispatch(addLeaders(leaders)))
            .catch(error => dispatch(leadersFailed(error.message)))
     }

  export const leadersLoading= () => ({
      type : ActionTypes.LEADERS_LOADING
  })

  export const leadersFailed = (errmess) => ({
       type : ActionTypes.LEADERS_FAILED,
       payload : errmess
  })

  export const addLeaders = (leaders) => ({
      type : ActionTypes.ADD_LEADERS,
      payload : leaders
  })


  
 //Redux thunk to store contact form data into server

 export const postFeedback = (firstname, lastname, email, telnum, agree, contactType, message) => (dispatch) =>{
         
          const feedback = {
              firstname : firstname,
              lastname : lastname,
              email : email,
              telnum : telnum,
              agree : agree,
              contactType : contactType,
              message : message
          }
           
         
      //store into baseUrl+feedback location using fetch

      return fetch(baseUrl + 'feedback', {
        method : "POST",
        body : JSON.stringify(feedback),
        headers : {
            "Content-Type" : "application/json"
        },
        credential : "same-origin"
      })
      .then(response => {

        if(response.ok){
            return response;
        }

        else{
            let error = new Error("Error " + response.status + " : " + response.statusText);
            error.response = response;
            throw error;
        }
     },
        error => {
            let errmess = new Error(error.message);
            throw errmess;
        })

    .then(response => response.json())
    .then(response => alert("Thank you for your feedback!" + JSON.stringify(response)))
    .catch(error => {
        console.log("Error : " + error.message);
        alert("Form can't submited \n Error : " + error.message);
    })    
}

