import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ResponsiveMenuItem from '../src/ResponsiveMenuItem.jsx';

describe(`ResponsiveMenuItem`, () => {
    let shallowRenderer;
    let renderedTree;

    describe(`when not passing any props`, () => {
        before(() => {
            shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(<ResponsiveMenuItem />);
            renderedTree = shallowRenderer.getRenderOutput();
        });

        it(`should not render`, () => {
            expect(renderedTree).to.not.exist;
        });
    });

    describe(`when passing only link prop`, () => {
        before(() => {
            shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(<ResponsiveMenuItem link="/" />);
            renderedTree = shallowRenderer.getRenderOutput();
        });

        it(`should not render`, () => {
            expect(renderedTree).to.not.exist;
        });
    });

    describe(`when passing only a text prop`, () => {
        before(() => {
            shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(<ResponsiveMenuItem text="Home" />);
            renderedTree = shallowRenderer.getRenderOutput();
        });

        it(`should not render`, () => {
            expect(renderedTree).to.not.exist;
        });
    });

    describe(`when passing both text and link props`, () => {
        const defaultClassName = 'react-responsive-menu__item';
        const customClassName = 'test-class';
        const textProp = 'Home';
        const linkProp = '/';

        before(() => {
            shallowRenderer = TestUtils.createRenderer();
            shallowRenderer.render(<ResponsiveMenuItem className={customClassName} text={textProp} link={linkProp} />);
            renderedTree = shallowRenderer.getRenderOutput();
        });

        it(`should render`, () => {
            expect(renderedTree).to.exist;
        });

        it(`should render component in an <li> with the className ${defaultClassName}`, () => {
            expect(renderedTree.type).to.eq(`li`);
            expect(renderedTree.props.className).to.eq(`${defaultClassName} ${customClassName}`);
        });

        it(`should render a link going to '${linkProp}' with the text '${textProp}'`, () => {
            expect(renderedTree.props.children).to.deep.eq(
                <a href={linkProp}>{textProp}</a>
            );
        });
    });
});
