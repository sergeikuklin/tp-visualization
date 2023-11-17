import {
  Dialog,
  Slide,
  Button,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { forwardRef, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc)

const Transition = forwardRef(function Transition(
  props,
  ref,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Timestamp({ event, onSave }) {
  const [isActual, setIsActual] = useState(false);
  const [date, setDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    console.log(date)
    onSave({
      type: isActual ? 'actual' : 'estimated',
      date: date.utc().format(),
    })

    setIsOpen(false)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{event.code}</div>
      {event.date && (
        <Typography variant="secondary">
          {Intl.DateTimeFormat().format(new Date(event.date))}
        </Typography>
      )}
  
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Add new timestamp"}</DialogTitle>
        <DialogContent>
          <FormGroup>
            <FormControlLabel control={
              <Checkbox defaultChecked onChange={(newValue) => setIsActual(newValue)}/>
            } label="Actual" />
          </FormGroup>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              value={date}
              label="New Timestamp"
              onChange={(newValue) => setDate(newValue)}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Timestamp;
