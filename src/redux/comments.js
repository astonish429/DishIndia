import * as ActionTypes from './ActionTypes';

export const Comments = (state = {
            errMess : null,
            comments : []
         }, action) =>{
    switch(action.type){
       
      //case for failed comments with errMess from payload and setting comments to empty array
        case ActionTypes.COMMENTS_FAILED :
            return {...state, errMess : action.payload}

      //case for add comments when errMess is set to null and comments assigned with payload      
        case ActionTypes.ADD_COMMENTS : 
             return {...state, errMess : null, comments : action.payload}

       //case for adding a new comment from the user     
        case ActionTypes.ADD_COMMENT :
            var comment = action.payload;
                return {...state, comments : state.comments.concat(comment)}
         
      // returning default state otherwise      
        default : 
            return state;
    }
}