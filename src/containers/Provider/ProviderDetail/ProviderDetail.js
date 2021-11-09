import React, { Component } from "react";
import { connect } from "react-redux";
import ProviderDetailPage from "../../../components/Provider/ProviderDetails/ProviderDetailPage";
import MainLayout from "../../../components/MainLayout";
import * as actions from "../../../store/actions/provider";
import LoadingPage from "../../../utilities/loading-page";

class ProviderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      providerId: this.props.match.params.providerId,
      isProviderFetched: false,
    };
  }

  componentDidMount() {
    const { providerId } = this.state;
    this.props.getProviderDetails(providerId);
  }

  render() {
    console.log("==================== ", this.props.providerDetails);
    return (
      <MainLayout>
        {this.props.providerDetails ? (
          <ProviderDetailPage providerDetails={this.props.providerDetails} />
        ) : (
          <LoadingPage />
        )}
      </MainLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    providerDetails: state.provider.providerDetails,
    loading: state.loader.loading,
  };
};

const mapDispatchtoProp = (dispatch) => {
  return {
    getProviderDetails: (id) => dispatch(actions.getProviderDetails(id)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProp)(ProviderDetail);
