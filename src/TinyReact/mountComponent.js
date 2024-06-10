import isFunction from "./isFunction";
import isFunctionComponent from "./isFunctionComponent";
import mountNativeElement from "./mountNativeElement";

export default function mountComponent(virtualDOM, container) {
    let nextVirtualDOM = null;
    if (isFunctionComponent(virtualDOM)) {
        nextVirtualDOM = buildFunctionComponent(virtualDOM)
    }
    if(isFunction(nextVirtualDOM)) {
        mountComponent(nextVirtualDOM, container)
    } else {
        mountNativeElement(nextVirtualDOM, container)
    }
}

function buildFunctionComponent(virtualDOM) {
    return virtualDOM.type()
}