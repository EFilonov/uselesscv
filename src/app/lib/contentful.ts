import { contentfulClient } from '../services/contentfulService';

export async function getContentfulData() {
    try {
        const entries = await contentfulClient.getEntries();
        return entries.items;
    } catch (error) {
        console.error('Error fetching Contentful data:', error);
        return null;
    }
}

export async function getClientData(): Promise<any> {
    const contentfulData = await getContentfulData();
    // console.log('contentfulData', contentfulData);

    if (!contentfulData) {
        throw new Error('Failed to fetch data from Contentful');
    }
    // Assuming the first entry contains the client data
    const entry = contentfulData[0].fields;
    return {
        name: entry.name,
        occupation: entry.occupation,
        address: entry.address
        // phone: {
        //     short: entry.phone.short,
        //     full: entry.phone.full
        // }
    };
}
