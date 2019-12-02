import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DestAirportAutocomplete from './DestAirportAutocomplete';
import AddIcon from '@material-ui/icons/Add';
import './App.css';
import Fab from '@material-ui/core/Fab';

export default function UserInput2() {
  // The first commit of Material-UI

  const initialState = {
    goDate: new Date(),
    backDate: new Date(),
    departure: null
  };

  const initDest = [];

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
      return prevState.concat(prevState.length + 1);
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
          <div key={index}>
            <br></br>
            <DestAirportAutocomplete
              label={`Destination Option ${num}`}
              name={`destination${num}`}
              storeDestination={handleChange}
            />
          </div>
        ))}
        <span>Add another destination</span>
        <Fab color="primary" aria-label="add">
          <AddIcon onClick={() => appendInput()} />
        </Fab>
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
