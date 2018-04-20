import React from 'react';
import ReactDOM from 'react-dom';
import Utils from './Utils';

describe('millisecondsToTime work correctly', () => {
    it('it calcul correctly 3 seconds', () => {
        var time = Utils.millisecondsToTime(3000);
        expect(time).toEqual({hours: 0, minutes: 0, seconds: 3, centiseconds: 0});
    });
    it('it calcul correctly 10 centiseconds', () => {
        var time = Utils.millisecondsToTime(100);
        expect(time).toEqual({hours: 0, minutes: 0, seconds: 0, centiseconds: 10});
    })
    it('it calcul correctly 2 minutes', () => {
        var time = Utils.millisecondsToTime(120000);
        expect(time).toEqual({hours: 0, minutes: 2, seconds: 0, centiseconds: 0});
    })
    it('calcul correctly 1 hours', () => {
        var time = Utils.millisecondsToTime(3600000);
        expect(time).toEqual({hours: 1, minutes: 0, seconds: 0, centiseconds: 0});
    })
    it('calcul correctly 1h30m10s10', () => {
        var time = Utils.millisecondsToTime(5410100);
        expect(time).toEqual({hours: 1, minutes: 30, seconds: 10, centiseconds: 10});
    })
})

describe('formatTime works correctly', () => {
    it('correctly format 1s', () => {
        var time = Utils.formatTime(1000);
        expect(time).toEqual("00:00:01:00");
    })
    it('correctly format 1m', () => {
        var time = Utils.formatTime(60000);
        expect(time).toEqual("00:01:00");
    })
    it('correctly format 1h30m10s10', () => {
        var time = Utils.formatTime(5410100);
        expect(time).toEqual("01:30:10");
    })
})