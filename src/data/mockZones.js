export const MOCK_ZONES = [
    {
        id: 'zone_red_1',
        name: "Central Station Area",
        center: { lat: 40.7128, lng: -74.0060 }, // NYC City Hall area
        radius: 300, // meters
        score: 2.0,
        color: '#ef4444', // Red-500
        summary: "Recent reports indicate higher perceived risk at night. Travelers advise staying on main streets."
    },
    {
        id: 'zone_yellow_1',
        name: "Financial District Market",
        center: { lat: 40.7074, lng: -74.0113 }, // Wall St area
        radius: 400,
        score: 3.5,
        color: '#eab308', // Yellow-500
        summary: "Mixed feedback. Generally safe during business hours, but fewer people around after 8 PM."
    },
    {
        id: 'zone_green_1',
        name: "Battery Park Promenade",
        center: { lat: 40.7023, lng: -74.0163 },
        radius: 500,
        score: 4.8,
        color: '#22c55e', // Green-500
        summary: "High safety ratings. Well-lit and popular for evening walks."
    }
];
