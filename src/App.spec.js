import App from './App';
import ReactDOM from 'react-dom';
import React from 'react';
import {configure} from 'enzyme';
import {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

describe('app methods works correctly', () => {
    it('App.setTimer()', () => {
        const wrapper = shallow(<App/>);
        const time = 1000;
        wrapper
            .instance()
            .setTimer(time);
        expect(wrapper.state().timers[0]).toEqual(time);
        expect(wrapper.state().timers[1]).toEqual(time);
    })
    it('App.updateTimer()', () => {
        const wrapper = shallow(<App/>);
        const currentTime = wrapper
            .state()
            .timers[
                wrapper
                    .state()
                    .currentTimer
            ];

        wrapper
            .instance()
            .updateTimer();

        expect(wrapper.state().timers[
            wrapper
                .state()
                .currentTimer
        ]).toEqual(currentTime - App.timerTick());

    })
    it('App.handleTimerClick', () => {
        const wrapper = shallow(<App/>);
        const oldTimer = wrapper
            .state()
            .currentTimer;

        wrapper
            .instance()
            .handleTimerClick();

        expect(oldTimer)
            .not
            .toBe(wrapper.state.currentTimer);

    })
    it('App.handleResetClick', () => {
        const wrapper = shallow(<App/>);
        wrapper
            .instance()
            .handleResetClick();

        expect(wrapper.state().timers[0]).toEqual(wrapper.state().timers[1]);
        expect(wrapper.state().timers[0]).toEqual(wrapper.state().startTime);
    })
    it('App.handleInvertClick', () => {
        const wrapper = shallow(<App/>);
        const colors = wrapper
            .state()
            .colors;
        const timers = wrapper
            .state()
            .timers;

        wrapper
            .instance()
            .handleInvertClick();

        expect(wrapper.state().colors[0]).toEqual(colors[1]);
        expect(wrapper.state().colors[1]).toEqual(colors[0]);
        expect(wrapper.state().timers[1]).toEqual(timers[0]);
        expect(wrapper.state().timers[0]).toEqual(timers[1]);
    })
    it('App.handleToggleClick', () => {
        const wrapper = shallow(<App/>);
        const active = wrapper
            .state()
            .active;
        wrapper
            .instance()
            .handleToggleClick();

        expect(wrapper.state().active).toBe(!active);
    })
    it('App.handleConfirmDialog', () => {
        const wrapper = shallow(<App/>);
        wrapper.setState(() => {
            end : true
        });
        wrapper
            .instance()
            .handleConfirmDialog();
        expect(wrapper.state().end).toBe(false);
        expect(wrapper.state().hasPlayEnd).toBe(false);
    })
    it('end equal true when timer is end', () => {
        const wrapper = shallow(<App/>);
        var {timers, currentTimer} = wrapper.state();

        timers[currentTimer] = 0;

        wrapper.setState(() => {
            timers : timers
        })

        wrapper
            .instance()
            .updateTimer();

        expect(wrapper.state().end).toBe(true);
    })
    it('App.state.hasChange true after handleTimerClick', () => {
        const wrapper = shallow(<App/>);
        wrapper.setState(() => {
            return {active: true}
        }, () => {
            wrapper
                .instance()
                .handleTimerClick();
        });

        expect(wrapper.state().hasChange).toBe(true);
    })
})

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <App/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
