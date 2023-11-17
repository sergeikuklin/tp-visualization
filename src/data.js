export const data = {
  customer: 'Disney',
  shipmentId: 'S123',
  houseCargos: [
    {
      trackableId: '12345',
      steps: [
        {
          stepId: '1',
          type: 'truck',
          partnerBooking: {
            partnerName: 'some trucker',
          },
          events: [
            {
              code: 'gateIn',
              type: 'actual',
              date: '2023-11-14T18:25:43.511Z',
              milestone: 'POL',
            },
          ],
          equipment: 'container 1',
        },
        {
          stepId: '2',
          type: 'vessel',
          partnerBooking: {
            partnerName: 'HapagLloyd',
          },
          events: [
            {
              code: 'vesselDeparture',
              type: 'estimated',
              date: '2023-11-17T18:25:43.511Z',
              milestone: 'POL',
            },
            {
              code: 'vesselArrival',
              type: 'estimated',
              date: '2023-11-27T18:25:43.511Z',
              milestone: 'POD',
            },
          ],
          equipment: 'container 1',
        },
        {
          stepId: '3',
          type: 'truck',
          partnerBooking: {
            partnerName: 'other trucker',
          },
          events: [
            {
              code: 'gateOut',
              type: 'unknown',
              date: null,
              milestone: 'POD',
            },
          ],
          equipment: 'container 1',
        },
      ],
    },
    {
      trackableId: '34567',
      steps: [
        {
          stepId: '4',
          type: 'truck',
          partnerBooking: {
            partnerName: 'the trucker',
          },
          events: [
            {
              code: 'gateIn',
              type: 'actual',
              date: '2023-11-12T18:25:43.511Z',
              milestone: 'POL',
            },
          ],
          equipment: 'container 2',
        },
        {
          stepId: '2',
          type: 'vessel',
          partnerBooking: {
            partnerName: 'HapagLloyd',
          },
          events: [
            {
              code: 'vesselDeparture',
              type: 'estimated',
              date: '2023-11-17T18:25:43.511Z',
              milestone: 'POL',
            },
            {
              code: 'vesselArrival',
              type: 'estimated',
              date: '2023-11-27T18:25:43.511Z',
              milestone: 'POD',
            },
          ],
          equipment: 'container 2',
        },
        {
          stepId: '5',
          type: 'barge',
          partnerBooking: {
            partnerName: 'captain Jack Sparrow',
          },
          events: [
            {
              code: 'gateOut',
              type: 'unknown',
              date: null,
              milestone: 'POD',
            },
          ],
          equipment: 'container 2',
        },
      ],
    },
  ],
  milestones: [
    {
      name: 'POL',
      events: [
        {
          stepId: '1',
          eventCode: 'gateIn',
        },
        {
          stepId: '4',
          eventCode: 'gateIn',
        },
        {
          stepId: '2',
          eventCode: 'vesselDeparture',
        },
      ],
    },
    {
      name: 'POD',
      events: [
        {
          stepId: '2',
          eventCode: 'vesselArrival',
        },
        {
          stepId: '3',
          eventCode: 'gateOut',
        },
        {
          stepId: '5',
          eventCode: 'gateOut',
        },
      ],
    },
  ],
};
