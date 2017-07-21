import React, { Component } from 'react';
import Header from './Header';
import {Link} from 'react-router-dom';
import axios from 'axios';

class CreateSet extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            setid: null,
            description: '',
            cards: [
                {
                    id: null,
                    term: '',
                    definition: '',
                    imageurl: ''
                },
                {
                    id: null,
                    term: '',
                    definition: '',
                    imageurl: ''
                },
                {
                    id: null,
                    term: '',
                    definition: '',
                    imageurl: ''
                },
                {
                    id: null,
                    term: '',
                    definition: '',
                    imageurl: ''
                },
                {
                    id: null,
                    term: '',
                    definition: '',
                    imageurl: ''
                }
            ]
        }
        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleAddCardClick = this.handleAddCardClick.bind(this);
        this.openOverlay = this.openOverlay.bind(this);
        this.closeOverlay = this.closeOverlay.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
    }

// will send new set of cards to reducer to be sent to the database
handleCreateClick() {
    const uniqSetId = new Date().getTime() + (Math.floor(Math.random() * (9223372000000000 - 0)) + 0);
    const uniqueCardId = Math.floor(Math.random() * (9223372000000000 - 0)) + 0;

    const {title, cards} = this.state;

    // map through all the cards and set the id to increment by 1
    const tempCards = cards.map((card, i) => {
        return {...card, id: uniqueCardId + i};
    });

    // create a new set of cards to be sent to reducer
    const newSet = {
        id: uniqSetId,
        title,
        creatorname: 'jae',
        creatorid: 123456,
        numofterms: cards.length,
        description: '',
        cards: tempCards
    } 
    console.log(newSet);

    //send new set to reducer
    axios.post('http://localhost:3001/api/add-set', newSet)

    // reset initial state and clear form 
    this.setState({
            title: '',
            setid: null,
            description: '',
            cards: [
                {
                    id: null,
                    term: '',
                    definition: '',
                    imageurl: ''
                },
                {
                    id: null,
                    term: '',
                    definition: '',
                    imageurl: ''
                },
                {
                    id: null,
                    term: '',
                    definition: '',
                    imageurl: ''
                },
                {
                    id: null,
                    term: '',
                    definition: '',
                    imageurl: ''
                },
                {
                    id: null,
                    term: '',
                    definition: '',
                    imageurl: ''
                }
            ]
        })
}

// handle title change
handleTitleChange(e) {
    this.setState({
        title: e
    });
}

// handle the term change by individual card
handleTermChange(i, e) {
    const cards = this.state.cards;
    cards[i].term = e.target.value;
    this.setState({
        cards
    });
}

// handle the definition change by individual card
handleDefChange(i, e) {
    const cards = this.state.cards;
    cards[i].definition = e.target.value;
    this.setState({
        cards
    });
}

// add new blank card to list of cards
handleAddCardClick() {
    const newCard = {
        id: null,
        term: '',
        definition: '',
        imageurl: ''
    }

    let cards = this.state.cards;
    cards.push(newCard);

    this.setState({
        cards
    });
}


// ============= logic for overlay ===================
openOverlay() {
    document.getElementById('optionsOverlay').style.width = '100%';
}

