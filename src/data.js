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
            partnerName: 'STAR TRUCK',
          },
          events: [
            {
              code: 'CGI',
              type: 'actual',
              date: '2023-11-14T18:25:43.511Z',
              milestone: 'POL',
              history: [
                {
                  type: 'estimated',
                  date: '2023-11-13T10:00:00.000Z',
                },
              ],
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
              code: 'ETD',
              type: 'estimated',
              date: '2023-11-17T18:25:43.511Z',
              milestone: 'POL',
            },
            {
              code: 'ETA',
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
            partnerName: 'TRUCK AND TRACE',
          },
          events: [
            {
              code: 'CGO',
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
              code: 'CGI',
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
              code: 'ETD',
              type: 'estimated',
              date: '2023-11-17T18:25:43.511Z',
              milestone: 'POL',
            },
            {
              code: 'ETA',
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
              code: 'CGO',
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
          eventCode: 'CGI',
        },
        {
          stepId: '4',
          eventCode: 'CGI',
        },
        {
          stepId: '2',
          eventCode: 'ETD',
        },
      ],
    },
    {
      name: 'POD',
      events: [
        {
          stepId: '2',
          eventCode: 'ETA',
        },
        {
          stepId: '3',
          eventCode: 'CGO',
        },
        {
          stepId: '5',
          eventCode: 'CGO',
        },
      ],
    },
  ],
};
