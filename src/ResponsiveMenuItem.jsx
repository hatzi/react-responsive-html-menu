import React, {PropTypes, Component} from 'react';

export default class ResponsiveMenuItem extends Component {
    static propTypes = {
        className: PropTypes.string,
        link: PropTypes.string.isRequired,
        show: PropTypes.bool,
        text: PropTypes.string.isRequired
    };

    static defaultProps = {
        className: '',
        show: true
    };

    render() {
        const {className, link, show, text} = this.props;

        if (!link || !text) return null;

        let style;

        if (!show) {
            style = {display: 'none'};
        }

        return (
            <li className={`react-responsive-menu__item ${className}`.trim()} style={style}>
                <a href={link}>{text}</a>
            </li>
        );
    }
}
