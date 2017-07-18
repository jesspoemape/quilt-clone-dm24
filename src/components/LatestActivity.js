import React, { Component } from 'react';
import Header from './Header';

class LatestActivity extends Component {
    constructor() {
        super();

        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(e) {
        console.log(e);
    }

    render() {
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
                </div>
            </div>
        );
    }
}

export default LatestActivity;