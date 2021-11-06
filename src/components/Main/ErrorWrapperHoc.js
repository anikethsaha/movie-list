import React from "react";

/**
 * HOC to handle the errors being thrown at the component
 * @param {React.Component} Component
 */
export default function ErrorWrapper(Component) {
  return class ErrorWrapperComponent extends React.Component {
    componentDidCatch(err) {
      console.log("ErrorWrapperComponent", err);
    }
    render() {
      return <Component />;
    }
  };
}
