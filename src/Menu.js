import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {MenuItem, MenuList} from 'material-ui/Menu';
import List from 'material-ui/List';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Icon from 'material-ui/Icon'
import Typographie from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Input from 'material-ui/Input'
import Utils from './Utils'

import './Menu.css';

class Menu extends Component {

    constructor() {
        super();

        this.state = {
            open: false,
            hours: 0,
            minutes: 0,
            seconds: 0
        }
    }

    componentDidMount() {
        const startTime = Utils
            .formatTime(this.props.startTime)
            .split(":");

        this.setState(() => {
            return {hours: startTime[0], minutes: startTime[1], seconds: startTime[2]}
        });
    }

    toggleDrawer = () => () => {
        const open = this.state.open;
        this.setState({
            open: !open
        });
    };

    handleHoursChange = ({target: {
            value
        }}) => {
        var hours = Math.max(Math.min(value, 59), 0)
        this.setState(() => {
            return {hours: hours};
        })
        this
            .props
            .onStartTimeChange({hours: hours, minutes: this.state.minutes, seconds: this.state.seconds});
    }

    handleSecondsChange = ({target: {
            value
        }}) => {
        var seconds = Math.max(Math.min(value, 59), 0)
        this.setState(() => {
            return {seconds: seconds};
        })
        this
            .props
            .onStartTimeChange({hours: this.state.hours, minutes: this.state.minutes, seconds: seconds});
    }

    handleMinutesChange = ({target: {
            value
        }}) => {
        var minutes = Math.max(Math.min(value, 59), 0)
        this.setState(() => {
            return {minutes: minutes};
        })
        this
            .props
            .onStartTimeChange({hours: this.state.hours, minutes: minutes, seconds: this.state.seconds});
    }

    render() {

        const sideList = (
            <div>
                <List align="center">
                    <Typographie className="menu-text" align="center" variant="title">How to use me ?</Typographie>
                </List>
                <Divider/>
                <List className="drawer-list">Use
                    <Icon className="inlineIcon" color="action">play_arrow</Icon>
                    to start the clocks and
                    <Icon className="inlineIcon" color="action">pause</Icon>
                    to stop the clocks.
                </List>
                <List className="drawer-list">Use
                    <Icon className="inlineIcon" color="action">replay</Icon>
                    to reset the clocks.</List>
                <List className="drawer-list">Choose the start time for each clock with the
                    <span className="specialWord">Time</span>
                    field.</List>
                <List className="drawer-list">Press
                    <Icon className="inlineIcon" color="action">compare_arrows</Icon>
                    to inverse the clocks.</List>
                <List className="drawer-list">Press your clock every time you end a turn.</List>
                <Divider/>
                <List align="center">
                    <Typographie className="menu-text" align="center" variant="title">What the point ?</Typographie>
                </List>
                <List className="drawer-list">I'm a chess clock.</List>
                <List className="drawer-list">
                    <Typographie variant="caption">
                        Wikipedia : A chess clock consists of two adjacent clocks with buttons to stop
                        one clock while starting the other, so that the two clocks never run
                        simultaneously. Chess clocks are used in chess and other two-player games where
                        the players move in turn. The purpose is to keep track of the total time each
                        player takes for his or her own moves, and ensure that neither player overly
                        delays the game.
                    </Typographie>
                </List>

            </div>
        );

        const buttonToggleClass = this.props.isActive
            ? "menu-activeButton"
            : "menu-disableButton";

        const buttonToggleIcon = this.props.isActive
            ? <Icon color="action">pause</Icon>
            : <Icon color="action">play_arrow</Icon>;

        return (

            <MenuList className="menu">
                <MenuItem
                    button={true}
                    className={`menu-item-action ${buttonToggleClass}`}
                    onClick={(e) => {
                    if (e.keyCode == undefined) {
                        this
                            .props
                            .onSwitchButtonClick();
                    }
                }}>
                    {buttonToggleIcon}
                    <Typographie className="menu-text" align="center" variant="button">{this.props.isActive
                            ? "STOP"
                            : "PLAY"}
                    </Typographie>
                </MenuItem>
                <MenuItem
                    className="menu-item-action menu-resetButton"
                    button={true}
                    onClick={this.props.onResetButtonClick}>
                    <Icon color="action">replay</Icon>
                    <Typographie className="menu-text " align="center" variant="button">reset</Typographie>
                </MenuItem>
                <MenuItem className="menu-item-action">
                    <TextField
                        id="number"
                        label="hours"
                        type="number"
                        InputLabelProps={{
                        shrink: true
                    }}
                        margin="normal"
                        onChange={this.handleHoursChange}
                        value={this.state.hours}/>
                    <TextField
                        id="number"
                        label="minutes"
                        type="number"
                        InputLabelProps={{
                        shrink: true
                    }}
                        margin="normal"
                        onChange={this.handleMinutesChange}
                        value={this.state.minutes}/>
                    <TextField
                        id="number"
                        label="secondes"
                        type="number"
                        InputLabelProps={{
                        shrink: true
                    }}
                        margin="normal"
                        onChange={this.handleSecondsChange}
                        value={this.state.seconds}/>
                </MenuItem>
                <MenuItem
                    button={true}
                    className="menu-item-action menu-invertButton"
                    onClick={this.props.onInvertButtonClick}>
                    <Typographie variant="button">
                        <Icon>compare_arrows</Icon>
                    </Typographie>
                </MenuItem>
                <MenuItem
                    button={true}
                    className="menu-item-info"
                    onClick={this.toggleDrawer()}>

                    <Icon>arrow_back</Icon>
                    <Typographie variant="button">Info</Typographie>

                    <Drawer anchor="right" open={this.state.open} onClose={this.toggleDrawer()}>
                        <div
                            className="menu-drawer"
                            tabIndex={0}
                            role="button"
                            onClick={this.toggleDrawer()}
                            onKeyDown={this.toggleDrawer()}>
                            {sideList}
                        </div>
                    </Drawer>
                </MenuItem>
            </MenuList>
        )
    }
}
Menu.propTypes = {
    isActive: PropTypes.bool.isRequired,
    onSwitchButtonClick: PropTypes.func.isRequired,
    onResetButtonClick: PropTypes.func.isRequired,
    onInvertButtonClick: PropTypes.func.isRequired,
    onStartTimeChange: PropTypes.func.isRequired,
    startTime: PropTypes.number.isRequired

}

export default Menu;