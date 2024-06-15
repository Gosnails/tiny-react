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
		let keydElements = {}

		for(let i = 0; i < oldDOM.childNodes.length; i++) {
			let domElement = oldDOM.childNodes[i];
			if (domElement.nodeType === 1) {
				let key = domElement.getAttribute("key");
				if (key) {
					keydElements[key] = domElement;
				}
			}
		}

		let hasNoKey = Object.keys(keydElements).length === 0;
		if (hasNoKey) {
			virtualDOM.children.forEach((child, i) => {
				diff(child, oldDOM, oldDOM.childNodes[i]);
			});
		} else {
			virtualDOM.children.forEach((child, i) => {
				let key = child.props.key;
				if (key) {
					let domElement = keydElements[key];
					if (domElement) {
						if (oldDOM.childNodes[i] && oldDOM.childNodes[i] !==domElement){
							oldDOM.insertBefore(domElement, oldDOM.childNodes[i])
						}
					} else {
						mountElement(child, oldDOM, oldDOM.childNodes[i])
					}
				}
			})
		}

		let oldChildNodes = oldDOM.childNodes;
		if (oldChildNodes.length > virtualDOM.children.length) {
			if (hasNoKey) {
				for (let i = oldChildNodes.length - 1; i > virtualDOM.children.length - 1; i--) {
					unmountNode(oldChildNodes[i]);
				}
			} else {
				for(let i = 0; i < oldChildNodes.length; i++) {
					let oldChild = oldChildNodes[i];
					let oldChildKey = oldChild._virtualDOM.props.key;
					let found = false;
					for(let n = 0; n < virtualDOM.children.length; n++) {
						if (oldChildKey === virtualDOM.children[n].props.key) {
							found = true;
							break;
						}	
					}
					if (!found) {
						unmountNode(oldChild);
					}
				}
			}
		
		}
	}
}
