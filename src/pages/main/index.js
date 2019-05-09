import React, { Component, Fragment } from "react";
import MapGL, { Marker } from "react-map-gl";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as ProgrammerActions } from "../../store/ducks/programmers";
import CustomModal from "../../components/modal/index";
import MenuList from "../../components/menulist/index";
import { ContainerMap, BehindContainer } from "./styles";
class Main extends Component {
  state = {
    newEntryInput: {
      username: "",
      latitude: 0,
      longitude: 0
    },
    modalIsOpen: false,
    viewport: {
      width: 400,
      height: 400,
      latitude: -23.5439948,
      longitude: -46.6076,
      zoom: 8
    }
    //programmers: []
  };

  componentDidMount() {
    window.addEventListener("resize", this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._resize);
  }

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: window.innerWidth,
        height: window.innerHeight
      }
    });
  };

  handleMapClick = e => {
    console.log(e);
    this.setState({ modalIsOpen: true });

    this.setState({
      newEntryInput: {
        latitude: e.lngLat[1],
        longitude: e.lngLat[0]
      }
    });
  };

  //Modal
  openModal = () => {
    this.setState({ modalIsOpen: true });
  };
  closeModal = () => {
    this.props.addProgrammerRequest(this.state.newEntryInput);
    debugger;
    this.setState({ modalIsOpen: false });
  };

  getTypedUsername = e => {
    this.setState({
      ...this.state,
      newEntryInput: {
        username: e.target.value,
        latitude: this.state.newEntryInput.latitude,
        longitude: this.state.newEntryInput.longitude
      }
    });

    console.log(this.state.newEntryInput);
  };

  removeProgrammer = programmer => {
    console.log(this.props.programmers);
  };

  render() {
    return (
      <Fragment>
        <div className="App">
          <CustomModal
            greeting={"testando"}
            openModal={this.openModal}
            modalIsOpen={this.state.modalIsOpen}
            closeModal={this.closeModal}
            usernameInput={this.state.usernameInput}
            getTypedUsername={this.getTypedUsername}
          />

          <MenuList
            programmers={this.props.programmers.data}
            removeProgrammer={this.removeProgrammer}
          />
          <BehindContainer>
            <ContainerMap>
              <MapGL
                {...this.state.viewport}
                onClick={this.handleMapClick}
                mapStyle="mapbox://styles/mapbox/basic-v9"
                mapboxApiAccessToken={
                  "pk.eyJ1IjoiZGllZ28zZyIsImEiOiJjamh0aHc4em0wZHdvM2tyc3hqbzNvanhrIn0.3HWnXHy_RCi35opzKo8sHQ"
                }
                onViewportChange={viewport => this.setState({ viewport })}
              >
                {this.props.programmers.data.map(programmer => (
                  <Marker
                    key={programmer.id}
                    latitude={programmer.latitude}
                    longitude={programmer.longitude}
                    onClick={this.handleMapClick}
                    captureClick={true}
                  >
                    <img
                      style={{
                        borderRadius: 100,
                        width: 48,
                        height: 48
                      }}
                      src={programmer.avatar}
                    />
                  </Marker>
                ))}
              </MapGL>
            </ContainerMap>
          </BehindContainer>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  programmers: state.programmers
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ProgrammerActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
