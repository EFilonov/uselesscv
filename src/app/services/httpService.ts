import { notFound } from "next/navigation";

export interface HttpService {
    request<T extends object | object[]>(
        url: string,
        method?: string,
        body?: BodyInit | null,
        headers?: HeadersInit
    ): Promise<T>;
}

export const httpService = (): HttpService => {
    
    const request = async <T extends object | object[]>(
        url: string,
        method: string = 'GET',
        body: BodyInit | null = null,
        headers: HeadersInit = { 'Content-Type': 'application/json' }
    ): Promise<T> => {
        // await new Promise(resolve => setTimeout(() => resolve(''), 2000)); // simulate delay for debugging
        const response = await fetch(url, { 
            method, 
            body, 
            headers,
            //cache: 'force-cache', // disable caching if needed
            ///next: { revalidate: 3600} // if used in Next.js, cache response for 1 hour 
        });

        if (!response.ok) {
            notFound();
            // throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        } 

        const data: T = await response.json();
        // console.log(`Response from ${url}:`, data); // for debugging, can be removed in production

        return data;
    };

    return { request };
};