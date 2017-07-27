import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getCards} from './../ducks/reducer';
import axios from 'axios';

class Match extends Component {
    constructor() {
        super();
        this.state = {
            time: 0
        }
this.shuffle = this.shuffle.bind(this);
    }

componentDidMount() {
    const setId = this.props.match.params.id;
    const cardUrl = `/api/get-cards/${setId}`;
    axios.get(cardUrl).then(response => this.props.getCards(response.data)).catch(console.error, 'Error');
}

shuffle(arr) {
    let m = arr.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = arr[m];
        arr[m] = arr[i];
        arr[i] = t;
    }
    return arr
}

    render() {
        const termsArr = this.props.cards.map(card => card.term);
        const defsArr = this.props.cards.map(card => card.definition);
        const cardsArr = termsArr.concat(defsArr);
        const shuffledArr = this.shuffle(cardsArr);
      const matchTerms =  shuffledArr.map( (card, i) => {
           return <div key={i} className='match-card'><p className='match-card-term'>{card}</p></div>
       } ) 

        return (
            <div>
            <div className='match-timer-container'>
                <h6 className='match-timer-title'>TIME</h6>
                <h2 className='match-timer-time'>{this.state.time}</h2>
            </div>
            <div className='match-cards-container'>
                {matchTerms}
                {/*{matchDefs}*/}
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