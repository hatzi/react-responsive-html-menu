# React Responsive Menu Component

A React component which will move list items into a dropdown menu by detecting if it will fit within parent container

## How to use

Install the project using `npm i --save react-responsive-html-menu`, then import into your project, passing valid props

```javascript
import ResponsiveMenu from 'react-responsive-html-menu';

...

<ResponsiveMenu
    list={arrayOfObjects}   // Required Array of Objects - List of links
    className="main-menu"   // Optional String - Value to add to the <ul /> element as a className
    dropdownText="More" />  // Optional String - Defaults to "More". The text the drop menu will show


```

This will then structure your menu within `<ul />` and `<li />` elements, which you can then style using your own css. The Component will be able to detect what can fit within one line and move items in a more drop down when they no longer fit

## The `list` prop structure

Each item in the `list` props follows the following structure

```javascript
const list = [{
    link:       "/"         // Required String - The link for the menuItem
    text:       "Home"      // Required String - The text for the link
    className:  "menu-item" // Optional String - Value to add to the <li /> element as a className
}];


```

## Running the Example

The example uses [webpack](https://webpack.github.io/) to build the `bundle.js` file. Simply install `webpack` or `webpack-dev-server` globally, then within the example directory run the project

```
npm i webpack -g 
cd example
webpack
// Then open 'example/index.html' in your browser

// Alternatively using 'webpack-dev-server'
npm i webpack-dev-server -g 
cd example
webpack-dev-server
// Then access //localhost:8080 in your browser

```
