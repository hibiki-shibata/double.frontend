import { http, HttpResponse, delay } from 'msw';

export const handlers = [
    // 1. Mock Market List
    http.get('http://localhost:3000/api/v1/market/list', async () => {
        await delay(Math.random() * 2500); // Simulate network latency
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
        await delay(Math.random() * 2500);
        const { marketId } = params
        const random = Math.floor(Math.random() * 10)
        return HttpResponse.json({
            id: marketId,
            title: marketId + " Would u bet the release of this test goes well?",
            status: random % 2 ? "OPEN" : "CLOSED",
            closeAt: "2024-12-31T23:59:59Z",
            createdAt: "2024-01-01T00:00:00Z",
        })
    }),

    // Mock fetch Prediction
    // http.get('http://localhost:3000/api/v1/:marketId/predictions', ({ request }) => {
    // const url = new URL(request.url)
    // const marketId = url.searchParams.get('marketId')
    http.get('http://localhost:3000/api/v1/market/:marketId/predictions', async ({ params }) => {
        await delay(Math.random() * 2500)
        console.log(params)
        const mockedResponse = []
        for (let i = 1; i < 3; i++) {
            mockedResponse.push({
                id: Math.random(),
                name: i % 2 ? "Yes, it will succcess" : "No, it will fails",
                totalParticipants: i * 313,
                betSum: (BigInt(i * 190192309)).toString() // Convert BigInt to string to allow JSON serialization
            })
        }

        return HttpResponse.json(mockedResponse)
    }),


    // Mock fetch market detail
    http.get('http://localhost:3000/api/v1/market/:marketId', async () => {
        await delay(Math.random() * 2500);
        const mockedResponse = []
        for (let i = 0; i < 10; i++) {
            mockedResponse.push({
                id: i.toString(),
                title: "Would u bet the release of this test " + i + " goes well?",
                status: i % 2 ? "OPEN" : "CLOSED",
                closeAt: "2024-12-31T23:59:59Z",
                createdAt: "2024-01-01T00:00:00Z",
            })
        }
        return HttpResponse.json(mockedResponse);
    }),


    // Mock Wallet history
    http.get('http://localhost:3000/api/v1/wallet/history', async () => {
        await delay(Math.random() * 2500);
        const mockedResponse = []
        for (let i = 0; i < 10; i++) {
            mockedResponse.push({
                id: i,
                type: 'deposit',
                amount: 500,
                status: 'completed',
                timestamp: '2024-01-15T10:30:00Z',
                description: 'Bank transfer deposit',
                txHash: '0x123...abc'
            })
        }
        return HttpResponse.json(mockedResponse);
    }),

    // Mock Wallet Data
    http.get('http://localhost:3000/api/v1/wallet/me', async () => {
        await delay(Math.random() * 2500);
        return HttpResponse.json({
            id: Math.random(),
            userId: "fake-user-id",
            balance: 101910101010101001,
            currency: 'USD',
            reservedAmount: 22222292929,
            status: "ACTIVE",
            timestamp: '2024-01-15T10:30:00Z',
        });
    }),


    // Mock fetch user 
    http.get('http://localhost:3000/api/v1/user/me', async () => {
        await delay(Math.random() * 2500);
        return HttpResponse.json({
            id: "1",
            name: "hibiki shibata",
            emailAddress: "hibiki@example.com",
        });
    }),


    // Mock bet histotry
    http.get('http://localhost:3000/api/v1/bet/history', async () => {
        await delay(Math.random() * 2500);
        const mockedResponse = []
        for (let i = 0; i < 10; i++) {
            mockedResponse.push({
                id: i,
                marketTitle: i + 'Will prediction market goes viral?',
                prediction: (i % 2) ? 'Yes' : 'No',
                amount: i * 100,
                outcome: (i % 2) ? 'won' : 'lose',
                profit: i * 150,
                timestamp: '2024-01-14T15:20:00Z'
            },)
        }
        return HttpResponse.json(mockedResponse);
    }),


    // Place Bet
    http.post('http://localhost:3000/api/v1/bet', async ({ request }) => {
        await delay(Math.random() * 2500);
        const body = (await request.json()) as { name: string };
        return HttpResponse.json(
            { id: String(Date.now()), name: body.name },
            { status: 201 }
        )
    }),

    // Login
    http.post('http://localhost:3000/api/v1/auth/login', async ({ request }) => {
        await delay(Math.random() * 2500);
        console.log("login request: " + request)
        return HttpResponse.json({
            accessToken: "mocked-access-token-for-login"
        })
    }),

    // Signup
    http.post('http://localhost:3000/api/v1/auth/signup', async ({ request }) => {
        await delay(Math.random() * 2500)
        console.log("signup request: " + request)
        return HttpResponse.json({
            accessToken: "mocked-access-token-for-signup"
        })
    }),

    // Signup
    http.post('http://localhost:3000/api/v1/auth/refreshToken', async ({ request }) => {
        await delay(Math.random() * 2500)
        console.log("signup request: " + request)
        return HttpResponse.json({
            accessToken: "mocked-access-token-for-signup"
        })
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