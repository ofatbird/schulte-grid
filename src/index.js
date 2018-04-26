import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

class Square extends React.Component {

    render() {
        return (
            <button className="square" onClick={this.props.buttonClicked}>
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
            timer: null,
            numbers: this.randomNumber(props.level ** 2)
        }
    }

    handleChildClick(i) {
        if (this.state.current + 1 === i) {
            if (i === this.props.level ** 2) {
                console.log(this.props.counter())
                this.setState({ current: 0 })
                return
            }
            this.setState({ current: i })
        } else {
            alert(`Current value is ${this.state.current}`)
        }
    }

    renderSquare(i) {
        return <Square value={i} buttonClicked={() => this.handleChildClick(i)} />
    }

    randomNumber(n) {
        const numpool = Array(n).fill(null).map((_, index) => index + 1)
        return Array(n).fill(null).map(_ => numpool.splice(getRandomInt(numpool.length), 1).pop())
    }

    render() {
        const { numbers } = this.state
        const base = this.props.level
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

class Game extends React.Component {
    constructor() {
        super()
        this.state = {
            level: 5,
            start: null,
        }
    }

    handleButtonClick = () => {
        this.setState({ start: Date.now() })
    }

    countdown() {
        return Date.now() - this.state.start
    }

    render() {
        return (
            <div>
                <button onClick={this.handleButtonClick}>Click to start</button>
                <Board level={this.state.level} counter={() => { return this.countdown() }} />
            </div>
        )
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
)
