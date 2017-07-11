import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from './components/Header';
import './css/reset.css';
import './css/App.css';

class App extends Component {
  render() {
    return (
    <Header/>
    );
  }
}

function mapStateToProps(state) {
  return {
    state
  }
}

export default connect(mapStateToProps)(App);
