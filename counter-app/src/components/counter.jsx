import React, { Component } from "react";

class Counter extends Component {
  // UPdating phase
  componentDidUpdate(previousProps, previousState) {
    // console.log("Props", previousProps);
    // console.log("State", previousState);
    if (previousProps.counter.value !== this.props.counter.value) {
      //Ajax call and get new data from the server
    }
  }

  componentWillUnmount(){
    console.log("Counter - Unmount");
    // Clean up listeners or timers, etc otherwise you'd end up with memory leaks
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  render() {
    console.log("Counter Rendered");
    return (
      <div>
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button
          onClick={() => this.props.onIncrement(this.props.counter)}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
        <button
          onClick={() => this.props.onDelete(this.props.counter.id)}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>
      </div>
      // state = {
      //   value: this.props.counter.value
      //   //tags: ["hello", "world"],
      //   // imageUrl: "https;//picsum.photos/200"
      // };

      // constructor(){
      //   super();
      //   this.handleIncrement = this.handleIncrement.bind(this);
      //   binding event handler to "this"
      // }

      // renderTags() {
      //   if (this.state.tags.length === 0) return <p>There are no tags!</p>;
      // {this.state.tags.length === 0 && "Please create a new tag!"} {/* truthy on the left returns the right side then the opposite for falsy*/}
      // {this.renderTags()}
      //   return (
      //     <ul>
      //       {this.state.tags.map((tag) => (
      //         <li key={tag}>{tag}</li>
      //       ))}
      //     </ul>
      //   );
      // }
    );
  }
}

export default Counter;
