import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ResponsiveMenuDropdown from '../src/ResponsiveMenuDropdown.jsx';
import ResponsiveMenuItem from '../src/ResponsiveMenuItem.jsx';

describe(`ResponsiveMenuDropdown`, () => {
    let shallowRenderer;
    let renderedTree;

    describe(`when not passing any props`, () => {
        before(() => {
            shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(<ResponsiveMenuDropdown />);
            renderedTree = shallowRenderer.getRenderOutput();
        });

        it(`should not render`, () => {
            expect(renderedTree).to.not.exist;
        });
    });

    describe(`when passing a string as a value for the list prop`, () => {
        before(() => {
            shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(<ResponsiveMenuDropdown list="test" />);
            renderedTree = shallowRenderer.getRenderOutput();
        });

        it(`should not render`, () => {
            expect(renderedTree).to.not.exist;
        });
    });

    describe(`when passing an empty array as a value for the list prop`, () => {
        before(() => {
            shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(<ResponsiveMenuDropdown list={[]} />);
            renderedTree = shallowRenderer.getRenderOutput();
        });

        it(`should not render`, () => {
            expect(renderedTree).to.not.exist;
        });
    });

    describe(`when passing an array of valid objects as a value for the list prop`, () => {
        const defaultMoreText = 'More';
        const listProp = [
            { link: '/', text: 'Home' },
            { link: '/about', text: 'About' }
        ];

        before(() => {
            shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(<ResponsiveMenuDropdown list={listProp} />);
            renderedTree = shallowRenderer.getRenderOutput();
        });

        it(`should render`, () => {
            expect(renderedTree).to.exist;
        });

        it(`should render component in a <li>`, () => {
            expect(renderedTree.type).to.eq(`li`);
        });

        it(`should render the default More text in the li along with its own ul containing all the MenuItems`, () => {
            expect(renderedTree.props.children).to.deep.eq([
                defaultMoreText,
                <ul className="react-responsive-menu__drop-down-list">
                    <ResponsiveMenuItem key="0" {...listProp[0]} />
                    <ResponsiveMenuItem key="1" {...listProp[1]} />
                </ul>
            ]);
        });
    });

    describe(`when passing an array of valid objects as a value for the list prop and dropdownText prop`, () => {
        const dropdownTextProp = 'Show Me More';
        const listProp = [
            { link: '/', text: 'Home' },
            { link: '/about', text: 'About' }
        ];

        before(() => {
            shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(<ResponsiveMenuDropdown list={listProp} dropdownText={dropdownTextProp} />);
            renderedTree = shallowRenderer.getRenderOutput();
        });

        it(`should render the dropdownText prop value '${dropdownTextProp}' text in the li`, () => {
            expect(renderedTree.props.children[0]).to.eq(dropdownTextProp);
        });
    });
});
