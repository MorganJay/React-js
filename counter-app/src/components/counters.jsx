import React from "react";
import Counter from "./counter";

const Counters = ({ onReset, counters, onDelete, onIncrement }) => {
  console.log("Counters rendered");
  return (
    <div>
      <button onClick={onReset} className="btn btn-primary btn-sm m-2">
        Reset
      </button>
      {counters.map((counter) => (
        <Counter
          key={counter.id}
          onIncrement={onIncrement}
          onDelete={onDelete}
          counter={counter}
        />
      ))}
    </div>
  );
};
// export default Counters;

// class Counters extends Component {
//   render() {}
// }

export default Counters;

// Mount phase lifecycle hooks(constructor, render, componentDidMount), Update(render, componentDidUpdate) Unmount(componentWillUnmount)
