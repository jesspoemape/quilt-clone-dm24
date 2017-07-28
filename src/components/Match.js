import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getCards} from './../ducks/reducer';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Match extends Component {
    constructor() {
        super();
        this.state = {
            time: 0
        }
this.shuffle = this.shuffle.bind(this);
this.handleStart = this.handleStart.bind(this);
this.handleStartOver = this.handleStartOver.bind(this);
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

handleStart() {
    document.getElementById('match-cards-container').style.display = 'flex';
    document.getElementById('match-start-btn').style.display = 'none';
}

testArr =[];
idArr = [];
finishArr = [];
restartArr = [];
handleCardTouch(i) {
    document.getElementById(`card-${i}`).classList.add('selected');
    // on click, add the text to an array
    // then check if this.props.cards includes an object where the term and def match the term and def in this temp array
    // if so, then flash green and hide the cards
    // if not, flash red and then go back to unselected style card
    let text = document.getElementById(`card-${i}`).getElementsByTagName('p')[0].innerHTML;
    if (!this.testArr.includes(text)) {
         this.testArr = [...this.testArr, text];
         this.idArr = [...this.idArr, `card-${i}`];
         this.restartArr = [...this.restartArr, i];
    }

    if (this.testArr.length === 2) {
        let found = false;
        for (var x = 0; x < this.props.cards.length; x++) {
            var element = this.props.cards[x];
            if ((element.term === this.testArr[0] && element.definition === this.testArr[1]) 
            || (element.definition === this.testArr[0] && element.term === this.testArr[1])) {
                found = true;
                break;
            }
        }
        let temp1 = this.idArr[0];
        let temp2 = this.idArr[1];
        if (found) {
            this.finishArr = [...this.finishArr, i];
            document.getElementById(this.idArr[0]).classList.add('correct');
            document.getElementById(this.idArr[1]).classList.add('correct');
            setTimeout(function() {
                document.getElementById(temp1).style.visibility = 'hidden';
                document.getElementById(temp2).style.visibility = 'hidden';
            }, 150);
            this.testArr = [];
            this.idArr = [];
        }
        else {
            document.getElementById(this.idArr[0]).classList.add('incorrect');
            document.getElementById(this.idArr[1]).classList.add('incorrect');
            setTimeout(function() {
                document.getElementById(temp1).classList.remove('incorrect');
                document.getElementById(temp2).classList.remove('incorrect');
                document.getElementById(temp1).classList.remove('selected');
                document.getElementById(temp2).classList.remove('selected');
            }, 150);
            this.testArr = [];
            this.idArr = [];
        }
    }
    
    //check if all the cards have visibility of hidden
    // if so, stop the timer and congratulate the player
    if (this.finishArr.length === this.props.cards.length) {
        document.getElementById('game-over').style.display = 'flex';
        document.getElementById('match-cards-container').style.display = 'none';
        this.finishArr = [];
    }
}
handleStartOver() {
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('match-start-btn').style.display = 'block';

    this.restartArr.forEach((card, i) => { 
         document.getElementById(`card-${i}`).style.visibility = 'visible';
         document.getElementById(`card-${i}`).classList.remove('correct');
         document.getElementById(`card-${i}`).classList.remove('selected');
    
    })
    this.restartArr = [];
}
// i need to move all of this into a function because i need to redo this when the game restarts.
// all this could go in a .then in the component did mount after the api call.
// this would allow me to store the shuffled cards array in state, maybe???????
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
                <div className='header-container'>
                    <Link to={`/set-detail/${this.props.match.params.id}`}><svg className='flash-header-icon' xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 16 16"><g><polygon points="8,4.646 8.677,5.323 6,8 13,8 13,9 6,9 8.677,11.677 8,12.354 4.146,8.5  "/></g></svg></Link>
                    <svg className='flash-header-icon' xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100"><g transform="translate(0,-952.36218)"><path d="m 89.00002,1026.3622 c 0,1.1046 -0.89543,2 -2,2 l -28.31254,0 c -0.8727,2.8728 -3.5439,5 -6.6875,5 -3.1435,0 -5.8147,-2.1272 -6.6875,-5 l -32.3125,0 c -1.1046,0 -2,-0.8954 -2,-2 0,-1.1046 0.8954,-2 2,-2 l 32.3125,0 c 0.8728,-2.8729 3.544,-5 6.6875,-5 3.1436,0 5.8148,2.1271 6.6875,5 l 28.31254,0 c 1.10457,0 2,0.8954 2,2 z m 0,-24 c 0,1.1046 -0.89543,2 -2,2 l -48.31254,0 c -0.8727,2.8728 -3.544,5 -6.6875,5 -3.1435,0 -5.8147,-2.1272 -6.6875,-5 l -12.3125,0 c -1.1046,0 -2,-0.8954 -2,-2 0,-1.1046 0.8954,-2 2,-2 l 12.3125,0 c 0.8728,-2.87288 3.544,-5.00002 6.6875,-5.00002 3.1435,0 5.8148,2.12714 6.6875,5.00002 l 48.31254,0 c 1.10457,0 2,0.8954 2,2 z m 0,-24.00002 c 0,1.1046 -0.89543,2 -2,2 l -8.3125,0 c -0.87275,2.87286 -3.54399,5 -6.6875,5 -3.14354,0 -5.81474,-2.12714 -6.68754,-5 l -52.3125,0 c -1.1046,0 -2,-0.8954 -2,-2 0,-1.1046 0.8954,-2 2,-2 l 52.3125,0 c 0.8728,-2.87286 3.544,-5 6.68754,-5 3.14351,0 5.81475,2.12714 6.6875,5 l 8.3125,0 c 1.10457,0 2,0.8954 2,2 z m -14,0 c 0,-1.68054 -1.31946,-3 -3,-3 -1.68054,0 -3.00004,1.31946 -3.00004,3 0,1.68054 1.3195,3 3.00004,3 1.68054,0 3,-1.31946 3,-3 z m -20.00004,48.00002 c 0,-1.6806 -1.3194,-3 -3,-3 -1.6805,0 -3,1.3194 -3,3 0,1.6805 1.3195,3 3,3 1.6806,0 3,-1.3195 3,-3 z m -20,-24 c 0,-1.6806 -1.3194,-3.00002 -3,-3.00002 -1.6805,0 -3,1.31942 -3,3.00002 0,1.6805 1.3195,3 3,3 1.6806,0 3,-1.3195 3,-3 z" /></g></svg>
                </div>
                <div className='match-timer-container'>
                    <h6 className='match-timer-title'>TIME</h6>
                    <h2 className='match-timer-time'>{this.state.time}</h2>
                </div>
                <div className='match-main-container'>
                    <button className='create-set-button' id='match-start-btn' onClick={() => this.handleStart()}>Start</button>
                    <div id='match-cards-container' className='match-cards-container'>
                        {matchCards}
                    </div>
                </div>
                <div id='game-over' className='match-end-wrap'>
                    <h2 className='flash-back-main'>Nice work!</h2>
                    <p className='flash-back-sub'>You just studied {this.props.cards.length} terms!</p>
                    <button className='create-set-button' onClick={() => this.handleStartOver()}>Start Over</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cards: state.cards || []
    }
}

export default connect(mapStateToProps, {getCards})(Match);