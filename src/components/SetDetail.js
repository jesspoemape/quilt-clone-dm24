import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getSetInfo, getCards, getSSInfo} from './../ducks/reducer';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';

class SetDetail extends Component {
    constructor() {
        super();
        this.state={
            redirectToNewPage: false
        }

        this.handleMoreClick = this.handleMoreClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCopyClick = this.handleCopyClick.bind(this);
    }

componentWillMount() {
    const setId = this.props.match.params.id;
    const setUrl = `/api/get-set-info/${setId}`;
    const cardUrl = `/api/get-cards/${setId}`;
        axios.get(setUrl).then(response => this.props.getSetInfo(response.data)).catch(console.error, 'Error');
        axios.get(cardUrl).then(response => this.props.getCards(response.data)).catch(console.error, 'Error');
}
componentWillReceiveProps() {
    this.forceUpdate();
}

handleMoreClick() {
    document.getElementById('more-popup').classList.toggle("show");
    document.getElementById('more-menu').classList.toggle("show");
}
handleDelete() {
    axios.get('/auth/me').then(res => {
        if (res.data.id + '' === this.props.setInfo.creatorid + '') {
            axios.delete(`/api/delete-own-set/${this.props.setInfo.id}/${res.data.id}`)
            .then(() => axios.get('/auth/me')
            .then(res => axios.get(`/api/user-info/${res.data.id}`)
            .then(res => {res.data[0].studiedsets.map((setId) => {
                return axios.get(`/api/get-set-info/${setId}`).then( res => this.props.getSSInfo(res.data) ) }) })
                .then(() => this.setState({redirectToNewPage: true}))
                ))
        }
        else {
            axios.post(`/api/remove-set/${this.props.setInfo.id}/${res.data.id}`).then(() => this.setState({redirectToNewPage: true})).catch(console.error, 'Error')
        }
    })
    .catch(console.error, 'Error');
}
handleCopyClick() {
    axios.get('/auth/me').then(res => {
        if (res.data.id + '' !== this.props.setInfo.creatorid + '') {
            axios.post(`/api/add-to-users-sets/${this.props.setInfo.id}/${res.data.id}`, this.props.setInfo.id+'')
            .then(() => alert('Set added!'))
            .catch(console.error, 'Error');
        }
        else {
            alert('Oops! That set is already in your list of sets!');
        }
    }).catch(console.error, 'Error');
}

