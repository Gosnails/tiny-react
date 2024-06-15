import TinyReact from "./TinyReact";

const root = document.getElementById("root");

const virtualDom = (
	<div className="container">
		<h1>你好 Tiny React</h1>
		<h2 data-test="test">(编码必杀技)</h2>
		<div>
			嵌套1<div>嵌套1.1</div>
		</div>
		<h3>(观察：这个将会被改变)</h3>
		{2 == 1 && <div>如果2和1相等渲染当前内容</div>}
		{2 == 2 && <div>2</div>}
		<span>这是一段内容</span>
		<button onClick={() => alert("你好")}>点击我</button>
		<h3>这个将会被删除</h3>
		2,3
		<input type="text" value="13" />
	</div>
);

const modifyDOM = (
	<div className="container">
		<h1>你好 Tiny React</h1>
		<h2 data-test="test123">(编码必杀技)</h2>
		<div>
			嵌套1<div>嵌套1.1</div>
		</div>
		<h3>(观察：这个将会被改变)</h3>
		{2 == 1 && <div>如果2和1相等渲染当前内容</div>}
		{2 == 2 && <div>2</div>}
		<button onClick={() => alert("你好！！！")}>点击我</button>
		<input type="text" />
	</div>
);
// TinyReact.render(virtualDom, root)

// setTimeout(() => {
//     TinyReact.render(modifyDOM, root)
// }, 2000);

function Demo() {
	return <div>hello</div>;
}

function Heart(props) {
	return (
		<div>
			{props.title}
			&hearts; <Demo />
		</div>
	);
}
// TinyReact.render(<Heart title="Hello React" />, root)

class Alert extends TinyReact.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "Defualt title",
		};
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {
		this.setState({
			title: "Changle title",
		});
		console.log(this.input.value);
	}
	componentWillReceiveProps(nextProps) {
		console.log(nextProps);
	}
	componentWillUpdate() {
		console.log("componentWillUpdate");
	}
	componentDidUpdate() {
		console.log("componentDidUpdate");
	}
	render() {
		return (
			<div>
				{this.props.title}
				<div>{this.state.title}</div>
				<input type="text" ref={(input) => (this.input = input)} />
				<button onClick={this.handleClick}>改变Title</button>
			</div>
		);
	}
}

class DemoC extends TinyReact.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {
		console.log(this.input.value);
		console.log(this.alert);
	}

	componentWillUnmount() {
		console.log("componentWillUnmount");

	}

	render() {
		return (
			<div>
				<input type="text" ref={(input) => (this.input = input)} />
				<button onClick={this.handleClick}>点击</button>
				<Alert ref={(alert) => (this.alert = alert)} title="22222" />
			</div>
		);
	}
}

class KeyS extends TinyReact.Component {
	constructor(props) {
		super(props);
		this.state = {
			persons: [
				{ id: 1, name: "张三" },
				{ id: 2, name: "李四" },
				{ id: 3, name: "王五" },
				{ id: 4, name: "粮六" },
			],
		};
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {
		const newState = JSON.parse(JSON.stringify(this.state));
        // newState.persons.splice(1, 0, {id: 100, name: "ddd"})
		// newState.persons.push(newState.persons.shift());
		newState.persons.pop()
        console.log(newState);
		this.setState(newState);
	}
	render() {
		return (
			<div>
				<ul>
					{this.state.persons.map((person) => (
						<li key={person.id}>{person.name}
							<DemoC />
						</li>
					))}
				</ul>
				<button onClick={this.handleClick}>点击</button>
			</div>
		);
	}
}

TinyReact.render(<KeyS title="Hello React" />, root);
