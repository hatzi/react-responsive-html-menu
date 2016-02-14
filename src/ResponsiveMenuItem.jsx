import React, {PropTypes, Component} from 'react';

export default class ResponsiveMenuItem extends Component {
    static propTypes = {
        className: PropTypes.string,
        link: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    };

    static defaultProps = {
        className: ''
    };

    render() {
        const {className, link, text} = this.props;

        if (!link || !text) return null;

        return (
            <li className={`react-responsive-menu__item ${className}`.trim()}>
                <a href={link}>{text}</a>
            </li>
        );
    }
}
