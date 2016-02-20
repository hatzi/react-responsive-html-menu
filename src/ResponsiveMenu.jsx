import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
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
            init: true,
            visibleCount: 0
        };
    }

    componentDidMount() {
        this.setState({init: false});
        this.setBrowserState();

    }

    setBrowserState() {
        const {every, forEach, slice} = Array.prototype;
        const menu = this.refs.menu;

        if (!menu.children.length > 1) return;

        const dropMenu = menu.children[menu.children.length - 1];

        dropMenu.style.display = '';
        const menuTopPos = dropMenu.getBoundingClientRect().top;
        let fittedCount = 0;

        every.call(slice.call(menu.children, 0, -1), (child, i) => {
            child.style.display = '';

            if (dropMenu.getBoundingClientRect().top !== menuTopPos) {
                return false;
            }

            fittedCount++;
            return true;
        });

        forEach.call(slice.call(menu.children, 0, fittedCount + 1), (child) => child.style.display = 'none');

        this.setState({
            visibleCount: fittedCount
        });

    }

    render() {
        const {className, dropdownText, list} = this.props;
        const {init, visibleCount} = this.state;

        if (!list || !Array.isArray(list) || !list.length) return null;

        const dropList = init ? list : list.slice(visibleCount);

        return (
            <ul ref="menu" className={`react-responsive-menu ${className}`.trim()}>
                {list
                    .map((item, i) => {
                        const showItem = init ? false : i < visibleCount;

                        return (
                            <MenuItem
                                key={i}
                                show={showItem}
                                {...item} />);
                    }).concat(
                        <DropDownList
                            key="dropdown"
                            list={dropList}
                            dropdownText={dropdownText} />
                    )
                }
            </ul>
        );
    }
}
