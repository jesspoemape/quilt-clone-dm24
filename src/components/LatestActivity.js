import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import {getUserSS, getSSInfo} from './../ducks/reducer';
import axios from 'axios';

class LatestActivity extends Component {
    constructor() {
        super();

        this.handleSearch = this.handleSearch.bind(this);
    }

componentWillMount() {
    axios.get('http://localhost:3001/api/user-info/123456789')
        .then((response) => {
            // console.log('this', response.data[0].studiedsets);
            response.data[0].studiedsets.map( (setId) => {
            const setUrl = `http://localhost:3001/api/get-set-info/${setId}`;
            return axios.get(setUrl).then(response => this.props.getSSInfo(response.data)).catch(console.error, 'Error');
         } );
            return this.props.getUserSS(response.data[0])
        })
        .catch(console.error, 'Error');

         this.props.studiedSets.map( (setId) => {
             console.log('here');
            const setUrl = `http://localhost:3001/api/get-set-info/${setId}`;
            return axios.get(setUrl).then(response => this.props.getSSInfo(response.data)).catch(console.error, 'Error');
         } );
}

    handleSearch(e) {
        console.log(e);
    }

    render() {
        // this will map through the users studied sets and make an api call for each of the set ids
        // the set information will be sent to the store, which will collect an array of set information objects
        // the array of set information objects will be mapped to render a set card
         console.log('render', this.props.studiedSetsInfo)
        const sets = this.props.studiedSetsInfo.map((set, i) => {
            return <div className='activity-recent-set' key={i}>
                        <div className='activity-user-header'>
                            <h4 className='dark-label'>{ set.numofterms } terms</h4>
                            <p className='activity-set-user-p'>{ set.creatorname }</p>
                        </div>
                        <h3 className='activity-recent-set-title'>{ set.title }</h3>
                    </div>
        })

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
        studiedSets: state.studiedSets,
        studiedSetsInfo: state.studiedSetsInfo
    }
}

export default connect(mapStateToProps, {getUserSS, getSSInfo})(LatestActivity);