import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

class Square extends React.Component {
    render() {
        return (
            <button className="square">
                {this.props.value}
            </button>
        )
    }
}

class Board extends React.Component {
    constructor() {
        super();
        this.state = {
            numbers: this.randomNumber(25)
        }
    }

    renderSquare(i) {
        return <Square value={i} />
    }

    randomNumber(n) {
        const numpool = Array(n).fill(null).map((_, index) => index + 1)
        console.log(numpool)
        return Array(n).fill(null).map(_ => {
            // console.log(numpool.length)
            // console.log(numpool.splice(getRandomInt(numpool.length), 1))
            return numpool.splice(getRandomInt(numpool.length), 1).pop()
        })
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
                    console.log(subNum, numbers)
                    return (
                        <div className="row">
                            {subNum.map(_ => this.renderSquare(_))}
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