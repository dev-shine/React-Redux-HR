import React, { Component } from "react";
import CircularProgress from 'material-ui/CircularProgress';

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component: component
      });
    }

    render() {
        const { classes } = this.props;

      const C = this.state.component;

      return C && <C {...this.props} /> 
      ;
    }
  }

  return AsyncComponent;
}