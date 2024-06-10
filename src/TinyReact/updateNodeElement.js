export default function updateNodeElement(newElement, virtualDOM) {
    const newProps = virtualDOM.props;
    Object.keys(newProps).forEach(propName => {
        const newPropsValue = newProps[propName]
        if (propName.slice(0, 2) === "on") {
            const eventName = propName.toLowerCase().slice(2);
            newElement.addEventListener(eventName, newPropsValue)
        } else if (propName === 'value' || propName === "checked") {
            newElement[propName] = newPropsValue
        } else if (propName !== 'children') {
            if (propName === "className") {
                newElement.setAttribute('class', newPropsValue)
            } else {
                newElement.setAttribute(propName, newPropsValue)
            }
        }
    })

}