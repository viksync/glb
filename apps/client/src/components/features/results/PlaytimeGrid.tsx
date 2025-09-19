interface PlaytimeGridProps {
    games: Array<{ playtime_forever: number }>;
    birthDate: string;
}

export default function PlaytimeGrid({ games, birthDate }: PlaytimeGridProps) {
    const gameDays = daysFromGames(games);
    const totalLife = daysFromDateToToday(birthDate);
    const lifeDays = totalLife - gameDays;

    console.log('PlaytimeGrid render:', {
        gameDays,
        totalLife,
        lifeDays,
        gamesLength: games.length,
    });

    const gameItems = Array.from({ length: gameDays });
    const items = Array.from({ length: lifeDays });

    return (
        <div className='w-full px-32'>
            <div className='flex justify-center gap-8'>
                <h2 className='mb-6 text-2xl font-bold text-black'>
                    Life: {totalLife} days
                </h2>

                <h2 className='mb-6 text-2xl font-bold text-black'>
                    Games: {gameDays} days
                </h2>

                <h2 className='mb-6 text-2xl font-bold text-black'>
                    Ratio: {((gameDays / totalLife) * 100).toFixed(2)} %
                </h2>
            </div>
            <div className='grid grid-cols-64'>
                {gameItems.map((_, i) => (
                    <div key={i} className='h-[2px] bg-pink-200'></div>
                ))}

                {items.map((_, i) => (
                    <div key={i} className='h-[2px] bg-gray-500'></div>
                ))}
            </div>
        </div>
    );
}

function daysFromDateToToday(past: string): number {
    const msInDay = 86400000;
    const diffMs = new Date().getTime() - new Date(past).getTime();
    const diffDays = Math.floor(diffMs / msInDay);
    return diffDays;
}

function daysFromGames(games: Array<{ playtime_forever: number }>): number {
    const totalMins = games.reduce(
        (acc, game) => acc + game.playtime_forever,
        0,
    );
    return Math.round(totalMins / 1440);
}
