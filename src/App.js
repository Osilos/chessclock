import React, {Component} from 'react';

import './App.css';
import Timer from './Timer.js'
import Grid from 'material-ui/Grid';
import Menu from './Menu.js'
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Sound from 'react-sound';

class App extends Component {

    static timerTick() {
        return 50;
    }

    static timeToStress() {
        return 1000 * 10;
    }

    static defaultStartTime() {
        return 1000 * 10 * 60;
    }
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
            hasChange: false,
            interval: null,
            startTime: App.defaultStartTime(),
            end: false,
            hasPlayEnd: false
        }
    }

    componentDidMount() {
        this.setTimer(this.state.startTime);
        document.addEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (e) => {
        if (e.keyCode === 32) {
            this.handleTimerClick();
        }
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    updateTimer = () => {
        const timers = this.state.timers;
        let newTimer = [...timers];
        newTimer[this.state.currentTimer] -= App.timerTick();
        if (newTimer[this.state.currentTimer] <= 0) {
            newTimer[this.state.currentTimer] = 0;
            this.stop();

            this.setState(() => {
                return {end: true}
            })
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
        }, App.timerTick())

        this.setState(() => {
            return {active: true, interval: interval};
        })
    }

    setTimer(time) {
        this.setState(() => {
            return {
                timers: [time, time]
            }
        });
    }

    handleTimerClick = () => {
        if (this.state.active) {
            this.setState((prevState) => {
                return {
                    currentTimer: prevState.currentTimer === 1
                        ? 0
                        : 1,
                    hasChange: true
                }
            })
        }
    }

    handleResetClick = () => {
        this.setState((prevState) => {
            return {currentTimer: 0}
        })
        this.setTimer(this.state.startTime);
        this.stop();
    }

    handleInvertClick = () => {
        this.setState((prevState) => {
            return {
                currentTimer: prevState.currentTimer === 1
                    ? 0
                    : 1,
                colors: [
                    prevState.colors[1], prevState.colors[0]
                ],
                timers: [prevState.timers[1], prevState.timers[0]]
            }
        })
    }

    handleToggleClick = () => {
        this.state.active
            ? this.stop()
            : this.play();
    }

    handleStartTimeChange = (time) => {
        const {hours, minutes, seconds} = time;
        this.setState(() => {
            return {
                startTime: hours * 1000 * 60 * 60 + minutes * 1000 * 60 + seconds * 1000
            }
        });
    }

    handleConfirmDialog = () => {
        this.setState(() => {
            return {end: false, hasPlayEnd: false}
        });
    }

    changeSoundEnd = () => {
        this.setState(() => {
            hasChange : false
        })
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
                    isActive={this.state.active}
                    onSwitchButtonClick={() => (this.handleToggleClick())}
                    onResetButtonClick={() => (this.handleResetClick())}
                    onInvertButtonClick={() => (this.handleInvertClick())}
                    onStartTimeChange={this.handleStartTimeChange}
                    startTime={this.state.startTime}></Menu>
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
                <Dialog open={this.state.end}>
                    <DialogTitle>
                        {`${this
                            .state
                            .colors[this.state.currentTimer]
                            .toUpperCase()} lose on time.`}
                    </DialogTitle>
                    <DialogContent>
                        <Button onClick={this.handleConfirmDialog}>OK</Button>
                    </DialogContent>
                </Dialog>
                <Sound
                    url="./sounds/tictac.mp3"
                    onFinishedPlaying={() => this.setState({hasChange: false})}
                    playStatus={this.state.hasChange
                    ? Sound.status.PLAYING
                    : Sound.status.STOPPED}></Sound>
                <Sound
                    url="./sounds/sf_tictac.mp3"
                    playStatus={this.state.timers[this.state.currentTimer] < App.timeToStress() && this.state.active
                    ? Sound.status.PLAYING
                    : Sound.status.STOPPED}></Sound>
                <Sound
                    url="./sounds/SF-bewitch.mp3"
                    onFinishedPlaying={() => this.setState({hasPlayEnd: true})}
                    loop={false}
                    playStatus={this.state.end && !this.state.hasPlayEnd
                    ? Sound.status.PLAYING
                    : Sound.status.STOPPED}></Sound>
            </Grid>
        );
    }
}

export default App;