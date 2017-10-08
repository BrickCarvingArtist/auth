import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import dialogTest from "./components/dialog";
import headerTest from "./components/header";
Enzyme.configure({
	adapter: new Adapter
});
dialogTest();
headerTest();