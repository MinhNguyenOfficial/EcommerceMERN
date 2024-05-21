import Header from '../Header/Header';
import PropTypes from 'prop-types';

export default function Default({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}


Default.propTypes = {
    children: PropTypes.node.isRequired,
  };