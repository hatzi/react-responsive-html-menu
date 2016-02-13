import React from 'react';
import ReactDOM from 'react-dom';
import ResponsiveMenu from '../../src/index.jsx';

ReactDOM.render(
    <ResponsiveMenu
        list={[
            'Item 1',
            'Item 2',
            'Item 3',
            'Item 4',
            'Item 5'
        ]}
        />,
    document.getElementById('app')
);
