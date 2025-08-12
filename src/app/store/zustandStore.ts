import { clientData } from '../interfaces/clientData.interface';
import { create } from 'zustand';

interface StoreState {
    data: clientData | null;
    isLoading: boolean;
    fetchData: () => Promise<void>;
}

export const useStore = create<StoreState>()((set, get) => ({
    data: null,
    isLoading: true,

    fetchData: async () => {
        set({ isLoading: true });
        try {
            const response = await fetch('/api/contentful');
            if (response.ok) {
                const contentfulData = await response.json();
                set({ data: contentfulData, isLoading: false });
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            set({ data: null, isLoading: false });
        }
    }
}));

// Automatically fetch data when store is created
if (typeof window !== 'undefined') {
    useStore.getState().fetchData();
}
