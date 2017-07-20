import React, { Component } from 'react';
import {connect} from 'react-redux';
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
                    <div className='activity-recent-set'>
                        <div className='activity-user-header'>
                            <h4 className='dark-label'>{ this.props.setInfo.numofterms } terms</h4>
                            <p className='activity-set-user-p'>{ this.props.setInfo.creatorname }</p>
                        </div>
                        <h3 className='activity-recent-set-title'>{ this.props.setInfo.title }</h3>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        setInfo: state.setInfo
    }
}

export default connect(mapStateToProps)(LatestActivity);