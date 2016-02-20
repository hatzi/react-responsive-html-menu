import React, {PropTypes, Component} from 'react';
import MenuItem from './ResponsiveMenuItem.jsx';

export default class ResponsiveMenuDropDown extends Component {
    static propTypes = {
        dropdownText: PropTypes.string,
        list: PropTypes.arrayOf(PropTypes.object).isRequired
    };

    static defaultProps = {
        dropdownText: 'More'
    };

    render() {
        const {dropdownText, list} = this.props;
        let style = {};

        if (!list || !Array.isArray(list) || !list.length) style.display = 'none';

        return (
            <li className="react-responsive-menu__drop-down-link" style={style}>
                {dropdownText}
                {typeof style.display === 'undefined' ?
                    <ul className="react-responsive-menu__drop-down-list">
                        {list.map((item, i) => {
                            return (<MenuItem key={i} {...item} />);
                        })}
                    </ul> : null}
            </li>
        );
    }
}
