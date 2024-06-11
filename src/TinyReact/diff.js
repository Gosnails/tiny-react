import createDOMElement from "./createDOMElement";
import mountElement from "./mountElement";
import updateNodeElement from "./updateNodeElement";
import updateTextNode from "./updateTextNode";
import unmountNode from "./unmountNode";
import diffComponent from "./diffComponent";

export default function diff(virtualDOM, container, oldDOM) {
	const oldVirtualDOM = oldDOM && oldDOM._virtualDOM;
    const oldComponent = oldVirtualDOM && oldVirtualDOM.component;
	if (!oldDOM) {
		mountElement(virtualDOM, container);
	} else if (virtualDOM.type !== oldVirtualDOM.type && typeof virtualDOM.type !== "function") {
		const newElement = createDOMElement(virtualDOM);
		oldDOM.parentNode.replaceChild(newElement, oldDOM);
	} else if (typeof virtualDOM.type === "function") {
        diffComponent(virtualDOM, oldComponent, oldDOM, container)
    } else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
		if (virtualDOM.type === "text") {
			updateTextNode(virtualDOM, oldVirtualDOM, oldDOM);
		} else {
			updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM);
		}
		virtualDOM.children.forEach((child, i) => {
			diff(child, oldDOM, oldDOM.childNodes[i]);
		});

		let oldChildNodes = oldDOM.childNodes;
		if (oldChildNodes.length > virtualDOM.children.length) {
			for (let i = oldChildNodes.length - 1; i > virtualDOM.children.length - 1; i--) {
				unmountNode(oldChildNodes[i]);
			}
		}
	}
}
