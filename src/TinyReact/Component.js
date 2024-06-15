import diff from "./diff";

/**
 * 这段代码定义了一个名为 Component 的类，它是一个基础的组件类
 */
export default class Component {
	// 构造函数，接收一个 props 参数，这个参数通常是一个对象，包含了组件的属性。
	constructor(props) {
		this.props = props;
	}
	// 这个方法用于更新组件的状态。它接收一个 state 对象
	setState(state) {
		// 然后将这个对象合并到当前的状态中。
		this.state = Object.assign({}, this.state, state);
		// 然后，它会调用 render 方法生成一个新的虚拟 DOM
		let virtualDOM = this.render();
		// 获取当前的 DOM 元素，
		let oldDOM = this.getDOM();
		// 以及其父容器
		let container = oldDOM.parentNode;
		// 然后调用 diff 函数进行比较和更新。
		diff(virtualDOM, container, oldDOM);
	}

	// 这个方法用于设置组件的 DOM 表示。
	setDOM(dom) {
		this._dom = dom;
	}
	// 这个方法用于获取组件的 DOM 表示。
	getDOM() {
		return this._dom;
	}
	// 这个方法用于更新组件的属性。
	updateProps(props) {
		this.props = props;
	}
	// 这些方法在组件的不同生命周期阶段被调用，包括 componentWillMount、componentDidMount、componentWillReceiveProps、shouldComponentUpdate、componentWillUpdate、componentDidUpdate 和 componentWillUnmount。这些方法在默认情况下是空的，可以在子类中重写。
	componentWillMount() {}
	componentDidMount() {}
	componentWillReceiveProps(nextProps) {}
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps !== this.props || nextState !== this.state;
	}
	componentWillUpdate(nextProps, nextState) {}
	componentDidUpdate(prevProps, preState) {}
	componentWillUnmount() {}
}
