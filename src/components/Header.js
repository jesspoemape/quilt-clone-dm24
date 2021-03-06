import React, { Component } from 'react';
import './../css/reset.css';
import './../css/App.css';
import {Link, Redirect} from 'react-router-dom';
import {logout, getSearchResults} from './../ducks/reducer';
import {connect} from 'react-redux';
import axios from 'axios';

class Header extends Component {
    constructor() {
        super();
        this.state={
            redirectToNewPage: false,
            search: '',
            username: ''
        }

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.closeSearch = this.closeSearch.bind(this);
        this.showSearch = this.showSearch.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleArrowMenuClick = this.handleArrowMenuClick.bind(this);
    }
    componentDidMount() {
        axios.get('/auth/me').then(res => this.setState({username: res.data.username}));
    }

showMenu() {
    document.getElementById('menuOverlay').style.width = '100%';
}
closeMenu() {
    document.getElementById('menuOverlay').style.width = '0%';
}
handleLogout() {
    this.props.logout();
}
closeSearch() {
    document.getElementById('search-overlay').style.display = 'none';
    document.getElementById('header').style.display = 'flex';
}
showSearch() {
    document.getElementById('header').style.display = 'none';
    document.getElementById('search-overlay').style.display = 'flex';
}
handleSearch(e) {
    this.setState({search: e})
    document.getElementById('search-input').onkeydown = (ev) => {
        if (ev.keyCode === 13) {
            this.closeSearch();
            axios.get(`/api/full-search/${this.state.search}`).then(res => {
                this.props.getSearchResults(res.data)
            }).then(this.setState({redirectToNewPage: true}))
            .catch(console.error, 'Error');
        }
    }
}
handleArrowMenuClick() {
    document.getElementById('arrow-menu-main').classList.toggle("show");
}

