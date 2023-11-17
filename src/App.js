import {
  Select,
  MenuItem,
  Typography,
  Container,
  InputLabel,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Grid,
  Tooltip,
  Box,
  TextField,
  Dialog,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import { timelineItemClasses } from '@mui/lab/TimelineItem';
import {
  LocalShipping,
  DirectionsBoat,
  CheckCircleOutline,
  Flag,
  Share,
} from '@mui/icons-material';
import { Fragment, useMemo, useState } from 'react';
import { data as mockData } from './data';
import Timestamp from './Timestamp';
import { cloneDeep, map, update } from 'lodash';

function App() {
  const [data, setData] = useState(mockData);

  const [trackableId, setTrackableId] = useState(
    data.houseCargos[0].trackableId
  );

  const [view, setView] = useState('steps');

  const houseCargoIndex = data.houseCargos.findIndex(
    (houseCargo) => houseCargo.trackableId === trackableId
  );

  const houseCargo = data.houseCargos[houseCargoIndex]

  const handleAddTimestamp = (event, houseCargoIndex, stepIndex, eventIndex) => {
    const oldData = cloneDeep(data)
    const newData = update(
      oldData,
      `houseCargos[${houseCargoIndex}].steps[${stepIndex}].events[${eventIndex}]`,
      (oldEvent) => {
        console.log('event', oldEvent)
        return {...oldEvent, type: event.type, date: event.date}
      }
    )
    console.log('newData', newData)
    setData(newData)
  }

  const renderView = () => {
    if (view === 'steps') {
      return houseCargo.steps.map((step, stepIndex) => {
        const sharedWithHC = data.houseCargos
          .filter((hc) => {
            if (hc.trackableId === trackableId) return false;
            return hc.steps.some((s) => s.stepId === step.stepId);
          })
          .map((hc) => hc.trackableId);

        return (
          <Fragment key={step.stepId}>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary" variant="outlined">
                  <Tooltip title={`${step.type} - ${step.equipment}`}>
                    {step.type === 'truck' ? (
                      <LocalShipping />
                    ) : (
                      <DirectionsBoat />
                    )}
                  </Tooltip>
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Box py={1} display="flex" alignItems="center" spacing={2}>
                  <Box mr={2}>
                    <Typography fontWeight="bold" color="orange">
                      {step.partnerBooking.partnerName}
                    </Typography>
                  </Box>
                  {sharedWithHC.length > 0 ? (
                    <Tooltip title={`Shared with ${sharedWithHC.join(', ')}`}>
                      <Share />
                    </Tooltip>
                  ) : null}
                </Box>
              </TimelineContent>
            </TimelineItem>

            {step.events.map((event, eventIndex) => (
              <TimelineItem key={event.code}>
                <TimelineSeparator>
                  <div style={{ width: '36px' }}>
                    <div style={{ width: '15px', margin: '0 auto' }}>
                      <TimelineDot />
                    </div>
                  </div>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                <Timestamp event={event} onSave={(newEvent) => handleAddTimestamp(newEvent, houseCargoIndex, stepIndex, eventIndex)}/>
                  {/* <div>{event.code}</div>
                  {event.date && (
                    <Typography variant="secondary">
                      {Intl.DateTimeFormat('en-GB', {
                        dateStyle: 'medium',
                        timeStyle: 'medium',
                        timeZone: 'CET',
                      }).format(new Date(event.date))}
                    </Typography>
                  )} */}
                </TimelineContent>
              </TimelineItem>
            ))}
          </Fragment>
        );
      });
    }

    return data.milestones.map((milestone, index) => {
      return (
        <Fragment key={index}>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined">
                <Flag />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="bold" color="green">{milestone.name}</Typography>
            </TimelineContent>
          </TimelineItem>

          {milestone.events.map((mEvent) => {
            const step = houseCargo.steps.find(
              (step) => step.stepId === mEvent.stepId
            );

            if (!step) return null;

            // const event = step.events.find(
            //   (event) => event.code === mEvent.eventCode
            // );

            const eventIndex = step.events.findIndex(
              (event) => event.code === mEvent.eventCode
            );

            const event = step.events[eventIndex]

            return (
              <TimelineItem key={event.code}>
                <TimelineSeparator>
                  <div style={{ width: '36px' }}>
                    <div style={{ width: '15px', margin: '0 auto' }}>
                      <TimelineDot />
                    </div>
                  </div>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Grid container>
                    <Grid xs={4}>
                      <div>{event.code}</div>
                      {event.date && (
                        <Typography variant="secondary">
                          {Intl.DateTimeFormat().format(new Date(event.date))}
                        </Typography>
                      )}
                    </Grid>
                    <Grid xs={8}>
                      <TextField size="small"/>
                    </Grid>
                  </Grid>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Fragment>
      );
    });
  };

  return (
    <Container maxWidth="sm">
      <Typography fontWeight={700} variant="h5" py={2}>
        Shipment {data.shipmentId} - {data.customer}
      </Typography>

      <Grid container spacing={4}>
        <Grid item>
          <InputLabel>House Cargo</InputLabel>
          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <Select
              value={trackableId}
              label="House Cargo"
              onChange={(event) => setTrackableId(event.target.value)}
            >
              {data.houseCargos.map((hc) => (
                <MenuItem key={hc.trackableId} value={hc.trackableId}>
                  {hc.trackableId}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl>
            <FormLabel>View</FormLabel>
            <RadioGroup
              row
              name="view"
              value={view}
              onChange={(event) => setView(event.target.value)}
            >
              <FormControlLabel
                value="steps"
                control={<Radio />}
                label="Steps"
              />
              <FormControlLabel
                value="milestones"
                control={<Radio />}
                label="Milestones"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {renderView()}

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary" variant="outlined">
              <CheckCircleOutline />
            </TimelineDot>
          </TimelineSeparator>
        </TimelineItem>
      </Timeline>

      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>

    </Container>
  );
}

export default App;
