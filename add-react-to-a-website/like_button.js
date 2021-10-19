'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }

    render() {
        if (this.state.liked) {
            return this.props.commentID === undefined ?
                "You liked this." : "You liked comment number " + this.props.commentID;
        }

        return e(
            'button',
            { onClick: () => this.setState({ liked: true }) },
            'Like'
        );
    }
}

// ... the starter code you pasted ...

// Find all DOM containers, and render Like buttons into them.
document.querySelectorAll('.like_button_container')
.forEach(domContainer => {
    // Read the comment ID for a data-* attribute
    const commentID = parseInt(domContainer.dataset.commentid, 10);
    ReactDOM.render(
        e(LikeButton, { commentID: commentID }),
        domContainer
        );
    });

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);
