import mountElement from "./mountElement";

export default function diffComponent(virtualDOM, oldComponent, oldDOM, container) {
    if (isSameComponent(virtualDOM, oldComponent)) {
        console.log("tongyige");
    } else {
        mountElement(virtualDOM, container, oldDOM)
    }
}

function isSameComponent(virtualDOM, oldComponent) {
    return oldComponent && virtualDOM.type === oldComponent.constructor;
}