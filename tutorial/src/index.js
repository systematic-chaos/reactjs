import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="square"
                onClick={props.onClick}
                style={props.highlight ? { background: "#ffff00" } : {}}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i, winnerSquare) {
        return (
            <Square key={i}
                    value={this.props.squares[i]}
                    highlight={winnerSquare}
                    onClick={() => this.props.onClick(i)} />
        );
    }

    // 3. Rewrite Board to use two loops to make the squares instead of hardcoding them.
    render() {
        var boardRows = [];
        var currentSquare = 0;
        const dim = Math.sqrt(this.props.squares.length);

        for (let i = 0; i < dim; i++) {
            let boardSquares = [];
            for (let j = 0; j < dim; j++) {
                boardSquares.push(this.renderSquare(currentSquare,
                    this.props.winnerLine.includes(currentSquare)));
                currentSquare++;
            }
            boardRows.push((<div className="board-row" key={i}>{boardSquares}</div>));
        }
        return (<div>{boardRows}</div>);
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(this.props.boardSize * this.props.boardSize).fill(null),
            history: [-1],  // first negative move means game start (empty board)
            stepNumber: 0,
            nextPlayer: 0,
            movesReversed: false
        };
    }

    handleClick(i) {
        if (this.state.squares[i] || this.state.winner) {
            return;
        }

        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const currentSquares = this.state.squares.slice();
        currentSquares[i] = PLAYERS[this.state.nextPlayer];

        this.setState({
            squares: currentSquares,
            history: history.concat(i),
            stepNumber: history.length,
            nextPlayer: (this.state.nextPlayer + 1) % this.props.numPlayers,
            winner: calculateWinner(currentSquares)
        });
    }

    jumpTo(step) {
        let currentSquares = buildBoardSquares(
            this.props.boardSize, this.props.numPlayers,
            this.state.history.slice(0, step + 1));
        this.setState({
            squares: currentSquares,
            stepNumber: step,
            nextPlayer: step % this.props.numPlayers,
            winner: calculateWinner(currentSquares)
        });
    }

    // 4. Add a toggle button that lets you sort the moves in either ascending or descending order.
    toggleMoveHistory = () => {
        this.setState({
            movesReversed: !this.state.movesReversed
        });
    }

    render() {
        const history = this.state.history;
        const currentSquares = this.state.squares;

        // 1. Display the location for each move in the format (col, row) in the move history list.
        // 2. Bold the currently selected item in the move list.
        const moves = history.map((step, move) => {
            let desc = move ?
                `Go to move #${move} `
                    + `(${PLAYERS[(move - 1) % this.props.numPlayers]}: `
                    + `${Math.trunc(step / 3) + 1}, ${step % 3 + 1})` :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>
                        {this.state.stepNumber === move ? <b>{desc}</b> : desc}
                    </button>
                </li>
            );
        });
        if (this.state.movesReversed) {
            moves.reverse();
        }

        // 6. When no one wins, display a message about the result being a draw.
        var status;
        const winner = this.state.winner;
        if (winner) {
            status = 'Winner: ' + winner[0];
        } else if (winner === false) {
            status = 'Game results in a draw!';
        } else {
            status = 'Next player: ' + PLAYERS[this.state.nextPlayer];
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={currentSquares}
                        winnerLine={winner ? winner[1] : []}
                        onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div className="status">{status}</div>
                    <ol>{moves}</ol>
                    <button onClick={this.toggleMoveHistory}>Toggle movement history</button>
                </div>
            </div>
        );
    }
}

// ========================================================

const PLAYERS = ['X', 'O'];
const BOARD_SIZE = 3;
const WINNER_LINES = { [BOARD_SIZE]: computeWinnerLines(BOARD_SIZE) };

function computeWinnerLines(dim) {
    const lines = [];
    const diag1 = [];
    const diag2 = [];
    for (let i = 0; i < dim; i++) {
        let row = [];
        let col = [];
        for (let j = 0; j < dim; j++) {
            row.push(i * dim + j);
            col.push(i + j * dim);
        }
        lines.push(row, col);
        diag1.push((dim + 1) * i);
        diag2.push((dim - 1) * (i + 1));
    }
    lines.push(diag1, diag2);

    return lines;
}

function calculateWinner(squares) {
    const dim = Math.sqrt(squares.length);
    const lines = WINNER_LINES[dim];
    for (let line of lines) {
        let winner = squares[line[0]];
        for (let i = 1; i < dim && winner; i++) {
            if (winner !== squares[line[i]]) {
                winner = false;
            }
        }
        // 5. When someone wins, highlight the three squares that caused the win.
        if (winner) {
            return [winner, line];
        }
    }
    
    if (squares.every((s) => !!s)) {
        return false;
    }
    return null;
}

function buildBoardSquares(boardSize, numPlayers, movementHistory) {
    let squares = Array(boardSize * boardSize).fill(null);
    let nextPlayer = 0;
    for (let move of movementHistory) {
        if (move >= 0) {
            squares[move] = PLAYERS[nextPlayer];
            nextPlayer = (nextPlayer + 1) % numPlayers;
        }
    }
    return squares;
}

// ========================================================

ReactDOM.render(
    <Game boardSize={BOARD_SIZE} numPlayers={PLAYERS.length}/>,
    document.getElementById('root')
);
