let accessToken: string | null = null

export const authTokenStore = {
    getAccessToken: () => accessToken,
    setAccessToken: (token: string | null) => {
        accessToken = token;
    },
    clear: () => {
        accessToken = null;
    },
}