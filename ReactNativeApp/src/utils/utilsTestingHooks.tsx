export const mockFailedFetch = (errorMessage: string) => {
    global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
            ok: false,
            status: 400,
            json: () => Promise.resolve({ error: errorMessage }),
        })
    );
}

export const mockSuccesfulFetch = (response: any) => {
    global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve(response),
        })
    );
}