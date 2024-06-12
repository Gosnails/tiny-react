import createDOMElement from "./createDOMElement"
import unmountNode from "./unmountNode";

export default function mountNativeElement(virtualDOM, container, oldDOM) {
    let newElement = createDOMElement(virtualDOM)
    if (oldDOM) {
        container.insertBefore(newElement, oldDOM)
    } else {
        container.appendChild(newElement)
    }
    if (oldDOM) {
        unmountNode(oldDOM);
    }

    let component = virtualDOM.component;

    if(component) {
        component.setDOM(newElement);
    }
}