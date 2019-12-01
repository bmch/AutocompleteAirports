import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DestAirportAutocomplete from './DestAirportAutocomplete';
import './App.css';

export default function UserInput2() {
  // The first commit of Material-UI

  const initialState = {
    goDate: new Date(),
    backDate: new Date(),
    departure: null,
    destination1: null,
    destination2: null
  };

  const [formData, setFormData] = React.useState(initialState);

  const handleChange = (name, date) => {
    console.log('the date being changed', date);
    console.log('the name of the value to change', name);
    setFormData({
      ...formData,
      [name]: date
    });
  };

  const storeDestination = (name, data) => {
    console.log('name', name);
    console.log('data', data);

    setFormData({
      ...formData,
      [name]: data
    });
    console.log('state in parent', this.state);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="suggest">
        <DestAirportAutocomplete
          label="From"
          name="departure"
          storeDestination={handleChange}
        />

        <br></br>
        <DestAirportAutocomplete
          label="To"
          name="destination1"
          storeDestination={handleChange}
        />

        <br></br>
        <DestAirportAutocomplete
          label="Option"
          name="destination2"
          storeDestination={handleChange}
        />
        <KeyboardDatePicker
          variant="outlined"
          margin="normal"
          id="date-picker-dialog"
          label="Depart"
          format="MM/dd/yyyy"
          onChange={date => handleChange('goDate', date)}
          inputVariant="outlined"
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
          name="goData"
          value={formData.goDate}
        />
        <br></br>
        <br></br>
        {JSON.stringify(formData.goDate)}
        <br></br>
        <br></br>
        <KeyboardDatePicker
          variant="outlined"
          margin="normal"
          id="date-picker-dialog"
          label="Return"
          format="MM/dd/yyyy"
          onChange={date => handleChange('backDate', date)}
          inputVariant="outlined"
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
          name="backDate"
          value={formData.backDate}
        />
        <br></br>
        <br></br>
        {JSON.stringify(formData.backDate)}
        <br></br>
        <br></br>
      </div>
    </MuiPickersUtilsProvider>
  );
}
