import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

class Timer extends Component {

    formatTime(time) {
        let hours = Math.floor(time / 3600000);
        let minutes = Math.floor((time - hours * 3600000) / 60000);
        let seconds = Math.floor((time - (hours * 3600000 + minutes * 60000)) / 1000);
        let centisecond = Math.floor((time % 1000) / 10);
        let text = hours + ":" + minutes + ":" + seconds + (time < 10000 && time > 0
            ? (":" + centisecond)
            : "");

        text = text
            .split(":")
            .map((item) => {
                if (item.length === 1) 
                    return "0" + item;
                return item;
            })
            .join(":");

        return text;
    }

    render() {
        const text = this.formatTime(this.props.time);

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