const e = React.createElement;

class HelloMessageNoJSX extends React.Component {
    render() {
        return e("div", null, "Hello ", this.props.name);
    }

    static renderDOM() {
        ReactDOM.render(e(HelloMessageNoJSX, { name: "Taylor" }),
            document.getElementById('hello-example'));
    }
}

class TimerNoJSX extends Timer {
    render() {
        return e('div', null, 'Seconds: ', this.state.seconds);
    }

    static renderDOM() {
        ReactDOM.render(e(TimerNoJSX, null),
            document.getElementById('timer'));
    }
}

class TodoAppNoJSX extends TodoApp {
    render() {
        return e("div", null,
            e("h3", null, "TODO"),
            e(TodoListNoJSX, { items: this.state.items }),
            e("form", { onSubmit: this.handleSubmit },
                e("label", { htmlFor: "new-todo" }, "What needs to be done?"),
                e("input", { id: "new-todo", onChange: this.handleChange, value: this.state.text }),
                e("button", null, "Add #", this.state.items.length + 1)));
    }

    static renderDOM() {
        ReactDOM.render(e(TodoAppNoJSX, null),
            document.getElementById('todo-app'));
    }
}

class TodoListNoJSX extends React.Component {
    render() {
        return e("ul", null,
            this.props.items.map(item => e(
                "li", { key: item.id }, item.text
            ))
        );
    }
}

class MarkdownEditorNoJSX extends MarkdownEditor {
    render() {
        return e("div", { className: "MarkdownEditor" },
            e("h3", null, "Input"),
            e("label", { htmlFor: "markdown-content" }, "Enter some Markdown"),
            e("textarea", { id: "markdown-content",
                onChange: this.handleChange,
                defaultValue: this.state.value}),
            e("h3", null, "Output"),
            e("div", { className: "content",
                dangerouslySetInnerHTML: this.getRawMarkup() }));
    }

    static renderDOM() {
        ReactDOM.render(e(MarkdownEditorNoJSX, null),
            document.getElementById('markdown-editor'));
    }
}

const elements = [HelloMessageNoJSX, TimerNoJSX, TodoAppNoJSX, MarkdownEditorNoJSX];
elements.forEach(elem => elem.renderDOM());
