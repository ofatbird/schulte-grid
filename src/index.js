import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

class Square extends React.Component {

    render() {
        return (
            <button className="square" onClick={() => {this.props.buttonClicked(this.props.value)}}>
                {this.props.value}
            </button>
        )
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            numbers: this.randomNumber(36)
        }
    }

    handleChildClick(i) {
        if (this.state.current + 1 === i) {
            this.setState({ current: i})
        } else {
            alert(`Current value is ${this.state.current}`)
        }
    }

    renderSquare(i) {
        return <Square value={i} buttonClicked={this.handleChildClick}/>
    }

    randomNumber(n) {
        const numpool = Array(n).fill(null).map((_, index) => index + 1)
        return Array(n).fill(null).map(_ => numpool.splice(getRandomInt(numpool.length), 1).pop())
    }

    render() {
        const { numbers } = this.state
        console.log(numbers)
        const base = Math.sqrt(numbers.length)
        const maps = Array(base).fill(null)
        return (
            <div className="board">
                {maps.map((_, index) => {
                    const subNum = numbers.slice(index * base, (index + 1) * base)
                    return (
                        <div className="row">
                            {subNum.map(num => this.renderSquare(num))}
                        </div>
                    )
                })}
            </div>
        )
    }
}

ReactDOM.render(
    <Board />,
    document.getElementById('root')
)