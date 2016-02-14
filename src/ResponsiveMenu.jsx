import React, {PropTypes, Component} from 'react';
import MenuItem from './ResponsiveMenuItem.jsx';
import DropDownList from './ResponsiveMenuDropdown.jsx';
import get from 'lodash/get';

export default class ResponsiveMenu extends Component {
    static propTypes = {
        className: PropTypes.string,
        dropdownText: PropTypes.string,
        list: PropTypes.arrayOf(PropTypes.object).isRequired
    };

    static defaultProps = {
        className: ''
    };

    constructor(props) {
        super(props);

        const list = props.list;

        this.state = {
            visibleList: [],
            dropList: list && Array.isArray(list) ? list : []
        };
    }

    componentWillMount() {
        if (typeof window !== 'undefined' && get(window, 'document.createElement')) this.setBrowserState();
    }

    setBrowserState() {}

    render() {
        const {className, dropdownText} = this.props;
        const {visibleList, dropList} = this.state;

        if (!visibleList.length && !dropList.length) return null;

        return (
            <ul className={`react-responsive-menu ${className}`.trim()}>
                {visibleList.map((item, i) => <MenuItem key={i} {...item} />)
                    .concat(dropList.length ? <DropDownList
                        key="dropdown"
                        list={dropList}
                        dropdownText={dropdownText} /> : null)}
            </ul>
        );
    }
}
