import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import useStore from "../helpers/store";

const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => {

  const { usuario } = useStore();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthProtected && !usuario) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }
  
        return (
          <Layout>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  )
}

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
};

export default Authmiddleware;
