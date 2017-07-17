import React, { Component } from 'react';
import Header from './Header';

class CreateSet extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            cards: [
                {
                    term: '',
                    definition: ''
                },
                {
                    term: '',
                    definition: ''
                },
                {
                    term: '',
                    definition: ''
                },
                {
                    term: '',
                    definition: ''
                },
                {
                    term: '',
                    definition: ''
                }
            ]
        }
        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

handleCreateClick() {
    console.log("create button clicked");
}

handleTitleChange(e) {
    this.setState({
        title: e
    });
    console.log("title:", this.state.title);
}

handleTermChange(i, e) {
    const card = this.state.cards[i];
    card.term = e.target.value;
    console.log(this.state.cards);
}

    render() {

const blankCards = this.state.cards.map( (card, i) => {
    return <div className='blank-card' key={i}>
                        <div className='blank-card-input-container'>
                            <input 
                                onChange={this.handleTermChange.bind(this, i)} 
                                className='create-input' type="text" 
                                placeholder='Enter term'
                                />
                            <h4 className='create-title-label'>TERM</h4>
                            <input className='create-input' type="text" placeholder='Enter definition'/>
                            <h4 className='create-title-label'>DEFINITION</h4>
                        </div>
                        <div className='blank-card-footer'>
                            <h3>{i + 1}</h3>
                            <div className='blank-footer-icons-container'>
                                <svg className='blank-card-svg' id="more" viewBox="0 0 22 6" width="100%" height="100%">
                                    <path 
                                        d="M3.324.266a2.48 2.48 0 0 0-1.816.761 2.48 2.48 0 0 0-.762 1.817c0 .703.254 1.308.762 1.816a2.48 2.48 0 0 0 1.816.762 2.48 2.48 0 0 0 1.817-.762 2.48 2.48 0 0 0 .761-1.816 2.48 2.48 0 0 0-.761-1.817A2.48 2.48 0 0 0 3.324.266zm15.352 0c-.703 0-1.299.254-1.787.761a2.53 2.53 0 0 0-.733 1.817c0 .703.244 1.308.733 1.816a2.385 2.385 0 0 0 1.787.762 2.48 2.48 0 0 0 1.816-.762 2.48 2.48 0 0 0 .762-1.816 2.48 2.48 0 0 0-.762-1.817 2.48 2.48 0 0 0-1.816-.761zM11 .266a2.48 2.48 0 0 0-1.816.761 2.48 2.48 0 0 0-.762 1.817c0 .703.254 1.308.762 1.816A2.48 2.48 0 0 0 11 5.422a2.48 2.48 0 0 0 1.816-.762 2.48 2.48 0 0 0 .762-1.816 2.48 2.48 0 0 0-.762-1.817A2.48 2.48 0 0 0 11 .266z" fillRule="evenodd">
                                    </path>
                                </svg>
                                <svg className='blank-card-svg' id="list-add" viewBox="0 0 26 19" width="100%" height="100%">
                                    <path 
                                        d="M15.578 5.777H.08v2.52h15.498v-2.52zm0-5.01H.08v2.52h15.498V.767zm5.186 10.05v-5.04h-2.608v5.04H13v2.519h5.156v5.01h2.608v-5.01h5.156v-2.52h-5.156zM.08 13.335h10.342v-2.52H.08v2.52z" fillRule="evenodd">
                                    </path>
                                </svg>
                                <svg className='blank-card-svg' id="image" viewBox="0 0 22 21" width="100%" height="100%">
                                    <path 
                                        d="M21.254 18.46V2.524c0-.605-.22-1.137-.66-1.596a2.162 2.162 0 0 0-1.624-.69H3.03c-.605 0-1.137.225-1.596.674-.46.45-.689.986-.689 1.611v15.938c0 .644.225 1.186.674 1.626.45.44.986.66 1.611.66h15.94c.644 0 1.186-.22 1.626-.66.44-.44.659-.982.659-1.626zM7.016 12.192l2.87 3.457 3.985-5.156 5.098 6.856H3.03l3.985-5.157z" fillRule="evenodd">
                                    </path>
                                </svg>
                            </div>
                        </div>
                    </div>
} )

        return (
            <div>
                <Header/>
                    <div className='create-title-container' >
                        <h2>Create a new study set</h2>
                        <div className='options-container'><svg className='create-svg' version="1.1" x="0px" y="0px" viewBox="0 0 100 100"><g transform="translate(0,-952.36218)">
                            <path d="m 89.00002,1026.3622 c 0,1.1046 -0.89543,2 -2,2 l -28.31254,0 c -0.8727,2.8728 -3.5439,5 -6.6875,5 -3.1435,0 -5.8147,-2.1272 -6.6875,-5 l -32.3125,0 c -1.1046,0 -2,-0.8954 -2,-2 0,-1.1046 0.8954,-2 2,-2 l 32.3125,0 c 0.8728,-2.8729 3.544,-5 6.6875,-5 3.1436,0 5.8148,2.1271 6.6875,5 l 28.31254,0 c 1.10457,0 2,0.8954 2,2 z m 0,-24 c 0,1.1046 -0.89543,2 -2,2 l -48.31254,0 c -0.8727,2.8728 -3.544,5 -6.6875,5 -3.1435,0 -5.8147,-2.1272 -6.6875,-5 l -12.3125,0 c -1.1046,0 -2,-0.8954 -2,-2 0,-1.1046 0.8954,-2 2,-2 l 12.3125,0 c 0.8728,-2.87288 3.544,-5.00002 6.6875,-5.00002 3.1435,0 5.8148,2.12714 6.6875,5.00002 l 48.31254,0 c 1.10457,0 2,0.8954 2,2 z m 0,-24.00002 c 0,1.1046 -0.89543,2 -2,2 l -8.3125,0 c -0.87275,2.87286 -3.54399,5 -6.6875,5 -3.14354,0 -5.81474,-2.12714 -6.68754,-5 l -52.3125,0 c -1.1046,0 -2,-0.8954 -2,-2 0,-1.1046 0.8954,-2 2,-2 l 52.3125,0 c 0.8728,-2.87286 3.544,-5 6.68754,-5 3.14351,0 5.81475,2.12714 6.6875,5 l 8.3125,0 c 1.10457,0 2,0.8954 2,2 z m -14,0 c 0,-1.68054 -1.31946,-3 -3,-3 -1.68054,0 -3.00004,1.31946 -3.00004,3 0,1.68054 1.3195,3 3.00004,3 1.68054,0 3,-1.31946 3,-3 z m -20.00004,48.00002 c 0,-1.6806 -1.3194,-3 -3,-3 -1.6805,0 -3,1.3194 -3,3 0,1.6805 1.3195,3 3,3 1.6806,0 3,-1.3195 3,-3 z m -20,-24 c 0,-1.6806 -1.3194,-3.00002 -3,-3.00002 -1.6805,0 -3,1.31942 -3,3.00002 0,1.6805 1.3195,3 3,3 1.6806,0 3,-1.3195 3,-3 z" stroke="none" visibility="visible" display="inline" overflow="visible"/></g>
                        </svg></div>
                    </div>
                    <div className='create-title-input-container'>
                        <input onChange={(e) => this.handleTitleChange(e.target.value)} className='create-input' type='text' placeholder='Subject, chapter, unit'/>
                        <h4 className='create-title-label'>TITLE</h4>
                    </div>
                <div className='create-terms-container'>
                    <div className='flip-terms-button'>
                        <svg className='flip-button-svg' xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 30" x="0px" y="0px">
                            <path d="M22 7l-5 4.994v-3.994h-14v-2h14v-4zM7 16h14v2h-14v3.993l-5-4.993 5-4.994v4z"/>
                        </svg>
                        Flip terms and definitions
                    </div>
                    {blankCards}
                    <div className='add-card'>
                        <h5>+ ADD CARD</h5>
                    </div>
                    <button onClick={() => this.handleCreateClick()} className='create-set-button'>
                        Create
                    </button>
                </div>
            </div>
        );
    }
}

export default CreateSet;