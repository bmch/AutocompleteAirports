import React from 'react';
import MUIPlacesAutocomplete, {
  geocodeBySuggestion
} from 'mui-places-autocomplete';

class DestAirportAutocomplete extends React.Component {
  constructor() {
    super();
    this.state = {
      coordinates: null,
      errorMessage: null,
      googleData: null,
      airportName: '',
      iata: ''
    };

    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
  }

  onSuggestionSelected(googleData) {
    // functions to get the latitude and longitude for the selected suggestion.

    console.log('googles suggestion -', googleData);
    geocodeBySuggestion(googleData).then(results => {
      console.log(results);
      if (results.length < 1) {
        this.setState({
          errorMessage:
            'Geocode request completed successfully but without any results'
        });
        return;
      }

      // Just use the first result in the list to get the geometry coordinates
      const { geometry } = results[0];
      const coordinates = {
        lat: geometry.location.lat().toFixed(7),
        lng: geometry.location.lng().toFixed(7)
      };
      console.log('coordinates ', coordinates);

      fetch(
        `https://api.aerisapi.com/places/airports/closest/?p={${coordinates.lat},${coordinates.lng}}&limit=1&radius=120miles&filter=largeairport&client_id=&client_secret=`
      )
        .then(res => res.json())
        // if successful response with data
        .then(res => {
          console.log('airport res', res);
          if (res.response[0]) {
            this.setState({
              iata: res.response[0].profile.iata,
              googleData: googleData,
              airportData: res,
              coordinates: coordinates,
              airportName: res.response[0].place.name,
              errorMessage: null
            });
            this.props.storeDestination(this.props.name, {
              iata: res.response[0].profile.iata.toUpperCase(),
              googleData: googleData,
              airportData: res,
              coordinates: coordinates,
              airportName: res.response[0].place.name
            });
          } else {
            console.log('name not received');
            this.setState({
              airportName: '',
              iata: '',
              errorMessage: 'Geocode request completed but w/o nearby airport'
            });
          }
        })
        .catch(err => console.log(err));
    });
  }

  render() {
    return (
      <div>
        <MUIPlacesAutocomplete
          onSuggestionSelected={this.onSuggestionSelected}
          textFieldProps={{
            label: this.props.label,
            variant: 'outlined',
            style: {
              width: 350,
              backgroundColor: 'white'
            },
            className: 'classes.textField'
          }}
          renderTarget={() => <div />}
        />
        <div>
          <br></br>
          {this.state.airportName && this.state.airportName + ', '}
          {this.state.iata && 'IATA code: ' + this.state.iata.toUpperCase()}
          {this.state.errorMessage && 'Please try again '}
        </div>
      </div>
    );
  }
}

DestAirportAutocomplete.description =
  'Geocoding (i.e. latitude/longitude) a selected suggestion';

export default DestAirportAutocomplete;
