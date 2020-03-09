import * as ActionTypes from './ActionTypes';

export const Promotions = (state = {
                isLoading : true,
                errMess : null,
                promotions : []
              }, action) => {
       switch(action.type){

         //case for loading of promos, returning with isLoading to true while other with null and empty     
          case ActionTypes.PROMOS_LOADING : 
              return {...state, isLoading : true, errMess : null, promotions : []}

        //case for Failed Promos, returning with errMess assigned with the action.payload
           case ActionTypes.PROMOS_FAILED : 
              return {...state, isLoading : false, errMess : action.payload }
            
       //case for loading of promos, returning with isLoading to true while other with null and empty     
           case ActionTypes.ADD_PROMOS : 
              return {...state, isLoading : false, errMess : null, promotions : action.payload }

          //returning default state object otherwise    
           default : 
              return state;
       }
}