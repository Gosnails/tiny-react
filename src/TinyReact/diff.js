import createDOMElement from "./createDOMElement";
import mountElement from "./mountElement";
import updateNodeElement from "./updateNodeElement";
import updateTextNode from "./updateTextNode";
import unmountNode from "./unmountNode";
import diffComponent from "./diffComponent";

/**
 * 这段代码定义了一个名为 diff 的函数，它用于比较新旧两个虚拟 DOM 对象，并根据比较结果更新真实的 DOM 树。
 * 这个函数接受三个参数：virtualDOM，container 和 oldDOM。
 * @param {*} virtualDOM 这是一个新的虚拟 DOM 对象，它描述了一个 DOM 元素或组件的当前状态。
 * @param {*} container 这是一个真实的 DOM 元素，它将作为新元素的父容器。
 * @param {*} oldDOM 这是一个真实的 DOM 元素，它是元素或组件的旧的真实表示
 */
export default function diff(virtualDOM, container, oldDOM) {
	// 它从 oldDOM 中获取旧的虚拟 DOM 对象 oldVirtualDOM 和旧的组件 oldComponent。
	const oldVirtualDOM = oldDOM && oldDOM._virtualDOM;
	const oldComponent = oldVirtualDOM && oldVirtualDOM.component;
	if (!oldDOM) {
		// 如果 oldDOM 不存在，那么就调用 mountElement 函数，将 virtualDOM 挂载到 container 中。
		mountElement(virtualDOM, container);
	} else if (virtualDOM.type !== oldVirtualDOM.type && typeof virtualDOM.type !== "function") {
		// 如果 virtualDOM.type 和 oldVirtualDOM.type 不相等，并且 virtualDOM.type 不是一个函数，那么就创建一个新的 DOM 元素，并用它替换 oldDOM。
		const newElement = createDOMElement(virtualDOM);
		oldDOM.parentNode.replaceChild(newElement, oldDOM);
	} else if (typeof virtualDOM.type === "function") {
		// 如果 virtualDOM.type 是一个函数，那么就调用 diffComponent 函数，比较和更新组件。
		diffComponent(virtualDOM, oldComponent, oldDOM, container);
	} else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
		// 如果 oldVirtualDOM 存在，并且 virtualDOM.type 和 oldVirtualDOM.type 相等，
		if (virtualDOM.type === "text") {
			// 那么就更新文本节点。
			updateTextNode(virtualDOM, oldVirtualDOM, oldDOM);
		} else {
			// 那么就更新元素节点的属性。
			updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM);
		}

		// 收集带有 key 的元素：遍历 oldDOM 的所有子节点
		let keydElements = {};
		for (let i = 0; i < oldDOM.childNodes.length; i++) {
			let domElement = oldDOM.childNodes[i];
			if (domElement.nodeType === 1) {
				let key = domElement.getAttribute("key");
				if (key) {
					// 如果子节点是一个元素节点（nodeType === 1），并且它有一个 key 属性，那么就将它添加到 keydElements 对象中
					// key 属性的值作为键，DOM 元素作为值。
					keydElements[key] = domElement;
				}
			}
		}
		// 通过检查 keydElements 对象的键的数量，来判断 oldDOM 是否有带有 key 的元素。
		let hasNoKey = Object.keys(keydElements).length === 0;
		if (hasNoKey) {
			// 如果 oldDOM 没有带有 key 的元素，那么就遍历 virtualDOM.children
			virtualDOM.children.forEach((child, i) => {
				// 对每个子节点调用 diff 函数，将子节点、oldDOM 和对应的旧的子节点作为参数。
				diff(child, oldDOM, oldDOM.childNodes[i]);
			});
		} else {
			// 如果 oldDOM 有带有 key 的元素，那么就遍历 virtualDOM.children，
			virtualDOM.children.forEach((child, i) => {
				let key = child.props.key;
				if (key) {
					// 对每个子节点检查它的 key 属性。如果 key 属性存在，并且在 keydElements 中可以找到对应的 DOM 元素，
					let domElement = keydElements[key];
					if (domElement) {
						// 那么就将这个 DOM 元素插入到 oldDOM.childNodes[i] 的前面，
						if (oldDOM.childNodes[i] && oldDOM.childNodes[i] !== domElement) {
							oldDOM.insertBefore(domElement, oldDOM.childNodes[i]);
						}
					} else {
						// 调用 mountElement 函数挂载新的子节点。
						mountElement(child, oldDOM, oldDOM.childNodes[i]);
					}
				}
			});
		}

		// 如果 oldDOM 的子节点数量多于 virtualDOM.children 的数量，那么就移除多余的旧的子节点。
		let oldChildNodes = oldDOM.childNodes;
		if (oldChildNodes.length > virtualDOM.children.length) {
			// 如果 oldDOM 没有带有 key 的元素，那么就从后往前移除子节点。
			if (hasNoKey) {
				for (let i = oldChildNodes.length - 1; i > virtualDOM.children.length - 1; i--) {
					unmountNode(oldChildNodes[i]);
				}
			} else {
				// 如果 oldDOM 有带有 key 的元素，那么就遍历 oldDOM.childNodes，对每个子节点检查它的 key 属性，
				for (let i = 0; i < oldChildNodes.length; i++) {
					let oldChild = oldChildNodes[i];
					let oldChildKey = oldChild._virtualDOM.props.key;
					let found = false;
					for (let n = 0; n < virtualDOM.children.length; n++) {
						if (oldChildKey === virtualDOM.children[n].props.key) {
							found = true;
							break;
						}
					}
					// 如果在 virtualDOM.children 中找不到对应的 key，那么就移除这个子节点。
					if (!found) {
						unmountNode(oldChild);
					}
				}
			}
		}
	}
}
