import React from "react";
import {Router} from "react-router";
import {shallow} from "enzyme";
import {expect} from "chai";
import {Header} from "../../components/Header";
export default () => {
	describe("<header /> component", () => {
		const wrapper = shallow(
			<Header />
		);
		it("should hides header", () => {
			wrapper.setProps({
				headerType: 0,
				headerLeftButton: {},
				headerRightButton: {}
			});
			expect(wrapper.hasClass("hidden")).to.be.true;
		});
		it("should shows header and render a title", () => {
			const title = "标题";
			wrapper.setProps({
				title
			});
			expect(wrapper.find("strong").text()).to.equals(title);
		});
		it("show and should has as back icon", () => {
			wrapper.setProps({
				headerLeftButton: "back"
			});
			expect(wrapper.hasClass("hidden")).to.be.false;
			expect(wrapper.render().find("icon.back")).to.length(1);
		});
		it("should has right label and displays in color blue", () => {
			const label = "标签";
			wrapper.setProps({
				headerRightButton: {
					label,
					level: 1
				}
			});
			expect(wrapper.render().find(".blue").text()).to.equals(label);
		});
	});
};