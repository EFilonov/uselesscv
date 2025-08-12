'use client';

import { Main } from './components/Main/Main';
import { useStore } from './store/zustandStore';

export default function Page() {
    const isLoading = useStore((state) => state.isLoading);
    return <Main />;
}
