import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default ProtectedRoute;