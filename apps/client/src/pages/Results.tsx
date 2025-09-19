import { useLocation, Navigate } from 'react-router-dom';
import PlaytimeGrid from '@/components/features/results/PlaytimeGrid';

export default function ResultsPage() {
    const location = useLocation();
    const { games, birthDate } = location.state || {};

    if (!games || !birthDate) {
        return <Navigate to='/' replace />;
    }

    return <PlaytimeGrid games={games} birthDate={birthDate} />;
}
