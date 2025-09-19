import { useState } from 'react';
import type { FormData } from '@/hooks/useFormData';

export default function useGameData(serverUrl: string) {
    const [gamesData, setGamesData] = useState(null);

    async function fetchGames(formData: FormData) {
        const username = formData.username;

        try {
            const response = await fetch(
                `${serverUrl}/games?username=${username}`,
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const games = await response.json();

            console.log(games);

            setGamesData(games);
            return games;
        } catch (error) {
            console.error('Failed to fetch games:', error);
            return null;
        }
    }

    return { gamesData, fetchGames };
}
