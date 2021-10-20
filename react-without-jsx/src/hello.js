import React from 'react';

class HelloWithJSX extends React.Component {
    render() {
        return <div>Hello {this.props.toWhat} with JSX</div>;
    }
}

class HelloWithoutJSX extends React.Component {
    render() {
        return React.createElement('div', null, `Hello ${this.props.toWhat} without JSX`);
    }
}

const e = React.createElement;

class Hello2WithoutJSX extends React.Component {
    render() {
        return e('div', null, `Hello ${this.props.toWhat} without JSX v2.0`);
    }
}

export { HelloWithJSX, HelloWithoutJSX, Hello2WithoutJSX };
