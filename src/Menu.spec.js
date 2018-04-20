import {configure} from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './Menu';
import {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

describe('<Menu />', () => {
    it('contain a .menu-activeButton when isActive', () => {
        const props = {
            isActive: true,
            onSwitchButtonClick: jest.fn(),
            onResetButtonClick: jest.fn(),
            onInvertButtonClick: jest.fn()
        };
        const wrapper = shallow(<Menu {...props}/>)
        const button = wrapper.find(".menu-activeButton");
        expect(button.length).toEqual(1);
    })
    it('contain a .menu-disableButton when !isActive', () => {
        const props = {
            isActive: false,
            onSwitchButtonClick: jest.fn(),
            onResetButtonClick: jest.fn(),
            onInvertButtonClick: jest.fn()
        };
        const wrapper = shallow(<Menu {...props}/>)
        const button = wrapper.find(".menu-disableButton");
        expect(button.length).toEqual(1);
    })
    it('call onSwitchButtonClick when click on switchButton', () => {
        const props = {
            isActive: true,
            onSwitchButtonClick: jest.fn(),
            onResetButtonClick: jest.fn(),
            onInvertButtonClick: jest.fn()
        };

        // Heu ici j'ai un problème, genre je test dans ma fonction onSwitchButtonClick
        // une propriété de l'event qu'on reçois quand on fait un clic dans le DOM. Mais
        // là dans le test le click est déclenché différeament du coup je reçois rien du
        // tout en paramètre et je me retrouve à essayer de tester un truc qui existe
        // pas... du coup y a un moyen de simulé un objet à envoyé a une fonction qu'on
        // teste ?

        const wrapper = shallow(<Menu {...props}/>)
        const button = wrapper.find(".menu-activeButton");
        button.simulate('click');
        expect(props.onSwitchButtonClick).toHaveBeenCalled();
    })
    it('call onResetButtonClick when click on resetButton', () => {
        const props = {
            isActive: true,
            onSwitchButtonClick: jest.fn(),
            onResetButtonClick: jest.fn(),
            onInvertButtonClick: jest.fn()
        };
        const wrapper = shallow(<Menu {...props}/>);
        const button = wrapper.find('.menu-resetButton');
        button.simulate('click');
        expect(props.onResetButtonClick).toHaveBeenCalled();
    })
    it('call onInvertButtonClick when click on invertButton', () => {
        const props = {
            isActive: true,
            onSwitchButtonClick: jest.fn(),
            onResetButtonClick: jest.fn(),
            onInvertButtonClick: jest.fn()
        };
        const wrapper = shallow(<Menu {...props}/>);
        const button = wrapper.find('.menu-invertButton');
        button.simulate('click');
        expect(props.onInvertButtonClick).toHaveBeenCalled();
    })

    // sur la plupart de ses tests là j'ai mis une class css uniquement pour pouvoir
    // récupérer mes boutons dans les tests... j'imagine qu'il y a d'autre moyen de
    // faire...

})