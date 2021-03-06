import React, { Component } from 'react';
import Footer from './Footer';

class LandingPage extends Component {


    render() {
        return (
            <div>
                <div className='header-container'>
                    <h1 className='header'>Quizlet</h1>
                    <div className='landing-header-container'>
                        <svg className='header-icon' id="search" viewBox="0 0 24 25"><path d="M17.04 15.61h-1.056l-.41-.41a8.601 8.601 0 0 0 1.553-2.594 8.39 8.39 0 0 0 .557-3.032c0-1.191-.225-2.32-.674-3.384a8.647 8.647 0 0 0-1.86-2.783 8.943 8.943 0 0 0-2.754-1.875A8.32 8.32 0 0 0 9.012.844c-1.192 0-2.32.23-3.384.688a8.847 8.847 0 0 0-2.783 1.875A8.894 8.894 0 0 0 .97 6.176a8.423 8.423 0 0 0-.69 3.398c0 1.192.23 2.315.689 3.37a8.894 8.894 0 0 0 1.875 2.768 8.69 8.69 0 0 0 2.768 1.86 8.581 8.581 0 0 0 3.399.674 8.59 8.59 0 0 0 3.032-.542 8.084 8.084 0 0 0 2.593-1.567l.41.41v1.055l6.68 6.68 1.992-1.993-6.68-6.68zm-8.028 0c-.84 0-1.626-.157-2.359-.47a6.033 6.033 0 0 1-1.919-1.288 6.033 6.033 0 0 1-1.289-1.92 5.946 5.946 0 0 1-.468-2.358c0-.84.156-1.626.468-2.358a6.033 6.033 0 0 1 1.29-1.92 6.033 6.033 0 0 1 1.918-1.288 5.946 5.946 0 0 1 2.359-.469c.84 0 1.626.156 2.358.469a6.033 6.033 0 0 1 1.92 1.289 6.033 6.033 0 0 1 1.288 1.919c.313.732.469 1.518.469 2.358 0 .84-.156 1.626-.469 2.359a6.033 6.033 0 0 1-1.289 1.919 6.033 6.033 0 0 1-1.919 1.289 5.946 5.946 0 0 1-2.358.468z" fillRule="evenodd"></path></svg>
                        <a className='login-link' href="/auth">Log in</a>
                        <div>
                            <button className='landing-sign-button'>Sign up</button>
                        </div>
                    </div>
                </div>
                <div className='landing-body'></div>
                <Footer/>
            </div>
        );
    }
}

export default LandingPage;