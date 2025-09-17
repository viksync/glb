import config from '@/config';
import PlaytimeGrid from '@/components/PlaytimeGrid';
import UserForm from '@/components/UserForm';
import useGameData from '@/hooks/useGameData';
import useFormData from '@/hooks/useFormData';

export default function App() {
    const { gamesData, fetchGames } = useGameData(config.serverUrl);
    const userForm = useFormData({ onSubmit: fetchGames });

    return (
        <>
            <UserForm {...userForm} />

            {gamesData && (
                <PlaytimeGrid
                    games={gamesData}
                    birthDate={userForm.formData.dob}
                />
            )}
        </>
    );
}
