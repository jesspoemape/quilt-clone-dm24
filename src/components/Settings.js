import React, { Component } from 'react';
import Header from './Header';

class Settings extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className='settings-main-container'>
                    <div className='settings-section-header'>
                        <svg className='settings-header-svg' id="profile" viewBox="0 0 22 21"><path d="M11 10.492c1.406 0 2.617-.498 3.633-1.494 1.015-.996 1.523-2.197 1.523-3.603 0-1.426-.508-2.642-1.523-3.648C13.617.741 12.406.238 11 .238c-1.406 0-2.607.498-3.604 1.494C6.4 2.73 5.902 3.95 5.902 5.395c0 1.406.498 2.607 1.494 3.603.997.996 2.198 1.494 3.604 1.494zm0 2.578c-.84 0-1.85.108-3.032.323a17.866 17.866 0 0 0-3.37.952c-1.064.42-1.972.947-2.724 1.582-.752.635-1.128 1.382-1.128 2.241v2.578h20.508v-2.578c0-.84-.376-1.582-1.128-2.227-.752-.644-1.66-1.176-2.725-1.596a17.926 17.926 0 0 0-3.354-.952c-1.172-.215-2.188-.323-3.047-.323z" fillRule="evenodd"></path></svg>
                        <h4 className='set-description-header'>Change your Username</h4>
                    </div>
                    <div className='settings-username-container'>
                        <input className='create-input' type="text" placeholder='Enter new username'/>
                        <button className='settings-save-button'>Save</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Settings;