import App from './App';
import ReactDOM from 'react-dom';
import React from 'react';
import {configure} from 'enzyme';
import {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

describe('app methods works correctly', () => {
    it('App.play()', () => {
        const wrapper = shallow(<App/>);
        wrapper
            .instance()
            .play();

        expect(wrapper.state().active).toEqual(true);
        expect(wrapper.state().interval)
            .not
            .toBe(null);
    })
    it('App.stop()', () => {
        const wrapper = shallow(<App/>);
        wrapper
            .instance()
            .stop();

        expect(wrapper.state().active).toEqual(false);
        expect(wrapper.state().interval).toEqual(null);
    })
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

        // là y a pas un moyen de faire plus court ? Et es ce que c'est pertinent de
        // testé aussi précisement ? et es ce que c'est bein de mettre plusieurs expect
        // dans un même 'it' ?

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

        // bon ici je suis pas hyper sur du test. Genre je test sur ça a bien inversé la
        // propriété active. Mais ce que fait la fonction handleToggleClick c'est
        // qu'elle appel soit app.play() ou soit app.stop(). Et je sais pas si c'est
        // comme ça qu'il faut le tester...
    })
})

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <App/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
