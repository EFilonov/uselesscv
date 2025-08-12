import { NextResponse } from 'next/server';

import { getClientData } from '../../lib/contentful';

export async function GET() {
    try {
        const data = await getClientData();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching Contentful data:', error);
        return NextResponse.json(null, { status: 500 });
    }
}
