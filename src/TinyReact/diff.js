import mountElement from "./mountElement"
import updateNodeElement from "./updateNodeElement";
import updateTextNode from "./updateTextNode"

export default function diff(virtualDOM, container, oldDOM) {
    const oldVirtualDOM = oldDOM && oldDOM._virtualDOM;
    if (!oldDOM) {
        mountElement(virtualDOM, container)
    } else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
        if (virtualDOM.type === "text") {
            updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
        } else {
            updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM)
        }
        virtualDOM.children.forEach((child, i) => {
            diff(child, oldDOM, oldDOM.childNodes[i])
        });
    }
}