    render() {
        if (this.state.redirectToNewPage) {
            this.setState({redirectToNewPage: false});    
            return <Redirect to={`/search-results/${this.state.search}`} push/>}
        return (
            <div>
                {/********************* MENU OVERLAY ************************/}
                <div id='menuOverlay' className='overlay'>
                        <div className='header-container'>
                            <h1 className='header'>Quizlet</h1>
                            <span onClick={() => this.closeMenu()} className='close-btn'>&times;</span>
                        </div>
                        <div className='overlay-content'>
                            <div className='menu-fixed-container'>
                                <Link className='link' to='/activity'><div className='menu-fixed-item'>
                                    <svg id="clock" viewBox="0 1 16 16"><path d="M8 1a7.74 7.74 0 0 0-3.1.63 8.114 8.114 0 0 0-2.55 1.72A8.146 8.146 0 0 0 .63 5.89 7.719 7.719 0 0 0 0 9c0 1.093.21 2.127.63 3.1.42.973.993 1.823 1.72 2.55a8.146 8.146 0 0 0 2.54 1.72c.967.42 2.003.63 3.11.63a7.74 7.74 0 0 0 3.1-.63 8.114 8.114 0 0 0 2.55-1.72 8.146 8.146 0 0 0 1.72-2.54c.42-.967.63-2.003.63-3.11a7.74 7.74 0 0 0-.63-3.1 8.114 8.114 0 0 0-1.72-2.55 8.146 8.146 0 0 0-2.54-1.72A7.719 7.719 0 0 0 8 1zm3.36 11.36L7.2 9.8V5h1.2v4.16l3.6 2.16-.64 1.04z" fillRule="evenodd"></path></svg>
                                    <h6>Latest Activity</h6>
                                </div></Link>
                                <div className='menu-fixed-item'>
                                    <svg id="cards" viewBox="0 0 24 21"><path d="M.281 5.922v12.773c0 .586.215 1.094.645 1.524.43.43.937.644 1.523.644h14.883v-2.168H2.449V5.922H.281zm4.278 8.555c0 .585.205 1.084.615 1.494.41.41.908.615 1.494.615h14.941c.586 0 1.084-.205 1.495-.615.41-.41.615-.909.615-1.494V2.757c0-.585-.205-1.093-.615-1.523A1.989 1.989 0 0 0 21.609.59H6.668a1.99 1.99 0 0 0-1.494.644c-.41.43-.615.938-.615 1.524v11.719z" fillRule="evenodd"></path></svg>
                                    <h6>Your Study Sets</h6>
                                </div>
                                <Link className='link' to='/settings'><div className='menu-fixed-item'>
                                    <svg id="settings" viewBox="0 0 24 24"><path d="M20.73 13.734c0-.195.01-.385.03-.57a5.754 5.754 0 0 0 0-1.173 5.753 5.753 0 0 1-.03-.6l2.461-1.934a.449.449 0 0 0 .205-.322.53.53 0 0 0-.087-.381l-2.344-4.102a.5.5 0 0 0-.308-.249.5.5 0 0 0-.395.015l-2.93 1.172c-.293-.235-.6-.45-.923-.645a7.267 7.267 0 0 0-1.07-.527l-.41-3.106a.56.56 0 0 0-.19-.322.566.566 0 0 0-.395-.146H9.656A.53.53 0 0 0 9.29.99a.763.763 0 0 0-.22.323l-.41 3.105a5.85 5.85 0 0 0-1.055.513 9.437 9.437 0 0 0-.937.659l-2.93-1.172a.543.543 0 0 0-.41-.015.499.499 0 0 0-.293.25l-2.344 4.1a.504.504 0 0 0-.087.367c.019.127.087.24.205.337l2.46 1.934c0 .195-.01.385-.029.57a5.754 5.754 0 0 0 0 1.173c.02.185.03.386.03.6L.809 15.668a.449.449 0 0 0-.205.322.53.53 0 0 0 .087.381l2.344 4.102a.5.5 0 0 0 .308.249.5.5 0 0 0 .395-.015l2.93-1.172c.293.235.6.45.923.645.322.195.679.37 1.07.527l.41 3.105a.56.56 0 0 0 .19.323.567.567 0 0 0 .395.146h4.688a.53.53 0 0 0 .366-.146.763.763 0 0 0 .22-.323l.41-3.105a5.85 5.85 0 0 0 1.055-.513 9.32 9.32 0 0 0 .937-.659l2.93 1.172a.543.543 0 0 0 .41.015.499.499 0 0 0 .293-.25l2.344-4.1a.504.504 0 0 0 .087-.367.543.543 0 0 0-.205-.337l-2.46-1.934zM12 16.664c-1.133 0-2.1-.395-2.9-1.186-.801-.791-1.202-1.763-1.202-2.915 0-1.133.396-2.1 1.187-2.9C9.876 8.86 10.848 8.46 12 8.46c1.133 0 2.1.395 2.9 1.186.801.791 1.202 1.763 1.202 2.915 0 1.133-.396 2.1-1.187 2.9-.791.802-1.763 1.202-2.915 1.202z" fillRule="evenodd"></path></svg>
                                    <h6>Settings</h6>
                                </div></Link>
                            </div>
                            <div className='menu-classes-container'>
                                <h4 className='create-title-label'>YOUR CLASSES</h4>
                                <div className='menu-create-p'>
                                    <svg id="class-add" viewBox="0 0 30 17"><path d="M9.99 6.74H6.24V2.99H3.75v3.75H0v2.52h3.75v3.75h2.49V9.26h3.75V6.74zM22.5 8a3.613 3.613 0 0 0 2.651-1.099A3.613 3.613 0 0 0 26.25 4.25a3.613 3.613 0 0 0-1.099-2.651A3.613 3.613 0 0 0 22.5.5c-.195 0-.39.015-.586.044a3.31 3.31 0 0 0-.557.132 6.66 6.66 0 0 1 .835 1.67c.205.605.308 1.24.308 1.904 0 .664-.103 1.299-.308 1.904a6.684 6.684 0 0 1-.835 1.67c.176.059.362.103.557.132.195.03.39.044.586.044zm-6.24 0c1.035 0 1.914-.366 2.636-1.099.723-.732 1.084-1.616 1.084-2.651 0-1.035-.36-1.919-1.084-2.651C18.174.866 17.295.5 16.26.5a3.613 3.613 0 0 0-2.652 1.099A3.613 3.613 0 0 0 12.51 4.25c0 1.035.366 1.919 1.098 2.651A3.613 3.613 0 0 0 16.26 8zm8.261 2.695c.528.47.948.996 1.26 1.582.313.586.469 1.25.469 1.993v2.49H30v-2.49c0-.977-.6-1.758-1.802-2.344a14.426 14.426 0 0 0-3.677-1.23zm-8.261-.175c-.625 0-1.367.078-2.227.234-.86.156-1.68.39-2.46.703-.782.313-1.446.703-1.993 1.172-.547.469-.82 1.016-.82 1.64v2.49h15v-2.49c0-.624-.274-1.171-.82-1.64-.547-.469-1.211-.86-1.993-1.172a12.748 12.748 0 0 0-2.46-.703c-.86-.156-1.602-.234-2.227-.234z" fillRule="evenodd"></path></svg>
                                    <p className='menu-create-p'>Join or create a class</p>
                                </div>
                            </div>
                            <div className='menu-folders-container'>
                                <h4 className='create-title-label'>YOUR FOLDERS</h4>
                                <div className='menu-create-p'>
                                    <svg id="folder-add" viewBox="0 0 24 20"><path d="M21.375 3.219H12L9.656.875H2.625c-.645 0-1.196.23-1.655.688A2.257 2.257 0 0 0 .28 3.22v14.06c0 .645.23 1.197.689 1.656.459.459 1.01.688 1.655.688h18.75c.645 0 1.196-.23 1.655-.688.46-.46.689-1.011.689-1.656V5.563c0-.645-.23-1.197-.689-1.656a2.257 2.257 0 0 0-1.655-.688zm-1.172 9.375h-3.515v3.515h-2.344v-3.515h-3.516V10.25h3.516V6.734h2.344v3.516h3.515v2.344z" fillRule="evenodd"></path></svg>
                                    <p className='menu-create-p'>Create a folder</p>
                                </div>
                            </div>
                            <div className='menu-footer-container'>
                                <h6 onClick={this.handleLogout} className='menu-logout'>Log out</h6>
                            </div>
                        </div>
                    </div>
                    {/********************* SEARCH OVERLAY ************************/}
                    <div id='search-overlay' className='header-search-container'>
                        <svg className='header-icon-search' id="search" viewBox="0 0 24 25"><path d="M17.04 15.61h-1.056l-.41-.41a8.601 8.601 0 0 0 1.553-2.594 8.39 8.39 0 0 0 .557-3.032c0-1.191-.225-2.32-.674-3.384a8.647 8.647 0 0 0-1.86-2.783 8.943 8.943 0 0 0-2.754-1.875A8.32 8.32 0 0 0 9.012.844c-1.192 0-2.32.23-3.384.688a8.847 8.847 0 0 0-2.783 1.875A8.894 8.894 0 0 0 .97 6.176a8.423 8.423 0 0 0-.69 3.398c0 1.192.23 2.315.689 3.37a8.894 8.894 0 0 0 1.875 2.768 8.69 8.69 0 0 0 2.768 1.86 8.581 8.581 0 0 0 3.399.674 8.59 8.59 0 0 0 3.032-.542 8.084 8.084 0 0 0 2.593-1.567l.41.41v1.055l6.68 6.68 1.992-1.993-6.68-6.68zm-8.028 0c-.84 0-1.626-.157-2.359-.47a6.033 6.033 0 0 1-1.919-1.288 6.033 6.033 0 0 1-1.289-1.92 5.946 5.946 0 0 1-.468-2.358c0-.84.156-1.626.468-2.358a6.033 6.033 0 0 1 1.29-1.92 6.033 6.033 0 0 1 1.918-1.288 5.946 5.946 0 0 1 2.359-.469c.84 0 1.626.156 2.358.469a6.033 6.033 0 0 1 1.92 1.289 6.033 6.033 0 0 1 1.288 1.919c.313.732.469 1.518.469 2.358 0 .84-.156 1.626-.469 2.359a6.033 6.033 0 0 1-1.289 1.919 6.033 6.033 0 0 1-1.919 1.289 5.946 5.946 0 0 1-2.358.468z" fillRule="evenodd"></path></svg>
                        <input id='search-input' onChange={(e) => this.handleSearch(e.target.value)} className='header-search-input' type="text" placeholder='Search'/>
                        <span onClick={() => this.closeSearch()} className='search-close-btn'>&times;</span>
                    </div>
                    {/********************* HEADER ************************/}
                <div id='header' className='header-container'>
                <h1 className='header'>Quizlet</h1>
                <div className='header-icon-container'>
                    <Link to='/create-set' className='link'>
                    <div className='header-create-set-container'>
                        <svg className='header-icon' id="create-set" viewBox="0 0 24 21"><path d="M15.281 3.93v3.515h3.516V9.79H15.28v3.516h-2.344V9.789H9.422V7.445h3.515V3.93h2.344zm-15 1.992v12.773c0 .586.215 1.094.645 1.524.43.43.937.644 1.523.644h14.883v-2.168H2.449V5.922H.281zm4.278 8.555c0 .585.205 1.084.615 1.494.41.41.908.615 1.494.615h14.941c.586 0 1.084-.205 1.495-.615.41-.41.615-.909.615-1.494V2.757c0-.585-.205-1.093-.615-1.523A1.989 1.989 0 0 0 21.609.59H6.668a1.99 1.99 0 0 0-1.494.644c-.41.43-.615.938-.615 1.524v11.719z" fillRule="evenodd"></path></svg>
                        <h6>Create</h6>
                    </div>
                    </Link>
                    <div onClick={() => this.showSearch()} className='header-create-set-container'>
                        <svg className='header-icon' id="search" viewBox="0 0 24 25"><path d="M17.04 15.61h-1.056l-.41-.41a8.601 8.601 0 0 0 1.553-2.594 8.39 8.39 0 0 0 .557-3.032c0-1.191-.225-2.32-.674-3.384a8.647 8.647 0 0 0-1.86-2.783 8.943 8.943 0 0 0-2.754-1.875A8.32 8.32 0 0 0 9.012.844c-1.192 0-2.32.23-3.384.688a8.847 8.847 0 0 0-2.783 1.875A8.894 8.894 0 0 0 .97 6.176a8.423 8.423 0 0 0-.69 3.398c0 1.192.23 2.315.689 3.37a8.894 8.894 0 0 0 1.875 2.768 8.69 8.69 0 0 0 2.768 1.86 8.581 8.581 0 0 0 3.399.674 8.59 8.59 0 0 0 3.032-.542 8.084 8.084 0 0 0 2.593-1.567l.41.41v1.055l6.68 6.68 1.992-1.993-6.68-6.68zm-8.028 0c-.84 0-1.626-.157-2.359-.47a6.033 6.033 0 0 1-1.919-1.288 6.033 6.033 0 0 1-1.289-1.92 5.946 5.946 0 0 1-.468-2.358c0-.84.156-1.626.468-2.358a6.033 6.033 0 0 1 1.29-1.92 6.033 6.033 0 0 1 1.918-1.288 5.946 5.946 0 0 1 2.359-.469c.84 0 1.626.156 2.358.469a6.033 6.033 0 0 1 1.92 1.289 6.033 6.033 0 0 1 1.288 1.919c.313.732.469 1.518.469 2.358 0 .84-.156 1.626-.469 2.359a6.033 6.033 0 0 1-1.289 1.919 6.033 6.033 0 0 1-1.919 1.289 5.946 5.946 0 0 1-2.358.468z" fillRule="evenodd"></path></svg>
                        <h6>Search</h6>
                    </div>
                    <div onClick={ () => this.showMenu() }>
                        <svg className='header-icon' id="list" viewBox="0 0 24 17"><path d="M.281 16.207H23.72V13.57H.28v2.637zm0-6.562H23.72V7.066H.28v2.579zm0-9.082V3.14H23.72V.562H.28z" fillRule="evenodd"></path></svg>
                    </div>
                </div>
                <div className='tablet-header-user-image'>
                    <img className='user-image-medium' src="https://api.adorable.io/avatars/285/abott@adorable.png" alt="profile"/>
                    <h6 className='header-username'>{this.state.username || 'user'}</h6>
                    <svg onClick={() => this.handleArrowMenuClick()} xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 841.9 744.125"><path d="M528.9,297.2"/><path d="M215.5,189.5c-2,0-3.8,1.2-4.6,3.1c-0.8,1.9-0.3,4,1.1,5.4l205.6,205.6c1,1,2.3,1.5,3.5,1.5s2.6-0.5,3.5-1.5l205.5-205.5  c1.4-1.3,1.9-3.5,1.1-5.5c-0.8-1.9-2.6-3.1-4.6-3.1L215.5,189.5z"/></svg>
                    <div className='arrow-menu-main top' id='arrow-menu-main'>
                        <Link className='link' to='/activity'><div className='more-menu-item'>
                            <h6>Your Study Sets</h6>
                        </div></Link>
                        <Link className='link' to='/settings'><div className='more-menu-item'>
                            <h6>Settings</h6>
                        </div></Link>
                        <div onClick={() => this.handleLogout()} className='more-menu-item'>
                            <h6>Log Out</h6>
                        </div>
                        <div className='more-menu-item'>
                            <h6>Help Center</h6>
                        </div>
                        <div className='more-menu-item'>
                            <h6>Upgrade</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default connect(null, {logout, getSearchResults})(Header);