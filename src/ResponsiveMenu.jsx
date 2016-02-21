import React, {PropTypes, Component} from 'react';
import MenuItem from './ResponsiveMenuItem.jsx';
import DropDownList from './ResponsiveMenuDropdown.jsx';
import throttle from 'lodash/throttle';

export default class ResponsiveMenu extends Component {
    static propTypes = {
        className: PropTypes.string,
        dropdownText: PropTypes.string,
        list: PropTypes.arrayOf(PropTypes.object).isRequired
    };

    static defaultProps = {
        className: '',
        dropdownText: 'More'
    };

    static windowWidth = 0;

    static setWindowWidth(width) {
        ResponsiveMenu.windowWidth = width;
    }

    constructor(props) {
        super(props);

        this.state = {
            init: true,
            visibleCount: 0
        };
    }

    componentDidMount() {
        this.setState({init: false});
        this.setBrowserState();
        window.addEventListener('resize', this.setBrowserState, false);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setBrowserState, false);
    }

    setBrowserState = throttle(() => {
        const visibleCount = this.state.visibleCount;
        const menu = this.refs.menu;

        if (!menu.children.length > 1) return;

        const menuChildren = Object.keys(menu.children).map(key => menu.children[key]);
        const dropMenu = menuChildren[menuChildren.length - 1];

        dropMenu.style.display = '';
        const menuTopPos = this.state.init ? dropMenu.getBoundingClientRect().top : menuChildren[0].getBoundingClientRect().top;
        let fittedCount = 0;
        let childrenToCheck;

        if (ResponsiveMenu.windowWidth < window.innerWidth) { // When window size has increased
            childrenToCheck = menuChildren.slice(visibleCount, -1);
            fittedCount = visibleCount;
        } else { // When window size has decreased
            childrenToCheck = menuChildren.slice(0, -1);
            childrenToCheck.forEach((child) => child.style.display = 'none');
        }

        ResponsiveMenu.setWindowWidth(window.innerWidth);

        childrenToCheck.every((child) => {
            child.style.display = '';

            if (dropMenu.getBoundingClientRect().top !== menuTopPos) {
                return false;
            }

            fittedCount++;
            return true;
        });

        menuChildren.slice(visibleCount, fittedCount + 1).forEach((child) => child.style.display = 'none');

        this.setState({
            visibleCount: fittedCount
        });
    }, 500);

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
