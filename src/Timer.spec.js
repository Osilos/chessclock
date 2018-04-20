import {configure} from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import Timer from './Timer';
import {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

describe('<Timer />', () => {
    // comment je test qu'un qu'un composant interne à mon component à bien un props
    // a la bonne valeur ? Là dans timer je set un prop de paper (elevation) à 20
    // ou 0 si il est actif ou pas. Comment je fais pour tester ça ? es ce que c'est
    // testable ? Es ce que c'est mon component qui doit être modfier pour pouvoir le
    // tester ?
    /*it('should have elevation when active', () => {
        const props = {
            color: "black",
            isActive: true,
            time: 1000
        }
        const wrapper = shallow(<Timer {...props}/>);
        console.log(wrapper.instance().props);
        expect(wrapper.hasClass("elevation")).toEqual(20);
    })*/
    it('should call onClick function on click', () => {
        const props = {
            color: "black",
            isActive: true,
            time: 1000,
            onClick: jest.fn()
        }
        const wrapper = shallow(<Timer {...props}/>);
        wrapper.simulate('click');
        expect(props.onClick).toHaveBeenCalled();
    })
});
