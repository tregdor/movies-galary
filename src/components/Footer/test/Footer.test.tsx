import React from "react";
import {shallow} from "enzyme";
import Footer from "../Footer";
it('should render footer', () => {
    const component = shallow(<Footer/>);
    expect(component).toMatchSnapshot();
});