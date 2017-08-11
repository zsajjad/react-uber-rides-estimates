import React from "react";
import PropTypes from "prop-types";
import * as Controller from "./react-native-uber-rides-estimates-controller.js";

class RNUberRides extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      products: null,
      estimates: null,
      error: false
    };
  }

  getTimeEstimate = params => {
    if (this.state.loading) {
      return;
    }
    this.setState({ loading: true });
    Controller.getTimeEstimates(params)
      .then(timeEstimate => {
        if (timeEstimate.times) {
          this.setState({
            timeEstimate: Controller.getLinks(params, timeEstimate.times),
            loading: false
          });
          return;
        }
        this.setState({
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          errorMsg: err ? err.message : "Something went wrong",
          error: true,
          loading: false
        });
      });
  };

  getPriceEstimate = params => {
    if (this.state.loading) {
      return;
    }
    this.setState({ loading: true });
    Controller.getPriceEstimate(params)
      .then(priceEstimate => {
        if (priceEstimate.prices) {
          this.setState({
            priceEstimate: Controller.getLinks(params, priceEstimate.prices),
            loading: false
          });
          return;
        }
        this.setState({
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          errorMsg: err ? err.message : "Something went wrong",
          error: true,
          loading: false
        });
      });
  };

  render() {
    return this.props.children({
      ...this.state,
      getTimeEstimate: params =>
        this.getTimeEstimate({
          ...params,
          serverToken: this.props.serverToken,
          clientId: this.props.clientId,
          language: this.props.language
        }),
      getPriceEstimate: params =>
        this.getPriceEstimate({
          ...params,
          serverToken: this.props.serverToken,
          clientId: this.props.clientId,
          language: this.props.language
        })
    });
  }
}

RNUberRides.propTypes = {
  clientId: PropTypes.string.isRequired,
  serverToken: PropTypes.string.isRequired,
  language: PropTypes.string
};

RNUberRides.defaultProps = {
  language: "en_US"
};

export default RNUberRides;
