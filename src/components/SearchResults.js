import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import {Link} from 'react-router-dom';

class SearchResults extends Component {
    render() {
        const sets = this.props.sets.map((set, i) => {
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
                <h3 className='search-title'>{`Study sets matching "${this.props.match.params.searchterm}"`}</h3>
                <div className='search-sets-container'>
                    {(sets !== []) ? sets : 'No Results'}
                </div>
                <Footer />
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