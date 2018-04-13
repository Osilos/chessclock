import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {MenuItem, MenuList} from 'material-ui/Menu';
import List from 'material-ui/List';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Icon from 'material-ui/Icon'
import Typographie from 'material-ui/Typography';

import './Menu.css';

const styles = {
    list: {
        width: 250
    },
    fullList: {
        width: 'auto'
    }
};

class Menu extends Component {

    constructor() {
        super();
        this.state = {
            open: false
        }
    }

    toggleDrawer = () => () => {
        const open = this.state.open;
        this.setState({
            open: !open
        });
    };

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
                <List className="drawer-list">I'm a chest clock.</List>
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

        const buttonToggleClass = this.props.text === "stop"
            ? "menu-disableButton"
            : "menu-activeButton";

        const buttonToggleIcon = this.props.text === "stop"
            ? <Icon color="action">pause</Icon>
            : <Icon color="action">play_arrow</Icon>;

        return (

            <MenuList className="menu">
                <MenuItem
                    className={`menu-item-action ${buttonToggleClass}`}
                    button={true}
                    onClick={this.props.onSwitchButtonClick}>
                    {buttonToggleIcon}<Typographie className="menu-text" align="center" variant="button">{this.props.text}</Typographie>
                </MenuItem>
                <MenuItem
                    className="menu-item-action"
                    button={true}
                    onClick={this.props.onSwitchButtonClick}>
                    <Icon color="action">replay</Icon>
                    <Typographie className="menu-text" align="center" variant="button">reset</Typographie>
                </MenuItem>
                <MenuItem
                    button={true}
                    className="menu-item-action"
                    onClick={this.toggleDrawer()}>
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
    text: PropTypes
        .oneOf(['start', 'stop'])
        .isRequired,
    onSwitchButtonClick: PropTypes.func.isRequired
}

export default Menu;