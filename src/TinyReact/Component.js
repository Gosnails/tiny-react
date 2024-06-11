import diff from "./diff";

export default class Component {
	constructor(props) {
		this.props = props;
	}
    setState(state) {
        this.state = Object.assign({}, this.state, state);
        let virtualDOM = this.render();
        let oldDOM = this.getDOM();
        let container = oldDOM.parentNode;
        diff(virtualDOM, container, oldDOM)
    }

    setDOM(dom) {
        this._dom = dom;
    }
    getDOM() {
        return this._dom
    }
}
