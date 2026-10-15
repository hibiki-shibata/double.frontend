import { http, HttpResponse, delay } from 'msw';

export const handlers = [
    // 1. Mock Market List
    http.get('http://localhost:3000/api/v1/market/list', async () => {
        await delay(150); // Optional: simulate network latency
        const mockedResponse = []
        for (let i = 0; i < 10; i++) {
            mockedResponse.push(
                {
                    id: i.toString(),
                    title: "Would u bet the release of this test " + i + " goes well?",
                    status: i % 2 ? "OPEN" : "CLOSED",
                    closeAt: "2024-12-31T23:59:59Z",
                    createdAt: "2024-01-01T00:00:00Z",
                    // predictions: [
                    //     { name: "Yes", totalParticipants: 1234, betSum: "4500000000000000000" },
                    //     { name: "No", totalParticipants: 567, betSum: "2100000000000000000" },
                    // ]
                }
            )
        }
        return HttpResponse.json(mockedResponse);
    }),

    // Mock prediction fetch
    http.get('http://localhost:3000/api/v1/market/:marketId', ({ params }) => {
        const { marketId } = params
        const random = Math.random()

        // Return a mock Market object
        return HttpResponse.json({
            id: marketId,
            title: "Would u bet the release of this test " + random + " goes well?",
            status: random % 2 ? "OPEN" : "CLOSED",
            closeAt: "2024-12-31T23:59:59Z",
            createdAt: "2024-01-01T00:00:00Z",
            // predictions: [
            //     { name: "Yes", totalParticipants: 1234, betSum: "4500000000000000000" },
            //     { name: "No", totalParticipants: 567, betSum: "2100000000000000000" },
            // ]
        })
    }),

    // Prediction
    http.get('/prediction/', ({ request }) => {
        const url = new URL(request.url)
        const marketId = url.searchParams.get('marketId')

        const mockedResponse = []

        for (let i = 0; i < 3; i++) {
            mockedResponse.push(
                { name: i % 2 ? "Yes" : "No", totalParticipants: i * 313, betSum: BigInt(i * 999999999999999) },
            )
        }


        return HttpResponse.json([
            {
                id: '1',
                marketId: marketId || 'unknown',
                title: 'Mock Prediction Title',
                probability: 0.85,
                // Add other properties matching your Prediction type
            },
        ])
    }),

    // http.get('http://localhost:3000/api/v1/market/', async () => {
    //     await delay(150); // Optional: simulate network latency
    //     const mockedResponse = []
    //     for (let i = 0; i < 10; i++) {
    //         mockedResponse.push(
    //             {
    //                 id: i.toString(),
    //                 title: "Would u bet the release of this test " + i + " goes well?",
    //                 status: i % 2 ? "OPEN" : "CLOSED",
    //                 closeAt: "2024-12-31T23:59:59Z",
    //                 createdAt: "2024-01-01T00:00:00Z",
    //                 // predictions: [
    //                 //     { name: "Yes", totalParticipants: 1234, betSum: "4500000000000000000" },
    //                 //     { name: "No", totalParticipants: 567, betSum: "2100000000000000000" },
    //                 // ]
    //             }
    //         )
    //     }
    //     return HttpResponse.json(mockedResponse);
    // }),

    // // 2. Mock POST request
    // http.post('/api/users', async ({ request }) => {
    //     const body = (await request.json()) as { name: string };
    //     return HttpResponse.json(
    //         { id: String(Date.now()), name: body.name },
    //         { status: 201 }
    //     );
    // }),

    // // 3. Mock 500 Server Error (Great for UI error testing!)
    // http.get('/api/error-test', () => {
    //     return new HttpResponse(null, { status: 500 });
    // }),
]