    render() {
    if (this.state.redirectToNewPage) {
        this.setState({redirectToNewPage: false});
    return <Redirect to='/activity' push/>}

        const cards = this.props.cards.map((card, i) => {
            return <div className='set-card' key={i}> 
                    <div className='card-icon-header'>
                        <svg className='card-svg' xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100"><g transform="translate(0,-952.36218)"><path d="m 73.0048,1039.3482 a 2.0055958,1.9948186 0 0 0 1.8506,-2.2169 l -2.7962,-23.956 16.4126,-17.72176 A 2.0055958,1.9948186 0 0 0 87.3912,992.1349 L 63.6164,987.39207 51.7426,966.37851 a 2.0055958,1.9948186 0 0 0 -3.4852,0 l -11.8738,21.01356 -23.7748,4.74283 a 2.0055958,1.9948186 0 0 0 -1.0806,3.31864 l 16.4126,17.72176 -2.7962,23.956 a 2.0055958,1.9948186 0 0 0 2.8233,2.0422 L 50,1029.1101 l 22.0322,10.0634 a 2.0055958,1.9948186 0 0 0 0.9726,0.1747 z m -2.5396,-5.2803 -19.6277,-8.9616 a 2.0055958,1.9948186 0 0 0 -1.675,0 l -19.6277,8.9616 2.4991,-21.336 a 2.0055958,1.9948186 0 0 0 -0.5133,-1.5854 L 16.891,995.35949 38.0586,991.12722 a 2.0055958,1.9948186 0 0 0 1.3508,-0.98081 L 50,971.41693 60.5906,990.14641 a 2.0055958,1.9948186 0 0 0 1.3508,0.98081 l 21.1676,4.23227 -14.6296,15.78701 a 2.0055958,1.9948186 0 0 0 -0.5133,1.5854 l 2.4991,21.336 z"/></g></svg>
                        <svg className='card-svg' xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" ><g><path d="M62.984,31.699c-1.242-1.094-3.139-0.975-4.234,0.266c-1.096,1.244-0.977,3.139,0.266,4.234   C62.23,39.033,64,43.562,64,48.949c0,4.951-1.592,8.691-5.009,11.771c-1.23,1.109-1.329,3.008-0.22,4.238   c0.593,0.656,1.409,0.99,2.229,0.99c0.716,0,1.435-0.254,2.008-0.771C67.648,60.996,70,55.537,70,48.949   C70,41.814,67.508,35.689,62.984,31.699z"/><path d="M75.179,21.887c-1.139-1.201-3.037-1.254-4.241-0.115c-1.203,1.139-1.256,3.037-0.116,4.24   c5.932,6.268,9.198,14.363,9.198,22.797c0,8.67-3.318,16.855-9.342,23.049c-1.155,1.188-1.129,3.088,0.059,4.242   c0.583,0.568,1.338,0.85,2.092,0.85c0.781,0,1.562-0.303,2.15-0.908c7.12-7.318,11.041-16.99,11.041-27.232   C86.02,38.834,82.17,29.273,75.179,21.887z"/><path d="M48,21.949h-3c-0.754,0-1.48,0.285-2.035,0.797L30.827,33.949H21c-0.041,0-0.081,0.002-0.121,0.004   C17.711,34.08,13,36.316,13,41.949v13c0,3.217,2.131,8,8,8h9.9L43.062,73.24c0.541,0.457,1.229,0.709,1.938,0.709h3   c2.01,0,5-1.598,5-6v-40C53,24.969,51.283,21.949,48,21.949z"/></g></svg>
                    </div>
                    <div className='set-card-term-and-def'>
                        <h3 className='card-term'>{ card.term }</h3>
                        <p className='card-def'>{ card.definition }</p>
                        {
                            (card.imageurl) ? 
                                <div className='card-image-wrapper'>
                                    <img className='card-image' src={card.imageurl} alt=""/>
                                </div>   
                            :
                            <div></div>
                        }
                    </div>
                </div>
        });

        return (
            <div>
            <Header/>
            {/*********************** SET INFO ************************/}
            <div className='set-user-header'>
                <h4 className='dark-label'>{ this.props.setInfo ? this.props.setInfo.numofterms : 'X' } terms</h4>
                <p className='set-user-p'>{ this.props.setInfo ? this.props.setInfo.creatorname : '...' }</p>
            </div>
            <div className='set-title-header'>
                <h1>{this.props.setInfo ? this.props.setInfo.title : 'Title'}</h1>
            </div>
            <div className='set-description-header'>
                <h4>{this.props.setInfo ? this.props.setInfo.description : 'Description'}</h4>
            </div>
            {/*********************** CIRCLE ICONS ************************/}
            <div className='circle-icons-container'>
                <div onClick={() => this.handleCopyClick()} className='circle-icon'>
                    <svg id='copy' className='set-circle-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" version="1.1" x="0px" y="0px"><title>7.4</title><desc>Created with Sketch.</desc><g stroke="none" strokeWidth="1" fillRule="evenodd"><g fillRule="nonzero"><g><path d="M20,36 L20,40 L24.9991283,40 L2.00174332,40 C0.89621101,40 0,39.1084602 0,38.0027084 L0,1.99729162 C0,0.894217919 0.889261723,0 2.00174332,0 L29.9982567,0 C31.103789,0 32,0.891539827 32,1.99729162 L32,26.0013542 L32,14 L28,14 L28,4 L4,4 L4,36 L10,36 L10,40 L16,40 L16,36 L20,36 Z M28,4 L28,10 L32,10 L32,4 L28,4 Z M16,12.0028592 C16,10.8967106 16.8892617,10 18.0017433,10 L45.9982567,10 C47.103789,10 48,10.9018508 48,12.0028592 L48,45.9971408 C48,47.1032894 47.1107383,48 45.9982567,48 L18.0017433,48 C16.896211,48 16,47.0981492 16,45.9971408 L16,12.0028592 Z M20,44 L44,44 L44,14 L20,14 L20,44 Z M8,38 C8,36.8954305 8.89826062,36 9.99791312,36 L12.0020869,36 C13.1055038,36 14,36.8877296 14,38 C14,39.1045695 13.1017394,40 12.0020869,40 L9.99791312,40 C8.89449617,40 8,39.1122704 8,38 Z M30,2 C31.1045695,2 32,2.89826062 32,3.99791312 L32,6.00208688 C32,7.10550383 31.1122704,8 30,8 C28.8954305,8 28,7.10173938 28,6.00208688 L28,3.99791312 C28,2.89449617 28.8877296,2 30,2 Z"/></g></g></g></svg>
                    <div className='circle-icon-popup top'>Copy</div>
                </div>
                <div className='circle-icon'>
                    <svg id='share' className='set-circle-svg' xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100"><g><path d="M60,40c-23.5,0-44,16-49.7,38.8L10,80c12.8-12.8,30.2-20,48.3-20H60v20l30-30L60,20V40z"/></g></svg>
                    <div className='circle-icon-popup top'>Share</div>
                </div>
                <div className='circle-icon'>
                    <svg id='plus' className='set-circle-svg' xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" ><rect x="5" y="42.5" width="90" height="15"/><rect x="42.5" y="5" width="15" height="90"/></svg>
                    <div className='circle-icon-popup top long'>Add set to class or folder</div>
                </div>
                <div className='circle-icon'>
                    <svg id='info' className='set-circle-svg' xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 32 32"><g display="none"><g display="inline"><path stroke="#666666" strokeMiterlimit="10" d="M13.813,4.877V0.5h4.554v4.377H13.813z M13.813,31.5V9.043h4.554    V31.5H13.813z"/></g></g><g display="none"><g display="inline"><g><path d="M18.866,32h-5.554V8.543h5.554V32z M14.312,31h3.554V9.543h-3.554V31z M18.866,5.377h-5.554V0h5.554     V5.377z M14.312,4.377h3.554V1h-3.554V4.377z"/></g></g></g><g display="none"><g display="inline"><g><path d="M18.866,32h-5.554V8.543h5.554V32z M14.312,31h3.554V9.543h-3.554V31z M18.866,5.377h-5.554V0h5.554     V5.377z M14.312,4.377h3.554V1h-3.554V4.377z"/></g></g></g><g><rect x="13.634" width="4.733" height="4.518"/><rect x="13.634" y="8.818" width="4.733" height="23.182"/></g></svg>
                    <div className='circle-icon-popup top'>Info</div>
                </div>
                <div className='circle-icon' onClick={() => this.handleMoreClick()}>
                    <svg id="more" className='set-circle-svg' viewBox="0 0 22 6" width="100%" height="100%"><path d="M3.324.266a2.48 2.48 0 0 0-1.816.761 2.48 2.48 0 0 0-.762 1.817c0 .703.254 1.308.762 1.816a2.48 2.48 0 0 0 1.816.762 2.48 2.48 0 0 0 1.817-.762 2.48 2.48 0 0 0 .761-1.816 2.48 2.48 0 0 0-.761-1.817A2.48 2.48 0 0 0 3.324.266zm15.352 0c-.703 0-1.299.254-1.787.761a2.53 2.53 0 0 0-.733 1.817c0 .703.244 1.308.733 1.816a2.385 2.385 0 0 0 1.787.762 2.48 2.48 0 0 0 1.816-.762 2.48 2.48 0 0 0 .762-1.816 2.48 2.48 0 0 0-.762-1.817 2.48 2.48 0 0 0-1.816-.761zM11 .266a2.48 2.48 0 0 0-1.816.761 2.48 2.48 0 0 0-.762 1.817c0 .703.254 1.308.762 1.816A2.48 2.48 0 0 0 11 5.422a2.48 2.48 0 0 0 1.816-.762 2.48 2.48 0 0 0 .762-1.816 2.48 2.48 0 0 0-.762-1.817A2.48 2.48 0 0 0 11 .266z" fillRule="evenodd"></path></svg>
                    <div id='more-popup' className='circle-icon-popup top'>More</div>
                    <div id='more-menu' className='more-menu-container'>
                        <div className='more-menu-item'>
                            <h6>Embed</h6>
                        </div>
                        <div className='more-menu-item'>
                            <h6>Scores</h6>
                        </div>
                        <div className='more-menu-item' onClick={() => this.handleDelete()}>
                            <h6>Delete</h6>
                        </div>
                    </div>
                </div>
            </div>
            {/*********************** STUDY OPTIONS ************************/}
            <div className='set-study-options-container'>
                <Link className='link' to={`/flashcards/${this.props.match.params.id}`}><div className='set-study-option'>
                    <svg className='study-option-svg' xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100"><g transform="translate(0,-952.36218)"><path d="M 35 17 C 31.710562 17 29 19.71056 29 23 C 25.710594 23 23 25.71059 23 29 C 19.710595 29 17 31.71059 17 35 L 17 77 C 17 80.2894 19.710595 83 23 83 L 65 83 C 68.289405 83 71 80.2894 71 77 C 74.289406 77 77 74.2894 77 71 C 80.289438 71 83 68.2894 83 65 L 83 23 C 83 19.71056 80.289438 17 77 17 L 35 17 z M 35 21 L 77 21 C 78.142627 21 79 21.85737 79 23 L 79 65 C 79 66.1426 78.142627 67 77 67 L 35 67 C 33.857373 67 33 66.1426 33 65 L 33 23 C 33 21.85737 33.857373 21 35 21 z M 29 27 L 29 65 C 29 68.2894 31.710562 71 35 71 L 73 71 C 73 72.1426 72.142592 73 71 73 L 29 73 C 27.857408 73 27 72.1426 27 71 L 27 29 C 27 27.85741 27.857408 27 29 27 z M 23 33 L 23 71 C 23 74.2894 25.710594 77 29 77 L 67 77 C 67 78.1426 66.142593 79 65 79 L 23 79 C 21.857407 79 21 78.1426 21 77 L 21 35 C 21 33.85741 21.857407 33 23 33 z M 43.8125 42 A 2.0021961 2.0021961 0 1 0 44 46 L 68 46 A 2.0002 2.0002 0 1 0 68 42 L 44 42 A 2.0002 2.0002 0 0 0 43.8125 42 z " transform="translate(0,952.36218)"/></g></svg>
                    <h4 className='study-option-label'>FLASHCARDS</h4>
                </div></Link>
                <div className='set-study-option'>
                    <svg className='study-option-svg' xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100"><g transform="translate(0,-952.36218)"><path d="M 77.84375 17 A 2.0002 2.0002 0 0 0 76.25 18 L 48.25 67 A 2.0002 2.0002 0 0 0 48 68.125 L 49 81.125 A 2.0002 2.0002 0 0 0 51.71875 82.84375 L 64.71875 77.84375 A 2.0002 2.0002 0 0 0 65.75 76.96875 L 93.75 27.96875 A 2.0002 2.0002 0 0 0 93 25.25 L 79 17.25 A 2.0002 2.0002 0 0 0 77.84375 17 z M 78.75 21.71875 L 89.25 27.71875 L 85.03125 35.125 L 74.53125 29.125 L 78.75 21.71875 z M 72.53125 32.59375 L 83.03125 38.59375 L 62.59375 74.375 L 52.78125 78.15625 L 52.03125 68.4375 L 72.53125 32.59375 z M 7.8125 79 A 2.0021961 2.0021961 0 1 0 8 83 L 31 83 A 2.0002 2.0002 0 1 0 31 79 L 8 79 A 2.0002 2.0002 0 0 0 7.8125 79 z M 38 79 C 36.895431 79 36 79.895431 36 81 C 36 82.104569 36.895431 83 38 83 C 39.104569 83 40 82.104569 40 81 C 40 79.895431 39.104569 79 38 79 z " transform="translate(0,952.36218)"/></g></svg>
                    <h4 className='study-option-label'>LEARN</h4>
                </div>
                <div className='set-study-option'>
                    <svg className='study-option-svg' xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" version="1.1" viewBox="0 0 32 32" x="0px" y="0px"><rect width="32" height="32" fill="none"/><g clipRule="nonzero" fillRule="nonzero" shapeRendering="auto"><path d="m24.447 4.9902a1.0001 1.0001 0 0 0 -0.625 1.7461c2.6868 2.4733 4.1777 5.8004 4.1777 9.2637s-1.4909 6.7904-4.1777 9.2637a1.0008 1.0008 0 1 0 1.3555 1.4727c3.0752-2.8307 4.8223-6.6976 4.8223-10.736s-1.7471-7.9056-4.8223-10.736a1.0001 1.0001 0 0 0 -0.73047 -0.27344z"/><path d="m22 9.9902a1.0001 1.0001 0 0 0 -0.71484 1.7109c1.0955 1.1169 1.7148 2.6363 1.7148 4.2227 0 1.5875-0.61932 3.1058-1.7148 4.2227a1.0006 1.0006 0 1 0 1.4297 1.4004c1.4665-1.4951 2.2852-3.5165 2.2852-5.623 0-2.1057-0.81868-4.1299-2.2852-5.625a1.0001 1.0001 0 0 0 -0.71484 -0.30859z"/><path d="m14.852 5.0547c-0.51107 0.10235-0.99296 0.35722-1.3691 0.74609-1.479 1.528-3.2003 3.305-4.2441 4.3828-0.42638 0.44048-0.98071 0.68002-1.5566 0.6875-1.1796 0.005608-2.0834 0.025261-2.8379 0.12891-0.75651 0.10393-1.4255 0.30051-1.9434 0.78906-0.5179 0.48856-0.7307 1.1603-0.81836 1.834-0.087658 0.67372-0.082031 1.4252-0.082031 2.377 0 0.9515-0.00564 1.7034 0.082031 2.377 0.087668 0.67356 0.3005 1.3456 0.81836 1.834 0.51786 0.48841 1.1869 0.68495 1.9434 0.78906 0.75435 0.10383 1.6583 0.1228 2.8379 0.12891 0.57462 0.0075 1.1303 0.24702 1.5566 0.6875 1.0444 1.0774 2.7651 2.8548 4.2441 4.3828 0.75235 0.77774 1.9246 1.017 2.9141 0.57812a1.0001 1.0001 0 0 0 2e-3 0c0.9897-0.44061 1.6015-1.4395 1.6015-2.5176v-16.52c0-1.0781-0.61181-2.077-1.6016-2.5176a1.0001 1.0001 0 0 0 -2e-3 0c-0.4947-0.21944-1.0338-0.27032-1.5449-0.16797zm0.73438 1.9961c0.23156 0.10385 0.41406 0.36822 0.41406 0.68945v16.52c0 0.32124-0.1825 0.5856-0.41406 0.68945-0.2325 0.10312-0.47037 0.06163-0.66602-0.14062-1.479-1.528-3.2005-3.3062-4.2461-4.3848-0.78362-0.80952-1.8494-1.2804-2.9668-1.2949a1.0001 1.0001 0 0 0 -0.00781 0c-1.1631-0.005945-2.018-0.033692-2.582-0.11133s-0.77474-0.19663-0.84375-0.26172c-0.069014-0.065089-0.14993-0.18303-0.20898-0.63672-0.059051-0.45369-0.064453-1.1676-0.064453-2.1191 0-0.95175 0.00539-1.6652 0.064453-2.1191 0.059061-0.45393 0.14001-0.57165 0.20898-0.63672 0.068977-0.06507 0.2798-0.1862 0.84375-0.26367 0.56396-0.07748 1.4189-0.10392 2.582-0.10938a1.0001 1.0001 0 0 0 0.00781 0c1.1181-0.01452 2.1851-0.4854 2.9687-1.2949 1.0442-1.0782 2.7651-2.8568 4.2441-4.3848 0.19565-0.20225 0.43351-0.24375 0.66602-0.14062z" /></g></svg>
                    <h4 className='study-option-label'>SPELL</h4>
                </div>
                <div className='set-study-option'>
                    <svg className='study-option-svg' xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100"><path d="M 17.6875 5 A 3.0003 3.0003 0 0 0 15 8 L 15 92 A 3.0003 3.0003 0 0 0 18 95 L 82 95 A 3.0003 3.0003 0 0 0 85 92 L 85 24 A 3.0003 3.0003 0 0 0 84.125 21.875 L 68.125 5.875 A 3.0003 3.0003 0 0 0 66 5 L 18 5 A 3.0003 3.0003 0 0 0 17.6875 5 z M 21 11 L 62 11 L 62 25 A 3.0003 3.0003 0 0 0 65 28 L 79 28 L 79 89 L 21 89 L 21 11 z M 68 14.25 L 75.75 22 L 68 22 L 68 14.25 z M 32.6875 40 A 3.0040663 3.0040663 0 1 0 33 46 L 54.25 46 A 3.0003 3.0003 0 1 0 54.25 40 L 33 40 A 3.0003 3.0003 0 0 0 32.6875 40 z M 32.6875 50 A 3.0040663 3.0040663 0 1 0 33 56 L 67 56 A 3.0003 3.0003 0 1 0 67 50 L 33 50 A 3.0003 3.0003 0 0 0 32.6875 50 z M 32.6875 60 A 3.0040663 3.0040663 0 1 0 33 66 L 67 66 A 3.0003 3.0003 0 1 0 67 60 L 33 60 A 3.0003 3.0003 0 0 0 32.6875 60 z M 32.6875 70 A 3.0040663 3.0040663 0 1 0 33 76 L 54.25 76 A 3.0003 3.0003 0 1 0 54.25 70 L 33 70 A 3.0003 3.0003 0 0 0 32.6875 70 z "/></svg>
                    <h4 className='study-option-label'>TEST</h4>
                </div>
                <div className='set-study-option'>
                    <svg className='study-option-svg' xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100"><g transform="translate(0,-952.36218)"><path d="M 86.75 10.96875 A 2.0002 2.0002 0 0 0 85.59375 11.5625 L 75.8125 21.34375 L 68.03125 13.5625 C 66.866468 12.39772 65.329409 11.7821 63.78125 11.78125 C 62.233222 11.78039 60.709716 12.40844 59.5625 13.5625 L 45.59375 27.59375 A 2.0002 2.0002 0 0 0 45.59375 30.40625 L 69.625 54.4375 A 2.0002 2.0002 0 0 0 72.4375 54.4375 L 86.40625 40.40625 C 88.732007 38.0805 88.732049 34.26331 86.40625 31.9375 L 78.625 24.1875 L 88.40625 14.40625 A 2.0002 2.0002 0 0 0 86.75 10.96875 z M 63.78125 15.78125 C 64.279231 15.78152 64.816612 15.97286 65.21875 16.375 L 83.59375 34.75 C 84.401903 35.55816 84.401859 36.78564 83.59375 37.59375 L 71.03125 50.21875 L 49.8125 29 L 62.375 16.375 C 62.790106 15.95742 63.28314 15.78097 63.78125 15.78125 z M 41.75 40.96875 A 2.0002 2.0002 0 0 0 40.59375 41.5625 L 33.5 48.65625 L 30.375 45.53125 A 2.0002 2.0002 0 0 0 28.9375 44.9375 A 2.0002 2.0002 0 0 0 27.53125 45.53125 L 13.53125 59.53125 C 11.20522 61.85725 11.2053 65.70525 13.53125 68.03125 L 21.34375 75.8125 L 11.59375 85.5625 A 2.0002 2.0002 0 1 0 14.40625 88.40625 L 24.15625 78.65625 L 31.9375 86.40625 C 34.263476 88.73225 38.080274 88.73235 40.40625 86.40625 L 54.40625 72.40625 A 2.0002 2.0002 0 0 0 54.40625 69.5625 L 51.3125 66.5 L 58.40625 59.40625 A 2.0002 2.0002 0 0 0 56.75 55.96875 A 2.0002 2.0002 0 0 0 55.59375 56.5625 L 48.5 63.65625 L 36.3125 51.5 L 43.40625 44.40625 A 2.0002 2.0002 0 0 0 41.75 40.96875 z M 28.96875 49.78125 L 50.15625 71 L 37.59375 83.5625 C 36.785774 84.3705 35.557912 84.3704 34.75 83.5625 L 16.375 65.1875 C 15.567042 64.3795 15.567088 63.1829 16.375 62.375 L 28.96875 49.78125 z " transform="translate(0,952.36218)"/></g></svg>
                    <h4 className='study-option-label'>MATCH</h4>
                </div>
            </div>
            {/*********************** CARDS ************************/}
            <div className='set-card-container'>
                { cards }
            </div>
            <Footer/>
        </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        setInfo: state.setInfo ,
        cards: state.cards || []
    }
}

export default connect(mapStateToProps, {getSetInfo, getCards, getSSInfo})(SetDetail);