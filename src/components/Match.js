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
// this.handleCardTouch = this.handleCardTouch.bind(this);
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
testArr =[];
handleCardTouch(i) {
    document.getElementById(`card-${i}`).classList.add('selected');
    // on click, add the text to an array
    // then check if this.props.cards includes an object where the term and def match the term and def in this temp array
    // if so, then flash green and hide the cards
    // if not, flash red and then go back to unselected style card
    let text = document.getElementById(`card-${i}`).getElementsByTagName('p')[0].innerHTML;
    if (!this.testArr.includes(text)) {
         this.testArr = [...this.testArr, text]
        console.log(this.testArr);
    }
   

    if (this.testArr.length === 2) {
        for (var x = 0; x < this.props.cards.length; x++) {
            var element = this.props.cards[x];
            if ((element.term === this.testArr[0] && element.definition === this.testArr[1]) || (element.definition === this.testArr[0] && element.term === this.testArr[1])) {
                console.log('match')
                break;
            }
            else {
                console.log('no match');
            }
        }
    }
}

    render() {
        const termsArr = this.props.cards.map(card => card.term);
        const defsArr = this.props.cards.map(card => card.definition);
        const cardsArr = termsArr.concat(defsArr);
        const shuffledArr = this.shuffle(cardsArr);
      const matchCards =  shuffledArr.map( (card, i) => {
           return <div id={`card-${i}`} onMouseUp={ this.handleCardTouch.bind(this, i)} key={i} className='match-card'><p className='match-card-term'>{card}</p></div>
       } ) 

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