'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroButton
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor(props) {
    super(props);

    console.log(this.props)
    // Set initial state here
    this.state = {
      text: "Initializing AR...",
      arCompProps: "",
      buttonStateTag: ''
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  //outside of render method
  _onButtonGaze = () => {
    this.setState({
      buttonStateTag: "onGaze"
    });
    console.log("Button Gazed")
  }

  _onButtonTap = () => {
    this.setState({
      buttonStateTag: "onTap"
    });
    this.props.arSceneNavigator.viroAppProps.arCompProps.onButtonClicked()
  }

  render() {

    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroText text={this.state.text} scale={[2, 2, 2]} position={[0, 0, -3]} style={styles.helloWorldTextStyle} />

        <ViroButton
          source={{ uri: "https://pngimg.com/uploads/buttons/buttons_PNG34.png" }}
          gazeSource={{ uri: "https://pngimg.com/uploads/buttons/buttons_PNG34.png" }}
          tapSource={{ uri: "https://pngimg.com/uploads/buttons/buttons_PNG34.png" }}
          position={[0, -1, -3]}
          height={0.5}
          width={1}
          onTap={this._onButtonTap}
          onClick={this._onButtonTap}
          onGaze={this._onButtonGaze} />
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    console.log(this.props.arSceneNavigator.viroAppProps.arCompProps.number)
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: this.props.arSceneNavigator.viroAppProps.arCompProps.number
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = HelloWorldSceneAR;
