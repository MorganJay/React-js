import React from 'react';
import './App.css';
import logo from './logo.svg';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meaningOfLife: 47 + this.props.increment,
      text: '',
    };
    this.props = props;
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', nextState);
    return nextState.text === this.state.text;
  }

  handleClick = () => {
    this.setState(
      (previousState, previousProps) => ({
        meaningOfLife: previousState.meaningOfLife + previousProps.increment,
      }),
      () => console.log(this.state.meaningOfLife)
    );
    //console.log(this.state.meaningOfLife);
  };

  render() {
    const { meaningOfLife } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="logo" className="App-logo" />
          <p>{meaningOfLife}</p>
          <button onClick={this.handleClick}>Update State</button>
          <button
            onClick={() =>
              this.setState(state => ({ text: state.text + '_hello' }))
            }
          >
            Update Text
          </button>
          <p>{this.state.text}</p>
        </header>
      </div>
    );
  }
}

export default App;
