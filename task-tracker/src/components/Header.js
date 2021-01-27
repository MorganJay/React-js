import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Button from './Button';
require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);

const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation();

  return (
    <header className="header">
      <h1>{title}</h1>
      {/* {location.pathname === '/' && ( */}
      <Button
        color={showAdd ? 'red' : 'green'}
        text={showAdd ? 'Close' : 'Add'}
        onClick={onAdd}
      />
      {/* // )} */}
    </header>
  );
};

Header.defaultProps = {
  title: 'Task Tracker'
};

Header.propTypes = {
  title: PropTypes.string.isRequired
};

//CSS in JS
// const headingStyle = {
//   color: 'red',
// };
export default Header;
