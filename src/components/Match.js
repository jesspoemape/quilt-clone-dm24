import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getCards} from './../ducks/reducer';
import axios from 'axios';

class Match extends Component {
    constructor() {
        super();
        this.state = {
            time: 0,
            count: 0
        }

    }

componentDidMount() {
    const setId = this.props.match.params.id;
    const cardUrl = `/api/get-cards/${setId}`;
    axios.get(cardUrl).then(response => this.props.getCards(response.data)).catch(console.error, 'Error');
}


    render() {
       const matchCards =  this.props.cards.map( (card, i) =>{
           return <div>
           <div className='match-card'>
                    <p className='match-card-term'>{card.term}</p>
                </div>
                <div className='match-card'>
                    <p className='match-card-term'>{card.definition}</p>
                </div>
           </div>
           
       } ) 


        const {count} = this.state;
        return (
            <div>
            <div className='match-timer-container'>
                <h6 className='match-timer-title'>TIME</h6>
                <h2 className='match-timer-time'>{this.state.time}</h2>
            </div>
            <div className='match-cards-container'>
                {matchCards}
            </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cards: state.cards
    }
}

export default connect(mapStateToProps, {getCards})(Match);