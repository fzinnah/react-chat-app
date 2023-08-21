const chatMockData = [
    {
        user1_id: 1, // Assuming a user with ID 1 exists
        user2_id: 2, // Assuming a user with ID 2 exists
        last_message_timestamp: new Date('2023-08-15T15:15:00Z'),
    },
    {
        user1_id: 2,
        user2_id: 3, // Assuming a user with ID 3 exists
        last_message_timestamp: new Date('2023-08-14T10:30:00Z'),
    },
    {
        user1_id: 1,
        user2_id: 3,
        last_message_timestamp: new Date('2023-08-14T20:45:00Z'),
    },
    {
        user1_id: 4, // Assuming a user with ID 4 exists
        user2_id: 5, // Assuming a user with ID 5 exists
        last_message_timestamp: new Date('2023-08-12T09:05:00Z'),
    },
    {
        user1_id: 4,
        user2_id: 3,
        last_message_timestamp: new Date('2023-08-13T11:20:00Z'),
    },
];

module.exports = chatMockData;
