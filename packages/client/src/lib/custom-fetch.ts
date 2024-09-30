// NOTE: Supports cases where `content-type` is other than `json`
const getBody = <T>(c: Response | Request): Promise<T> => {
    const contentType = c.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
        return c.json();
    }

    if (contentType && contentType.includes('application/pdf')) {
        return c.blob() as Promise<T>;
    }

    return c.text() as Promise<T>;
};

// NOTE: Add headers
const getHeaders = (headers?: HeadersInit): HeadersInit => {
    return {
        ...headers,
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.AGORA_API_KEY}`,
    };
};

export const customFetch = async <T>(
    url: string,
    options: RequestInit,
): Promise<T> => {
    console.log("Calling custom fetch for URL: ", url);
    const requestHeaders = getHeaders(options.headers);

    const requestInit: RequestInit = {
        ...options,
        headers: requestHeaders,
    };

    const request = new Request(url, requestInit);

    const response = await fetch(request);

    const data = await getBody<T>(response);

    return {status: response.status, data} as T;
};