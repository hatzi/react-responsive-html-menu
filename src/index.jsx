import React, {PropTypes, Component} from 'react';

export default class ResponsiveMenu extends Component {
    static propTypes = {
        className: PropTypes.string,
        list: PropTypes.array.isRequired
    };

    render() {
        const {list, className} = this.props;

        if (!list || !Array.isArray(list) || !list.length) return null;

        return (
            <ul className={`react-responsive-menu ${className}`}>
                {list.map((item, i) => {
                    return (<li key={i}>{item}</li>);
                })}
            </ul>
        );
    }
}
