/**
 * 这段代码定义了一个名为 unmountNode 的函数，它用于卸载（或移除）一个 DOM 节点。
 * 这个函数接受一个参数 node，它是一个真实的 DOM 节点。
 * @param {*} node 一个真实的 DOM 节点
 * @returns 
 */
export default function unmountNode(node) {
    // 它从 node 中获取虚拟 DOM 对象 virtualDOM。
	const virtualDOM = node._virtualDOM;
    // 如果 virtualDOM.type 是 "text"，那么就直接移除 node 并返回。
	if (virtualDOM.type === "text") {
		node.remove();
		return;
	}
    // 如果 virtualDOM.component 存在，那么就调用 component.componentWillUnmount 方法，表示组件将要被卸载。
	let component = virtualDOM.component;
	if (component) {
		component.componentWillUnmount();
	}
    // 如果 virtualDOM.props.ref 存在，那么就调用 virtualDOM.props.ref(null)，将引用设置为 null。
	if (virtualDOM.props && virtualDOM.props.ref) {
		virtualDOM.props.ref(null);
	}

    // 它遍历 virtualDOM.props 的所有属性，
	Object.keys(virtualDOM.props).forEach((propName) => {
        // 如果属性名以 "on" 开头，那么就从 node 中移除对应的事件监听器。
		if (propName.slice(0, 2) === "on") {
			const eventName = propName.toLowerCase().slice(2);
			const eventHandler = virtualDOM.props[propName];
			node.removeEventListener(eventName, eventHandler);
		}
	});

    // 如果 node 有子节点，
    if (node.childNodes.length > 0) {
        // 那么就递归调用 unmountNode 函数，卸载所有的子节点。
        for(let i = 0; i < node.childNodes.length; i++) {
            unmountNode(node.childNodes[i]);
            i--;
        }
    }
    // 移除 node。
    node.remove();
}
