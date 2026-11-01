import { http, HttpResponse, delay } from 'msw';

export const handlers = [
    // 1. Mock Market List
    http.get('http://localhost:3000/api/v1/market/list', async () => {
        await delay(750); // Optional: simulate network latency
        const mockedResponse = []
        for (let i = 0; i < 30; i++) {
            mockedResponse.push({
                id: i.toString(),
                title: i + ". Would u bet Hibiki's prediction market will success?",
                status: i % 7 ? "OPEN" : "CLOSED",
                closeAt: "2024-12-31T23:59:59Z",
                createdAt: "2024-01-01T00:00:00Z",
            })
        }
        return HttpResponse.json(mockedResponse);
    }),

    // Mock market fetch
    http.get('http://localhost:3000/api/v1/market/:marketId', async ({ params }) => {
        await delay(250)
        const { marketId } = params
        const random = Math.floor(Math.random() * 10)

        // Return a mock Market object
        return HttpResponse.json({
            id: marketId,
            title: marketId + " Would u bet the release of this test goes well?",
            status: random % 2 ? "OPEN" : "CLOSED",
            closeAt: "2024-12-31T23:59:59Z",
            createdAt: "2024-01-01T00:00:00Z",
            // predictions: [
            //     { name: "Yes", totalParticipants: 1234, betSum: "4500000000000000000" },
            //     { name: "No", totalParticipants: 567, betSum: "2100000000000000000" },
            // ]
        })
    }),

    // Mock fetch Prediction
    // http.get('http://localhost:3000/api/v1/:marketId/predictions', ({ request }) => {
    // const url = new URL(request.url)
    // const marketId = url.searchParams.get('marketId')
    http.get('http://localhost:3000/api/v1/market/:marketId/predictions', async ({ params }) => {
        await delay(1150)
        const { marketId } = params
        // const random = Math.random()
        console.log("Received prediction req for marketId:" + marketId)

        const mockedResponse = []

        for (let i = 0; i < 2; i++) {
            mockedResponse.push(
                {
                    id: Math.random(),
                    name: i % 2 ? "Yes, it will succcess" : "No, it will fails",
                    totalParticipants: i * 313,
                    // Convert BigInt to string to allow JSON serialization
                    betSum: (BigInt(i * 999999999999999)).toString()
                },
            )
        }

        return HttpResponse.json(mockedResponse)
    }),

    http.get('http://localhost:3000/api/v1/market/:marketId', async () => {
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


    // Mock fetch user 
    http.get('http://localhost:3000/api/v1/user/me', async () => {
        await delay(350); // Optional: simulate network latency
        return HttpResponse.json({
            id: "1",
            name: "hibiki shibata",
            emailAddress: "hibiki@example.com",
        });
    }),


    // Place Bet
    http.post('http://localhost:3000/api/v1/bet', async ({ request }) => {
        await delay(550); // Optional: simulate network latency
        const body = (await request.json()) as { name: string };
        // Return a mock Market object
        return HttpResponse.json(
            { id: String(Date.now()), name: body.name },
            { status: 201 }
        )
    }),


    // Get user data
    http.post('http://localhost:3000/api/v1/auth/login', ({ request }) => {
        console.log("login request: " + request)
        return HttpResponse.json(
            { accessToken: "mocked-access-token-for-login" },
        )
    }),

    http.post('http://localhost:3000/api/v1/auth/signup', ({ request }) => {
        console.log("signup request: " + request)
        return HttpResponse.json(
            { accessToken: "mocked-access-token-for-signup" },
        )
    }),

    // http.post('http://localhost:3000/api/v1/auth/refreshToken', ({ request }) => {
    //     return HttpResponse.STATUS_CODES_WITHOUT_BODY
    // })

    // http.post('http://localhost:3000/api/v1/auth/logout', ({ request }) => {

    // })

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