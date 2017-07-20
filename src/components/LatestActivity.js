import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import {getUserSS, getSSInfo} from './../ducks/reducer';
import axios from 'axios';
import {Link} from 'react-router-dom';

class LatestActivity extends Component {
    constructor() {
        super();

        this.handleSearch = this.handleSearch.bind(this);
    }

componentDidMount() {
    
    axios.get('http://localhost:3001/api/user-info/123456789')
        .then((response) => {
            // map through the array of studied sets which is the response of getting user info
            response.data[0].studiedsets.map( (setId) => {
            const setUrl = `http://localhost:3001/api/get-set-info/${setId}`;
            // get set info on each set and send that response to the store
            return axios.get(setUrl).then(response => this.props.getSSInfo(response.data)).catch(console.error, 'Error');
         } );
        }).catch(console.error, 'Error');
}

    handleSearch(e) {
        console.log(e);
    }

    render() {
        
    function removeDupes(arrayOfObjects) {
        let newObj = new Set();
        arrayOfObjects.forEach(e => newObj.add(JSON.stringify(e)))
        let final = Array.from(newObj).map(e => JSON.parse(e))
        return final
    }
    const test = removeDupes(this.props.studiedSetsInfo)
        // the array of set information objects will be mapped to render a set card
        const sets = test.map((set, i) => {
            return <Link className='link' to={`/set-detail/${set.id}`}  key={i}><div className='activity-recent-set'>
                        <div className='activity-user-header'>
                            <h4 className='dark-label'>{ set.numofterms } terms</h4>
                            <p className='activity-set-user-p'>{ set.creatorname }</p>
                        </div>
                        <h3 className='activity-recent-set-title'>{ set.title }</h3>
                    </div></Link>
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