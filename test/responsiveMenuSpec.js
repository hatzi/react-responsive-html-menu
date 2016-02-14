import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ResponsiveMenu from '../src/ResponsiveMenu.jsx';
import ResponsiveMenuDropDown from '../src/ResponsiveMenuDropdown.jsx';

describe(`ResponsiveMenu`, () => {
    let shallowRenderer;
    let renderedTree;

    describe(`when not passing array of items to component`, () => {
        before(() => {
            shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(<ResponsiveMenu />);
            renderedTree = shallowRenderer.getRenderOutput();
        });

        it(`should not render`, () => {
            expect(renderedTree).to.not.exist;
        });
    });

    describe(`when passing a string as a value for the list prop`, () => {
        before(() => {
            shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(<ResponsiveMenu list="test" />);
            renderedTree = shallowRenderer.getRenderOutput();
        });

        it(`should not render`, () => {
            expect(renderedTree).to.not.exist;
        });
    });

    describe(`when passing an empty array as a value for the list prop`, () => {
        before(() => {
            shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(<ResponsiveMenu list={[]} />);
            renderedTree = shallowRenderer.getRenderOutput();
        });

        it(`should not render`, () => {
            expect(renderedTree).to.not.exist;
        });
    });

    describe(`when passing an array of valid objects as a value for the list prop and other props`, () => {
        const defaultClassName = 'react-responsive-menu';
        const customClassName = 'test-class';
        const moreText = 'Show More';
        const listProp = [
            { link: '/', text: 'Home' },
            { link: '/about', text: 'About' }
        ];

        before(() => {
            shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(<ResponsiveMenu className={customClassName} list={listProp} dropdownText={moreText} />);
            renderedTree = shallowRenderer.getRenderOutput();
        });

        it(`should render`, () => {
            expect(renderedTree).to.exist;
        });

        it(`should render component in a <ul> with the className ${defaultClassName}`, () => {
            expect(renderedTree.type).to.eq(`ul`);
            expect(renderedTree.props.className).to.eq(`${defaultClassName} ${customClassName}`);
        });

        it(`should render the DropDownList Component`, () => {
            expect(renderedTree.props.children).to.deep.eq([
                <ResponsiveMenuDropDown key="dropdown" list={listProp} dropdownText={moreText} />
            ]);
        });
    });
});
