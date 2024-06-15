
/**
 * 这段代码定义了一个名为 updateNodeElement 的函数，它用于更新一个 DOM 元素的属性。
 * 这个函数接受三个参数：newElement，virtualDOM 和 oldVirtualDOM。
 * @param {*} newElement 这是一个真实的 DOM 元素，它将被更新。
 * @param {*} virtualDOM 这是一个新的虚拟 DOM 对象，它描述了元素的当前状态。
 * @param {*} oldVirtualDOM 这是一个旧的虚拟 DOM 对象，它描述了元素的前一个状态。如果没有提供 oldVirtualDOM 参数，那么默认值是一个空对象。
 */
export default function updateNodeElement(newElement, virtualDOM, oldVirtualDOM = {}) {
	// 它获取 virtualDOM 和 oldVirtualDOM 的 props 属性，
	const newProps = virtualDOM.props;
	const oldProps = (oldVirtualDOM.props) || {};
	// 然后遍历 newProps 的所有属性。
	Object.keys(newProps).forEach((propName) => {
		const newPropsValue = newProps[propName];
		const oldPropsValue = oldProps[propName];
		// 对于每一个属性，它比较新旧两个属性值。如果它们不相等，那么就更新 newElement 的对应属性。
		if (newPropsValue !== oldPropsValue) {
			// 如果属性名以 "on" 开头，那么就认为这是一个事件监听器，使用 addEventListener 和 removeEventListener 方法添加和移除事件监听器。
			if (propName.slice(0, 2) === "on") {
				const eventName = propName.toLowerCase().slice(2);
				newElement.addEventListener(eventName, newPropsValue);

				if (oldPropsValue) {
					newElement.removeEventListener(eventName, oldPropsValue);
				}
			} else if (propName === "value" || propName === "checked") { 
				// 如果属性名是 "value" 或 "checked"，那么就直接更新 newElement 的对应属性。
				newElement[propName] = newPropsValue;
			} else if (propName !== "children") { //  如果属性名不是 "children"
				// 如果属性名是 "className"，那么就将属性名转换为 "class"。
				if (propName === "className") {
					newElement.setAttribute("class", newPropsValue);
				} else {
					// 那么就使用 setAttribute 方法更新 newElement 的对应属性。
					newElement.setAttribute(propName, newPropsValue);
				}
			}
		}
	});
	// 它遍历 oldProps 的所有属性，如果新的属性值不存在，那么就从 newElement 中移除对应的属性或事件监听器。
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
