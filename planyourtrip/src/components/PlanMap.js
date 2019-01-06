import React from 'react'
import {MyMapComponent} from './MyMapComponent';

export class PlanMap extends React.PureComponent {

  state = {
    isMarkerShown: false,
    lat: undefined,
    lng: undefined,
  }

  componentDidMount() {
    this.setState({lat: this.props.lat, lng: this.props.lng},
      ()=>{console.log(this.state)});
    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 1000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    return (
      <MyMapComponent
        lat={this.state.lat}
        lng={this.state.lng}
        googleMapURL={this.props.googleMapURL}
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    )
  }
}

