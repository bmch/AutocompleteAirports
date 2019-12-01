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
    destination2: null,
    destination3: null,
    destination4: null,
    destination5: null,
    destination6: null,
    destination7: null,
    destination8: null
  };

  const initDest = [2];

  const [formData, setFormData] = React.useState(initialState);
  const [destInputs, setDestInputs] = React.useState(initDest);

  const handleChange = (name, date) => {
    console.log('the date being changed', date);
    console.log('the name of the value to change', name);
    setFormData({
      ...formData,
      [name]: date
    });
  };

  const appendInput = () => {
    setDestInputs(prevState => {
      return prevState.concat(initDest[initDest.length - 1] + 1);
    });
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
        {destInputs.map((num, index) => (
          <div>
            <br></br>
            <DestAirportAutocomplete
              label="Option"
              name={`destination${num}`}
              storeDestination={handleChange}
            />
          </div>
        ))}

        <button onClick={() => appendInput()}>CLICK ME TO ADD AN INPUT</button>
        <br></br>
        <br></br>
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
