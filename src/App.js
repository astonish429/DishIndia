import React, { Component } from 'react';
import Main from './components/MainComponent';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '../src/redux/configureStore';
import './App.css';


const store = configureStore();

 class App extends Component{

    render(){
      return (
        <Provider store={store}>
          <BrowserRouter>
            <div className="App">
              <Main /> 
            </div>
          </BrowserRouter>
        </Provider>
      );
    }//end of render
  }//end of class

export default App;
