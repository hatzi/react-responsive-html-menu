import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ResponsiveMenu from '../src/ResponsiveMenu.jsx';
import ResponsiveMenuDropDown from '../src/ResponsiveMenuDropdown.jsx';
import ResponsiveMenuItem from '../src/ResponsiveMenuItem.jsx';

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
            expect(renderedTree.props.children.pop()).to.deep.eq(
                <ResponsiveMenuDropDown key="dropdown" list={listProp} dropdownText={moreText} />);
        });
    });

    describe(`when passing leaving out the dropdownText prop`, () => {
        const listProp = [
            { link: '/', text: 'Home' },
            { link: '/about', text: 'About' }
        ];

        before(() => {
            shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(<ResponsiveMenu className="class-name" list={listProp} />);
            renderedTree = shallowRenderer.getRenderOutput();
        });

        const expectedTextVal = 'More';
        it(`should render the DropDownList Component passing '${expectedTextVal}' as the value for the dropDownText prop`, () => {
            expect(renderedTree.props.children.pop()).to.deep.eq(
                <ResponsiveMenuDropDown key="dropdown" list={listProp} dropdownText={expectedTextVal} />);
        });
    });

    describe(`when passing valid props and the number of visible items is set to 2`, () => {
        const moreText = 'More';
        const visibleCount = 2;
        const listProp = [
            { link: '/', text: 'Home' },
            { link: '/about', text: 'About' },
            { link: '/services', text: 'Services' },
            { link: '/team', text: 'Meet the Team' },
            { link: '/careers', text: 'Careers' },
            { link: '/contact', text: 'Contact' }
        ];

        describe('and the init state is set to true', () => {
            before(() => {
                shallowRenderer = TestUtils.createRenderer();
                shallowRenderer.render(<ResponsiveMenu list={listProp} dropdownText={moreText} />);
                shallowRenderer._instance._instance.setState({init: true, visibleCount});
                renderedTree = shallowRenderer.getRenderOutput();
            });

            it(`should render the top level items, setting all to be hidden`, () => {
                for (let i = 0; i < listProp.length - 1; i++) {
                    expect(renderedTree.props.children[i]).to.deep.eq(
                        <ResponsiveMenuItem key={i} show={false} {...listProp[i]} />);
                }
            });

            it(`should render the DropDownList Component with all the list items`, () => {
                expect(renderedTree.props.children.pop()).to.deep.eq(
                    <ResponsiveMenuDropDown key="dropdown" list={listProp} dropdownText={moreText} />);
            });
        });

        describe('and the init state is set to true', () => {
            before(() => {
                shallowRenderer = TestUtils.createRenderer();
                shallowRenderer.render(<ResponsiveMenu list={listProp} dropdownText={moreText} />);
                shallowRenderer._instance._instance.setState({init: false, visibleCount});
                renderedTree = shallowRenderer.getRenderOutput();
            });

            it(`should render the top level items, setting all to be hidden`, () => {
                for (let i = 0; i < listProp.length - 1; i++) {
                    expect(renderedTree.props.children[i]).to.deep.eq(
                        <ResponsiveMenuItem key={i} show={i < visibleCount} {...listProp[i]} />);
                }
            });

            it(`should render the DropDownList Component with items that are not in the top level list`, () => {
                expect(renderedTree.props.children.pop()).to.deep.eq(
                    <ResponsiveMenuDropDown key="dropdown" list={listProp.slice(visibleCount)} dropdownText={moreText} />);
            });
        });
    });
});
