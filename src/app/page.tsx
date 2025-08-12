// import React from 'react';
// import { Main } from './components/Main/Main';
// const Page = () => {
//     return <Main />;
// };
// export default Page;
import { Main } from './components/Main/Main';
import { getClientData } from './lib/contentful';

export default async function Page() {
    try {
        const contentfulData = await getClientData();
        return <Main data={contentfulData} />;
    } catch (error) {
        // Fallback к статичным данным
        return <Main />;
    }
}
