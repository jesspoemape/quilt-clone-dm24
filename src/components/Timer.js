import React, { Component } from 'react';
import {connect} from 'react-redux';


class Timer extends Component {
    constructor() {
        super();
        this.state = {
            elapsed: 0
        }
        this.tick = this.tick.bind(this);
    }


componentDidMount() {
    this.timer = setInterval(this.tick, 100);
}
tick() {
    this.setState({elapsed: new Date() - this.props.startTime})
}
componentWillUnmount() {
    clearInterval(this.timer);
}

    render() {
        let seconds = 0;
        if (this.props.startTimer) {
            let elapsed = Math.round(this.state.elapsed / 100);
            seconds = (elapsed / 10).toFixed(1);
        }
        
        // console.log(seconds);

        return (
            <div className='match-timer-container'>
                <h6 className='match-timer-title'>TIME</h6>
                <h2 className='match-timer-time'>{seconds || 0.0}</h2>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        startTimer: state.startTimer,
        startTime: state.startTime
    }
}

export default connect(mapStateToProps)(Timer);

// clicking a button on the match component will trigger the reducer to change the start timer to true (default is false)
// if this.props.time on the timer component registers that it is true, it will start the setInterval function to start incrementing time
// the component will be rendered in the match component so the time will be changing here, and displaying there