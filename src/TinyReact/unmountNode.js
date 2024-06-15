export default function unmountNode(node) {
	const virtualDOM = node._virtualDOM;
	if (virtualDOM.type === "text") {
		node.remove();
		return;
	}
	let component = virtualDOM.component;
	if (component) {
		component.componentWillUnmount();
	}
	if (virtualDOM.props && virtualDOM.props.ref) {
		virtualDOM.props.ref(null);
	}
	Object.keys(virtualDOM.props).forEach((propName) => {
		if (propName.slice(0, 2) === "on") {
			const eventName = propName.toLowerCase().slice(2);
			const eventHandler = virtualDOM.props[propName];
			node.removeEventListener(eventName, eventHandler);
		}
	});

    if (node.childNodes.length > 0) {
        for(let i = 0; i < node.childNodes.length; i++) {
            unmountNode(node.childNodes[i]);
            i--;
        }
    }
    node.remove();
}
