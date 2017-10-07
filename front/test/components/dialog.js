import React from "react";
import {expect} from "chai";
import {shallow} from "enzyme";
import Dialog from "../../components/Dialog";
import {delay} from "../../utils";
export default () => {
	describe("<Dialog /> component", async () => {
		await new Promise(resolve => {
			describe("#alert()", () => {
				const wrapper = shallow(
					<Dialog />
				);
				it("should has label <p></p> and innerText", () => {
					const message = "提示信息";
					Dialog.alert(message);
					wrapper.update();
					expect(wrapper.hasClass("hidden")).to.be.false;
					expect(wrapper.state("message")).to.equals(message);
					expect(wrapper.find("p").text()).to.equals(message);
				});
				it("should hides after 1.5 seconds later", async () => {
					await delay(1500);
					wrapper.update();
					expect(wrapper.state("message")).to.be.empty;
					expect(wrapper.find("p").text()).to.be.empty;
					expect(wrapper.hasClass("hidden")).to.be.true;
					resolve();
				});
			});
		});
		describe("#confirm()", () => {
			const wrapper = shallow(
				<Dialog />
			);
			it("should has label <p></p>, 2 labels <a></a> and innerText", () => {
				const message = "确认搞事？";
				Dialog.confirm(message, () => {});
				wrapper.update();
				expect(wrapper.state("message")).to.equals(message);
				expect(wrapper.find("p").text()).to.equals(message);
			});
			it("is hidden by clicking cancel anchor", () => {
				shallow(wrapper.find("a").get(1)).simulate("click");
				wrapper.update();
				expect(wrapper.state("message")).to.be.empty;
				expect(wrapper.find("p").text()).to.be.empty;
			});
		});
	});
};