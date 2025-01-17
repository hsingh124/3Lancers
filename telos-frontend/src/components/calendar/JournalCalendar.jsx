import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
  Resources,
  EditRecurrenceMenu,
  AppointmentForm,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';

const calendarData = [
  {
    priorityId: 2,
    typeId: 1,
    title: 'Coffee',
    startDate: new Date('2021-03-21T20:00:00.000Z'),
    endDate: new Date('2021-03-21T20:30:00.000Z'),
  },
  {
    priorityId: 2,
    typeId: 2,
    title: 'SOFTENG 754',
    startDate: new Date('2021-03-21T21:00:00.000Z'),
    endDate: new Date('2021-03-21T23:00:00.000Z'),
  },
  {
    priorityId: 2,
    typeId: 2,
    title: 'SOFTENG 701',
    startDate: new Date('2021-03-21T23:00:00.000Z'),
    endDate: new Date('2021-03-22T01:00:00.000Z'),
  },
  {
    priorityId: 1,
    typeId: 1,
    title: 'Lunch',
    startDate: new Date('2021-03-22T01:00:00.000Z'),
    endDate: new Date('2021-03-22T02:30:00.000Z'),
  },
  {
    priorityId: 1,
    typeId: 2,
    title: '701 Meeting',
    startDate: new Date('2021-03-22T03:30:00.000Z'),
    endDate: new Date('2021-03-22T04:30:00.000Z'),
  },
  {
    priorityId: 1,
    typeId: 2,
    title: '754 Meeting',
    startDate: new Date('2021-03-22T04:30:00.000Z'),
    endDate: new Date('2021-03-22T05:30:00.000Z'),
  },
  {
    priorityId: 2,
    typeId: 2,
    title: 'Work',
    startDate: new Date('2021-03-22T06:00:00.000Z'),
    endDate: new Date('2021-03-22T08:00:00.000Z'),
  },
];

export const priorityData = [
  {
    text: 'Low Priority',
    id: 1,
    color: '#D6ADFF',
  },
  {
    text: 'High Priority',
    id: 2,
    color: '#7A00F4',
  },
];

export const typeData = [
  {
    text: 'Home',
    id: 1,
    color: '#ADADFF',
  },
  {
    text: 'University',
    id: 2,
    color: '#0000de',
  },
];
export default class Calendar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: calendarData,
      resources: [
        {
          fieldName: 'priorityId',
          title: 'Priority',
          instances: priorityData,
          allowMultiple: false,
        },
        {
          fieldName: 'typeId',
          title: 'Type',
          instances: typeData,
          allowMultiple: false,
        },
      ],
    };

    this.commitChanges = this.commitChanges.bind(this);
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const { data, resources } = this.state;

    return (
      <Paper style={{ height: '100%' }}>
        <Scheduler data={data}>
          <ViewState defaultCurrentDate="2021-03-22" />
          <EditingState onCommitChanges={this.commitChanges} />
          <IntegratedEditing />
          <EditRecurrenceMenu />
          <DayView startDayHour={0} endDayHour={24} />
          <Appointments />
          <AppointmentTooltip showOpenButton showDeleteButton showCloseButton />
          <AppointmentForm />
          <Resources data={resources} mainResourceName="priorityId" />
        </Scheduler>
      </Paper>
    );
  }
}
