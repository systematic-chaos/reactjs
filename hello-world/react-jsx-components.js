class HelloMessageJSX extends React.Component {
    render() {
        return (
            <div>
                Hello {this.props.name}
            </div>
        );
    }

    static renderDOM() {
        ReactDOM.render(
            <HelloMessageJSX name="Taylor" />,
            document.getElementById('hello-example-jsx')
        );
    }
}

class TimerJSX extends Timer {
    render() {
        return (
            <div>
                Seconds: {this.state.seconds}
            </div>
        );
    }

    static renderDOM() {
        ReactDOM.render(
            <TimerJSX />,
            document.getElementById('timer-jsx')
        );
    }
}

class TodoAppJSX extends TodoApp {
    render() {
        return (
            <div>
                <h3>TODO</h3>
                <TodoListJSX items={this.state.items} />
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="new-todo">
                        What needs to be done?
                    </label>
                    <input
                        id="new-todo"
                        onChange={this.handleChange}
                        value={this.state.text}
                    />
                    <button>
                        Add #{this.state.items.length + 1}
                    </button>
                </form>
            </div>
        );
    }

    static renderDOM() {
        ReactDOM.render(
            <TodoAppJSX />,
            document.getElementById('todo-app-jsx')
        );
    }
}

class TodoListJSX extends React.Component {
    render() {
        return (
            <ul>
                {this.props.items.map(item => (
                    <li key={item.id}>{item.text}</li>
                ))}
            </ul>
        );
    }
}

class MarkdownEditorJSX extends MarkdownEditor {
    render() {
        return (
            <div className="MarkdownEditor">
                <h3>Input</h3>
                <label htmlFor="markdown-content">
                    Enter some Markdown
                </label>
                <textarea
                    id="markdown-content"
                    onChange={this.handleChange}
                    defaultValue={this.state.value}
                />
                <h3>Output</h3>
                <div
                    className="content"
                    dangerouslySetInnerHTML={this.getRawMarkup()}
                />
            </div>
        )
    }

    static renderDOM() {
        ReactDOM.render(
            <MarkdownEditorJSX />,
            document.getElementById('markdown-editor-jsx')
        );
    }
}

const jsxElements = [HelloMessageJSX, TimerJSX, TodoAppJSX, MarkdownEditorJSX];
jsxElements.forEach(elem => elem.renderDOM());
