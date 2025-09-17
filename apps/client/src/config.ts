import type { FormData } from '@/hooks/useFormData';

const env = 'dev';
const server = 'local';
const ghWorkspace =
    'https://solid-giggle-r4vp746q96xgh564g-3001.app.github.dev';
const localhost = 'http://localhost:3001';

const serverUrl = server === 'local' ? localhost : ghWorkspace;

const defaultFormData: FormData =
    env === 'dev' ?
        { username: 'unicode2929', dob: '1993-04-13' }
    :   { username: '', dob: '' };

export default { serverUrl, defaultFormData };
