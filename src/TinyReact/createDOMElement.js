import mountElement from "./mountElement";

export default function createDOMElement(virtualDOM) {
    let newElement = null;
    if (virtualDOM.type === "text") {
        newElement = document.createTextNode(virtualDOM.props.textContent)
    } else {
        newElement = document.createElement(virtualDOM.type);
    }

    virtualDOM.children.forEach(child => {
        mountElement(child, newElement)
    });

    return newElement;
}