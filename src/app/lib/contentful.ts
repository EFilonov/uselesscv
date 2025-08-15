import { clientData } from '../interfaces/clientData.interface';
import { contentfulClient } from '../services/contentfulService';
import type { Entry } from 'contentful';

type DatacvSkeleton = {
    contentTypeId: 'datacv';
    fields: clientData;
};

export async function getContentfulData(): Promise<Entry<DatacvSkeleton>[]> {
    try {
        const entries = await contentfulClient.getEntries<DatacvSkeleton>({
            content_type: 'datacv'
        });
        return entries.items;
    } catch (error) {
        console.error('Error fetching Contentful data:', error);
        return [];
    }
}

export async function getClientData(): Promise<clientData | null> {
    const contentfulData = await getContentfulData();

    if (!contentfulData || contentfulData.length === 0) {
        console.error('Failed to fetch data from Contentful');
        return null;
    }

    const fields = contentfulData[0].fields as clientData;

    return fields;
}