closeOverlay() {
    this.setState({description: this.state.description});
    document.getElementById('optionsOverlay').style.width = '0%';
}
handleDescChange(e) {
    this.setState({description: e});
}

    render() {

// logic for mapping blank cards to display
const blankCards = this.state.cards.map( (card, i) => {
    return <div className='blank-card' key={i}>
                <div className='blank-card-input-container'>
                    <div className='create-term-and-label'>
                        <input 
                        onChange={this.handleTermChange.bind(this, i)} 
                        className='create-input' type="text" 
                        placeholder='Enter term'
                        />
                        <h4 className='create-title-label'>TERM</h4>
                    </div>
                    <div className='create-term-and-label'>
                        <input 
                        onChange={this.handleDefChange.bind(this, i)}
                        className='create-input' 
                        type="text" 
                        placeholder='Enter definition'
                        />
                        <h4 className='create-title-label'>DEFINITION</h4>
                    </div>
                    
                </div>
                <div className='blank-card-footer'>
                    <h3 className='blank-card-number'>{i + 1}</h3>
                    <div className='blank-footer-icons-container'>
                        <svg className='blank-card-svg' id="more" viewBox="0 0 22 6" width="100%" height="100%"><path d="M3.324.266a2.48 2.48 0 0 0-1.816.761 2.48 2.48 0 0 0-.762 1.817c0 .703.254 1.308.762 1.816a2.48 2.48 0 0 0 1.816.762 2.48 2.48 0 0 0 1.817-.762 2.48 2.48 0 0 0 .761-1.816 2.48 2.48 0 0 0-.761-1.817A2.48 2.48 0 0 0 3.324.266zm15.352 0c-.703 0-1.299.254-1.787.761a2.53 2.53 0 0 0-.733 1.817c0 .703.244 1.308.733 1.816a2.385 2.385 0 0 0 1.787.762 2.48 2.48 0 0 0 1.816-.762 2.48 2.48 0 0 0 .762-1.816 2.48 2.48 0 0 0-.762-1.817 2.48 2.48 0 0 0-1.816-.761zM11 .266a2.48 2.48 0 0 0-1.816.761 2.48 2.48 0 0 0-.762 1.817c0 .703.254 1.308.762 1.816A2.48 2.48 0 0 0 11 5.422a2.48 2.48 0 0 0 1.816-.762 2.48 2.48 0 0 0 .762-1.816 2.48 2.48 0 0 0-.762-1.817A2.48 2.48 0 0 0 11 .266z" fillRule="evenodd"></path></svg>
                        <svg className='blank-card-svg' id="list-add" viewBox="0 0 26 19" width="100%" height="100%"><path d="M15.578 5.777H.08v2.52h15.498v-2.52zm0-5.01H.08v2.52h15.498V.767zm5.186 10.05v-5.04h-2.608v5.04H13v2.519h5.156v5.01h2.608v-5.01h5.156v-2.52h-5.156zM.08 13.335h10.342v-2.52H.08v2.52z" fillRule="evenodd"></path></svg>
                        <svg className='blank-card-svg' id="image" viewBox="0 0 22 21" width="100%" height="100%"><path d="M21.254 18.46V2.524c0-.605-.22-1.137-.66-1.596a2.162 2.162 0 0 0-1.624-.69H3.03c-.605 0-1.137.225-1.596.674-.46.45-.689.986-.689 1.611v15.938c0 .644.225 1.186.674 1.626.45.44.986.66 1.611.66h15.94c.644 0 1.186-.22 1.626-.66.44-.44.659-.982.659-1.626zM7.016 12.192l2.87 3.457 3.985-5.156 5.098 6.856H3.03l3.985-5.157z" fillRule="evenodd"></path></svg>
                    </div>
                     <svg className='blank-card-svg' id="more-tablet" viewBox="0 0 22 6" width="100%" height="100%"><path d="M3.324.266a2.48 2.48 0 0 0-1.816.761 2.48 2.48 0 0 0-.762 1.817c0 .703.254 1.308.762 1.816a2.48 2.48 0 0 0 1.816.762 2.48 2.48 0 0 0 1.817-.762 2.48 2.48 0 0 0 .761-1.816 2.48 2.48 0 0 0-.761-1.817A2.48 2.48 0 0 0 3.324.266zm15.352 0c-.703 0-1.299.254-1.787.761a2.53 2.53 0 0 0-.733 1.817c0 .703.244 1.308.733 1.816a2.385 2.385 0 0 0 1.787.762 2.48 2.48 0 0 0 1.816-.762 2.48 2.48 0 0 0 .762-1.816 2.48 2.48 0 0 0-.762-1.817 2.48 2.48 0 0 0-1.816-.761zM11 .266a2.48 2.48 0 0 0-1.816.761 2.48 2.48 0 0 0-.762 1.817c0 .703.254 1.308.762 1.816A2.48 2.48 0 0 0 11 5.422a2.48 2.48 0 0 0 1.816-.762 2.48 2.48 0 0 0 .762-1.816 2.48 2.48 0 0 0-.762-1.817A2.48 2.48 0 0 0 11 .266z" fillRule="evenodd"></path></svg>

                </div>
            </div>
} );

        return (
            <div>
                {/********************** OVERLAY ***********************/}
                <div id='optionsOverlay' className='overlay'>
                    <div className='header-container'>
                        <h1 className='header'>Options</h1>
                        <span onClick={() => this.closeOverlay()} className='close-btn'>&times;</span>
                    </div>
                    <div className='overlay-content' style={{padding: "1rem"}}>
                        <input 
                            type="text" 
                            className='create-input' 
                            placeholder='(Optional)'
                            onChange={(e) => this.handleDescChange(e.target.value)}
                            />
                        <h4 className='create-title-label'>DESCRIPTION</h4>
                        <button className='overlay-save-btn' onClick={() => this.closeOverlay()} >Save</button>
                    </div>
                </div>
                {/********************** HEADER ***********************/}
                <Header/>
                {/********************** MAIN BODY ***********************/}
                    <div className='create-title-container' >
                        <h2>Create a new study set</h2>
                        <div className='options-container' onClick={() => this.openOverlay()}>
                            <svg id='create-options-svg' className='create-svg' version="1.1" x="0px" y="0px" viewBox="0 0 100 100"><g transform="translate(0,-952.36218)"><path d="m 89.00002,1026.3622 c 0,1.1046 -0.89543,2 -2,2 l -28.31254,0 c -0.8727,2.8728 -3.5439,5 -6.6875,5 -3.1435,0 -5.8147,-2.1272 -6.6875,-5 l -32.3125,0 c -1.1046,0 -2,-0.8954 -2,-2 0,-1.1046 0.8954,-2 2,-2 l 32.3125,0 c 0.8728,-2.8729 3.544,-5 6.6875,-5 3.1436,0 5.8148,2.1271 6.6875,5 l 28.31254,0 c 1.10457,0 2,0.8954 2,2 z m 0,-24 c 0,1.1046 -0.89543,2 -2,2 l -48.31254,0 c -0.8727,2.8728 -3.544,5 -6.6875,5 -3.1435,0 -5.8147,-2.1272 -6.6875,-5 l -12.3125,0 c -1.1046,0 -2,-0.8954 -2,-2 0,-1.1046 0.8954,-2 2,-2 l 12.3125,0 c 0.8728,-2.87288 3.544,-5.00002 6.6875,-5.00002 3.1435,0 5.8148,2.12714 6.6875,5.00002 l 48.31254,0 c 1.10457,0 2,0.8954 2,2 z m 0,-24.00002 c 0,1.1046 -0.89543,2 -2,2 l -8.3125,0 c -0.87275,2.87286 -3.54399,5 -6.6875,5 -3.14354,0 -5.81474,-2.12714 -6.68754,-5 l -52.3125,0 c -1.1046,0 -2,-0.8954 -2,-2 0,-1.1046 0.8954,-2 2,-2 l 52.3125,0 c 0.8728,-2.87286 3.544,-5 6.68754,-5 3.14351,0 5.81475,2.12714 6.6875,5 l 8.3125,0 c 1.10457,0 2,0.8954 2,2 z m -14,0 c 0,-1.68054 -1.31946,-3 -3,-3 -1.68054,0 -3.00004,1.31946 -3.00004,3 0,1.68054 1.3195,3 3.00004,3 1.68054,0 3,-1.31946 3,-3 z m -20.00004,48.00002 c 0,-1.6806 -1.3194,-3 -3,-3 -1.6805,0 -3,1.3194 -3,3 0,1.6805 1.3195,3 3,3 1.6806,0 3,-1.3195 3,-3 z m -20,-24 c 0,-1.6806 -1.3194,-3.00002 -3,-3.00002 -1.6805,0 -3,1.31942 -3,3.00002 0,1.6805 1.3195,3 3,3 1.6806,0 3,-1.3195 3,-3 z" stroke="none" visibility="visible" display="inline" overflow="visible"/></g></svg>
                        </div>
                        <button className='create-button-small'>Create</button>
                    </div>
                    {/********************** TITLE INPUT ***********************/}
                    <div className='create-title-input-container'>
                        <input 
                            onChange={(e) => this.handleTitleChange(e.target.value)} 
                            className='create-input' type='text' 
                            placeholder='Subject, chapter, unit'
                            />
                        <h4 className='create-title-label'>TITLE</h4>
                        <div className='create-tablet-options-container'>
                            <div className='tablet-option-container'>
                                <svg className='set-circle-svg' xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24" x="0px" y="0px"><path d="M22 7l-5 4.994v-3.994h-14v-2h14v-4zM7 16h14v2h-14v3.993l-5-4.993 5-4.994v4z"/></svg>
                            </div>
                            <div className='tablet-option-container'>
                                <svg className='set-circle-svg' xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 16 16" ><path d="M14,3H3C2.448,3,2,3.448,2,4v7c0,0.552,0.448,1,1,1h11c0.552,0,1-0.448,1-1V4C15,3.448,14.552,3,14,3z M8,5h1v1H8V5z M8,7h1  v1H8V7z M6,5h1v1H6V5z M6,7h1v1H6V7z M5,8H4V7h1V8z M5,6H4V5h1V6z M11,10H6V9h5V10z M11,8h-1V7h1V8z M11,6h-1V5h1V6z M13,8h-1V7h1V8  z M13,6h-1V5h1V6z"/></svg>
                            </div>
                            <div className='tablet-option-container' onClick={() => this.openOverlay()}>
                                <svg id='info' className='set-circle-svg' xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 32 32"><g display="none"><g display="inline"><path stroke="#666666" strokeMiterlimit="10" d="M13.813,4.877V0.5h4.554v4.377H13.813z M13.813,31.5V9.043h4.554    V31.5H13.813z"/></g></g><g display="none"><g display="inline"><g><path d="M18.866,32h-5.554V8.543h5.554V32z M14.312,31h3.554V9.543h-3.554V31z M18.866,5.377h-5.554V0h5.554     V5.377z M14.312,4.377h3.554V1h-3.554V4.377z"/></g></g></g><g display="none"><g display="inline"><g><path d="M18.866,32h-5.554V8.543h5.554V32z M14.312,31h3.554V9.543h-3.554V31z M18.866,5.377h-5.554V0h5.554     V5.377z M14.312,4.377h3.554V1h-3.554V4.377z"/></g></g></g><g><rect x="13.634" width="4.733" height="4.518"/><rect x="13.634" y="8.818" width="4.733" height="23.182"/></g></svg>
                            </div>
                        </div>
                    </div>
                    {/********************** TERMS CONTAINER ***********************/}
                <div className='create-terms-container'>
                    <div className='flip-terms-button'>
                        <svg className='flip-button-svg' xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 30" x="0px" y="0px"><path d="M22 7l-5 4.994v-3.994h-14v-2h14v-4zM7 16h14v2h-14v3.993l-5-4.993 5-4.994v4z"/></svg>
                        Flip terms and definitions
                    </div>
                    {blankCards}
                    {/********************** ADD CARD BUTTON ***********************/}
                    <div className='add-card' onClick={() => this.handleAddCardClick()}>
                        <h5>+ ADD CARD</h5>
                    </div>
                    {/********************** CREATE SET BUTTON ***********************/}
                    <div className='create-set-button-container'>
                        <Link to='/activity'>
                            <button onClick={() => this.handleCreateClick()} className='create-set-button'>
                            Create
                            </button>
                        </Link>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default CreateSet;