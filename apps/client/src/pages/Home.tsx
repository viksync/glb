import { useNavigate } from 'react-router-dom';
import UserForm from '@/components/features/form/UserForm';
import useFormData from '@/hooks/useFormData';
import useGameData from '@/hooks/useGameData';
import config from '@/constants/appConfig';

export default function HomePage() {
    const navigate = useNavigate();
    const { fetchGames } = useGameData(config.serverUrl);

    const userForm = useFormData({
        onSubmit: async (formData) => {
            const games = await fetchGames(formData);
            if (games) {
                navigate('/results', {
                    state: {
                        games,
                        birthDate: formData.dob,
                    },
                });
            }
        },
    });

    return <UserForm {...userForm} />;
}
