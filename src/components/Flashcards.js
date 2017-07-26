import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getCards} from './../ducks/reducer';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Flashcards extends Component {
    constructor() {
        super();
        this.state = {
            count: 0
        }

    this.handleFlip = this.handleFlip.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleStartOver = this.handleStartOver.bind(this);
    }

componentDidMount() {
    const setId = this.props.match.params.id;
    const cardUrl = `/api/get-cards/${setId}`;
    axios.get(cardUrl).then(response => this.props.getCards(response.data)).catch(console.error, 'Error');
}
handleFlip() {
    document.getElementById('flip-container').classList.toggle("flip");
}
handleNext() {
    let count = this.state.count;
    let barWidth;
    if (count === this.props.cards.length - 1) {
        document.getElementById('flip-container').style.display = 'none';
        document.getElementById('flash-back').style.display = 'flex';
    }
    else if (count < this.props.cards.length - 1) {
        this.setState({count: count + 1});
        barWidth = ((count + 1) / (this.props.cards.length - 1)) * 100;
        document.getElementById('prog-bar').style.width = `${barWidth}%`;
    }
    
}
handlePrevious() {
    let count = this.state.count;
    let barWidth;
     if (count > 0) {
        this.setState({count: count - 1});
        barWidth = ((this.state.count - 1) / (this.props.cards.length - 1)) * 100;
        document.getElementById('prog-bar').style.width = `${barWidth}%`;
    } 
}
handleStartOver() {
    document.getElementById('flip-container').style.display = 'block';
    document.getElementById('flash-back').style.display = 'none';
    document.getElementById('prog-bar').style.width = '1%';
    this.setState({count: 0});

}

    render() {
        const placeholderImg = 'http://www.artsalamandre.com/wp-content/uploads/2016/03/placeholder.png';
        const {count} = this.state;
        return (
            <div>
                <div className='header-container'>
                    <Link to={`/set-detail/${this.props.match.params.id}`}><svg className='flash-header-icon' xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 16 16"><g><polygon points="8,4.646 8.677,5.323 6,8 13,8 13,9 6,9 8.677,11.677 8,12.354 4.146,8.5  "/></g></svg></Link>
                    <svg className='flash-header-icon' xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100"><g transform="translate(0,-952.36218)"><path d="m 89.00002,1026.3622 c 0,1.1046 -0.89543,2 -2,2 l -28.31254,0 c -0.8727,2.8728 -3.5439,5 -6.6875,5 -3.1435,0 -5.8147,-2.1272 -6.6875,-5 l -32.3125,0 c -1.1046,0 -2,-0.8954 -2,-2 0,-1.1046 0.8954,-2 2,-2 l 32.3125,0 c 0.8728,-2.8729 3.544,-5 6.6875,-5 3.1436,0 5.8148,2.1271 6.6875,5 l 28.31254,0 c 1.10457,0 2,0.8954 2,2 z m 0,-24 c 0,1.1046 -0.89543,2 -2,2 l -48.31254,0 c -0.8727,2.8728 -3.544,5 -6.6875,5 -3.1435,0 -5.8147,-2.1272 -6.6875,-5 l -12.3125,0 c -1.1046,0 -2,-0.8954 -2,-2 0,-1.1046 0.8954,-2 2,-2 l 12.3125,0 c 0.8728,-2.87288 3.544,-5.00002 6.6875,-5.00002 3.1435,0 5.8148,2.12714 6.6875,5.00002 l 48.31254,0 c 1.10457,0 2,0.8954 2,2 z m 0,-24.00002 c 0,1.1046 -0.89543,2 -2,2 l -8.3125,0 c -0.87275,2.87286 -3.54399,5 -6.6875,5 -3.14354,0 -5.81474,-2.12714 -6.68754,-5 l -52.3125,0 c -1.1046,0 -2,-0.8954 -2,-2 0,-1.1046 0.8954,-2 2,-2 l 52.3125,0 c 0.8728,-2.87286 3.544,-5 6.68754,-5 3.14351,0 5.81475,2.12714 6.6875,5 l 8.3125,0 c 1.10457,0 2,0.8954 2,2 z m -14,0 c 0,-1.68054 -1.31946,-3 -3,-3 -1.68054,0 -3.00004,1.31946 -3.00004,3 0,1.68054 1.3195,3 3.00004,3 1.68054,0 3,-1.31946 3,-3 z m -20.00004,48.00002 c 0,-1.6806 -1.3194,-3 -3,-3 -1.6805,0 -3,1.3194 -3,3 0,1.6805 1.3195,3 3,3 1.6806,0 3,-1.3195 3,-3 z m -20,-24 c 0,-1.6806 -1.3194,-3.00002 -3,-3.00002 -1.6805,0 -3,1.31942 -3,3.00002 0,1.6805 1.3195,3 3,3 1.6806,0 3,-1.3195 3,-3 z" /></g></svg>
                </div>
                <div className='flash-progress-container'>
                    <div className='flash-progress-wrap'>
                        <div  id='prog-bar' className='flash-progress-bar'></div>
                    </div>
                    <h6 className='flash-progress-label'>{count+1}/{this.props.cards.length}</h6>
                </div>
                <div id='flash-back' className='flash-back'>
                    <h2 className='flash-back-main'>Nice work!</h2>
                    <p className='flash-back-sub'>You just studied {this.props.cards.length} terms!</p>
                    <button className='create-set-button' onClick={() => this.handleStartOver()}>Start Over</button>
                </div>
                <div className='flash-content-main'>
                     <div className='flash-sidebar-menu'>
                         <div className='flash-side-progress-container'>
                            <div className='flash-progress-wrap'>
                                <div  id='prog-bar' className='flash-progress-bar'></div>
                            </div>
                            <div className='flash-side-progress-label-container'>
                                <h6 className='flash-progress-label'>PROGRESS</h6>
                                <h6 className='flash-progress-label'>{count+1}/{this.props.cards.length}</h6>  
                            </div>
                         </div>
                     </div>
                    <div  id='flip-container' className='flip-container' onClick={() => this.handleFlip()}>
                        <div className='flipper'>
                            <div className='flash-card-term'>
                                <p className='flash-term'>{(this.props.cards[count]) ? this.props.cards[count].term : 'Term'}</p>
                            </div>
                            <div className='flash-card-def'>
                                <p className='flash-def'>{(this.props.cards[count]) ? this.props.cards[count].definition : 'Definition'}</p>
                                <img src={(this.props.cards[count]) ? this.props.cards[count].imageurl : placeholderImg} alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className='flash-footer'>
                        <div id='prev' className='flash-circle-icon' onClick={() => this.handlePrevious()}>
                            <svg className='set-circle-svg' xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100"><g transform="translate(0,-952.36218)"><path  d="M 72 8 L 28 50 L 72 92 L 72 8 z " transform="translate(0,952.36218)"/></g></svg>
                        </div>
                        <div id='next' className='flash-circle-icon' onClick={() => this.handleNext()}>
                            <svg className='set-circle-svg' xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100"><g transform="translate(0,-952.36218)"><path  d="M 28 8 L 28 92 L 72 50 L 28 8 z " transform="translate(0,952.36218)"/></g></svg>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export function mapStateToProps(state) {
    return {
        cards: state.cards
    }
}

export default connect(mapStateToProps, {getCards})(Flashcards);