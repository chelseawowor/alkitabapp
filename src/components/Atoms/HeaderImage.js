import {StyleSheet, View, Image} from 'react-native';
import React, {Component} from 'react';
import {SliderBox} from 'react-native-image-slider-box';

export default class HeaderImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        require('../../assets/icons/ga.png'),
        require('../../assets/icons/1.png'),
        require('../../assets/icons/2.png'),
        require('../../assets/icons/3.png'),
        require('../../assets/icons/4.png'),
      ],
    };
  }
  render() {
    return (
      <View style={styles.container} onLayout={this.onLayout}>
        <SliderBox
          images={this.state.images}
          sliderBoxHeight={120}
          onCurrentImagePressed={index =>
            console.warn(`image ${index} pressed`)
          }
          autoplay
          circleLoop
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gambar: {
    width: 450,
    height: 60,
    alignItems: 'stretch',
  },
});
