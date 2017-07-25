import React, { Component } from 'react';
import {connect} from 'react-redux';

class SearchResults extends Component {
    render() {
        console.log(this.props.sets);
        const sets = this.props.sets.map((set, i) => {
            return <div key={i}>{set.title}</div>
        })
        return (
            <div>
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