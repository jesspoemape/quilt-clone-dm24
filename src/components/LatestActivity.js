import React, { Component } from 'react';
import Header from './Header';

class LatestActivity extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className='activity-main-container'>
                    <h1 className='dark-header'>Latest Activity</h1>
                    <input type="text" placeholder='Search your sets by title' className='create-input'/>
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