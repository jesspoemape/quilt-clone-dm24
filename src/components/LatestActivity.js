import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import {getUserSS, getSetInfo} from './../ducks/reducer';
import axios from 'axios';

class LatestActivity extends Component {
    constructor() {
        super();
        this.state={
            studiedSetsInfo: []
        }

        this.handleSearch = this.handleSearch.bind(this);
    }

componentWillMount() {
    axios.get('http://localhost:3001/api/user-info/123456789').then((response) => this.props.getUserSS(response.data[0])).catch(console.error, 'Error');
    // const ssInfo = this.props.studiedSets.map((setId, i) => {
    //         const setUrl = `http://localhost:3001/api/get-set-info/${setId}`;
    //         return axios.get(setUrl).then(response => this.props.getSetInfo(response.data)).catch(console.error, 'Error');
    //      });

    //      this.setState({
    //          studiedSetsInfo: ssInfo
    //      })

}

    handleSearch(e) {
        console.log(e);
    }

    render() {
        // this will map through the users studied sets and make an api call for each of the set ids
        // the set information will be sent to the store, which will collect an array of set information objects
        // the array of set information objects will be mapped to render a set card
         
        const sets = this.props.studiedSets.map((set, i) => {
            return <div className='activity-recent-set' key={i}>
                        <div className='activity-user-header'>
                            <h4 className='dark-label'>{ set } terms</h4>
                            <p className='activity-set-user-p'>{ set}</p>
                        </div>
                        <h3 className='activity-recent-set-title'>{ set }</h3>
                    </div>
        })
         console.log(this.props);



        return (
            <div>
                <Header/>
                <div className='activity-main-container'>
                    <h1 className='dark-header'>Latest Activity</h1>
                    <input 
                        type="text" 
                        placeholder='Search your sets by title' 
                        className='create-input'
                        onChange={ e => this.handleSearch(e.target.value)}
                    />
                    <h4 className='create-title-label'>FILTER SETS</h4>
                </div>
                <div className='activity-sets-container'>
                    <h4 className='dark-label'>LAST WEEK</h4>
                    {sets}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        setInfo: state.setInfo,
        studiedSets: state.studiedSets
    }
}

export default connect(mapStateToProps, {getUserSS, getSetInfo})(LatestActivity);