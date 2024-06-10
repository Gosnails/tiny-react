import isFunction from "./isFunction";
import isFunctionComponent from "./isFunctionComponent";
import mountNativeElement from "./mountNativeElement";

export default function mountComponent(virtualDOM, container) {
    let nextVirtualDOM = null;
    if (isFunctionComponent(virtualDOM)) {
        nextVirtualDOM = buildFunctionComponent(virtualDOM)
    } else {
        nextVirtualDOM = buildClassComponent(virtualDOM)
    }
    if(isFunction(nextVirtualDOM)) {
        mountComponent(nextVirtualDOM, container)
    } else {
        mountNativeElement(nextVirtualDOM, container)
    }

}
function buildClassComponent(virtualDOM) {
    const component= new virtualDOM.type()
   const nextVirtualDOM = component.render()
   return nextVirtualDOM;
}

function buildFunctionComponent(virtualDOM) {
    return virtualDOM.type(virtualDOM.props || {})
}