export default function updateNodeElement(newElement, virtualDOM, oldVirtualDOM = {}) {
	const newProps = virtualDOM.props;
	const oldProps = (oldVirtualDOM.props) || {};
	Object.keys(newProps).forEach((propName) => {
		const newPropsValue = newProps[propName];
		const oldPropsValue = oldProps[propName];
		if (newPropsValue !== oldPropsValue) {
			if (propName.slice(0, 2) === "on") {
				const eventName = propName.toLowerCase().slice(2);
				newElement.addEventListener(eventName, newPropsValue);

				if (oldPropsValue) {
					newElement.removeEventListener(eventName, oldPropsValue);
				}
			} else if (propName === "value" || propName === "checked") {
				newElement[propName] = newPropsValue;
			} else if (propName !== "children") {
				if (propName === "className") {
					newElement.setAttribute("class", newPropsValue);
				} else {
					newElement.setAttribute(propName, newPropsValue);
				}
			}
		}
	});
    Object.keys(oldProps).forEach((propName) => {
        const newPropsValue = newProps[propName];
        const oldPropsValue = oldProps[propName];
        if (!newPropsValue) {
            if (propName.slice(0, 2) === "on") {
                const eventName = propName.toLowerCase().slice(2);
                newElement.removeEventListener(eventName, oldPropsValue)
            } else if (propName !== "children") {
                newElement.removeAttribute(propName);
            }
        }
    })
}
