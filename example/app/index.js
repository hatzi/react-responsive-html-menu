import React from 'react';
import ReactDOM from 'react-dom';
import ResponsiveMenu from '../../src/ResponsiveMenu.jsx';
import styles from '../styles/main.css';

ReactDOM.render(
    <ResponsiveMenu
        className="menu-example"
        dropdownText="More"
        list={[
            { link: '#', text: 'Home' },
            { link: '#', text: 'About' },
            { link: '#', text: 'Services' },
            { link: '#', text: 'Contact' },
            { link: '#', text: 'List Item No 1' },
            { link: '#', text: 'List Item No 2' },
            { link: '#', text: 'List Item No 3' },
            { link: '#', text: 'List Item No 4' },
            { link: '#', text: 'List Item No 5' },
            { link: '#', text: 'List Item No 6' }
        ]}
        />,
    document.getElementById('app')
);
