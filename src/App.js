import React, {Component} from 'react';

import './App.css';
import Timer from './Timer.js'
import Grid from 'material-ui/Grid';
import Menu from './Menu.js'

class App extends Component {
    constructor() {
        super();
        this.state = {
            colors: [
                "white", "black"
            ],
            timers: [
                0, 0
            ],
            active: false,
            currentTimer: 0,
            interval: null
        }
    }

    componentDidMount() {
        this.setTimer(100000);
        this.play();
    }

    updateTimer = () => {
        const timers = this.state.timers;
        let newTimer = [...timers];
        newTimer[this.state.currentTimer] -= 50;
        if (newTimer[this.state.currentTimer] <= 0) {
            newTimer[this.state.currentTimer] = 0;
            this.stop();
        }
        this.setState(() => {
            return {timers: newTimer}
        })
    }

    stop() {
        clearInterval(this.state.interval);
        this.setState(() => {
            return {active: false, interval: null};
        })
    }

    play() {
        const interval = setInterval(() => {
            this.updateTimer()
        }, 50)

        this.setState(() => {
            return {active: true, interval: interval};
        })

    }

    setTimer(time) {
        console.log("startGame " + time);
        this.setState(() => {
            return {
                timers: [time, time]
            }
        });
    }

    handleTimerClick = () => {
        this.setState((prevState) => {
            return {
                currentTimer: prevState.currentTimer === 1
                    ? 0
                    : 1
            }
        })
    }

    handleMenuClick = () => {
        console.log("test");
        this.state.active
            ? this.stop()
            : this.play();
    }
    render() {
        var gridProps = {
            className: "timerGrid",
            alignItems: "center",
            direction: "column",
            justify: "center",
            container: true,
            item: true,
            xs: 6,
            sm: 6
        }

        return (
            <Grid className="fullHeight" container item xs={12}>
                <Menu
                    text={this.state.active
                    ? "stop"
                    : "start"}
                    onSwitchButtonClick={() => (this.handleMenuClick())}></Menu>
                {this
                    .state
                    .colors
                    .map((color, index) => {
                        let isCurrentTimer = this.state.currentTimer === index;
                        let timerProps = {
                            isActive: isCurrentTimer,
                            color: color,
                            time: this.state.timers[index]
                        }
                        if (isCurrentTimer) {
                            timerProps.onClick = () => {
                                this.handleTimerClick()
                            }
                        }

                        return (
                            <Grid key={color} {...gridProps}>
                                <Timer {...timerProps}/>
                            </Grid>
                        )
                    })}
            </Grid>
        );
    }
}

export default App;