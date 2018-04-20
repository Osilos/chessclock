import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

import Utils from './Utils'

class Timer extends Component {

    render() {
        const text = Utils.formatTime(this.props.time);

        return (
            <Paper
                elevation={this.props.isActive
                ? 20
                : 0}
                className={`timerContainer ${this.props.color}`}
                onClick={this.props.onClick}>
                <Paper
                    elevation={this.props.isActive
                    ? 20
                    : 0}
                    className={`timer ${this.props.color}`}>{text}</Paper>
            </Paper>
        );
    }
}

Timer.propTypes = {
    color: PropTypes
        .oneOf(['black', 'white'])
        .isRequired,
    isActive: PropTypes.bool.isRequired,
    time: PropTypes.number.isRequired,
    onClick: PropTypes.func
}

export default Timer;