import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from './Header';

class SearchResults extends Component {
    render() {
        console.log('here', this.props.sets);
        const sets = this.props.sets.map((set, i) => {
            return <div key={i}>{set.title}</div>
        })
        return (
            <div>
                <Header/>
                Sets
                {sets}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        sets: state.searchRes
    }
}

export default connect(mapStateToProps)(SearchResults);