import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ResponsiveMenu from '../src/index';

describe('ResponsiveMenu', () => {
    let reactModule;

    describe('when not passing array of items to component', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(<ResponsiveMenu />);
        });

        it('should not render', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe('when passing a string as a value for the list prop', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(<ResponsiveMenu list="test" />);
        });

        it('should not render', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe('when passing an empty array as a value for the list prop', () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(<ResponsiveMenu list={[]} />);
        });

        it('should not render', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.not.exist;
        });
    });
});
