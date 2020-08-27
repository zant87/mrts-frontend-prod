import React, {Component} from "react";
import {MDBSelect} from "mdbreact";
import PropTypes from 'prop-types';

class SelectInput extends Component {

    // componentDidMount() {
    //     console.log('[SelectInput.jsx] componentDidMount');
    // }
    //
    // componentDidUpdate(prevProps) {
    //     console.log('[SelectInput.jsx] componentDidUpdate');
    // }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        // console.log('[SelectInput.jsx] shouldComponentUpdate', nextProps, nextState);
        return this.props === nextProps;
    }

    render() {
        return (
            <MDBSelect
                className="my-2"
                options={this.props.options}
                getValue={this.props.getValue}
                search={true}
                searchLabel={this.props.searchLabel}
                selected={this.props.selected}
                outline
                label={this.props.label}
            />
        );
    }
}

SelectInput.propTypes = {
    options: PropTypes.array.isRequired,
    getValue: PropTypes.func.isRequired,
    searchLabel: PropTypes.string.isRequired,
    selected: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
}

export default SelectInput;
