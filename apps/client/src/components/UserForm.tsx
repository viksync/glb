import type { UseFormDataReturn } from '@/hooks/useFormData';

export default function UserForm(props: UseFormDataReturn) {
    const { formData, onChange, onSubmit, isLoading } = props;

    return (
        <>
            <div className='flex flex-col items-center pt-8'>
                <form onSubmit={onSubmit} className='pb-8'>
                    <fieldset className='flex flex-col gap-4'>
                        <legend className='sr-only'>User Information</legend>

                        <label htmlFor='steam-username' className='sr-only'>
                            Steam username:
                        </label>

                        <input
                            type='text'
                            id='steam-username'
                            value={formData.username}
                            onChange={onChange}
                            required
                            name='username'
                            placeholder='Enter Steam username'
                            autoCapitalize='none'
                            spellCheck='false'
                            autoComplete='username'
                            pattern='[a-zA-Z0-9_-]+'
                            title='Steam username can only contain letters, numbers, underscores, and dashes'
                            className='rounded-lg border border-gray-500 px-2 py-2 text-base transition-colors duration-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
                        />

                        <div className='flex flex-col'>
                            <label
                                htmlFor='dob'
                                className='mb-0.5 text-sm font-medium'
                            >
                                Date of birth:
                            </label>
                            <input
                                type='date'
                                id='dob'
                                value={formData.dob}
                                onChange={onChange}
                                name='dob'
                                required
                                min='1905-01-01'
                                max='2025-09-08'
                                autoComplete='bday'
                                className='rounded-lg border border-gray-500 px-2 py-2 text-base transition-colors duration-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
                            />
                        </div>

                        <button
                            type='submit'
                            disabled={isLoading}
                            className='mt-5 rounded border border-cyan-400 bg-gradient-to-b from-cyan-400 via-cyan-500 to-cyan-600 px-6 py-3 font-semibold text-slate-900 shadow-lg transition-all duration-200 hover:from-cyan-300 hover:via-cyan-400 hover:to-cyan-500 hover:shadow-cyan-400/25 focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-800 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:grayscale'
                        >
                            {isLoading ? 'Analyzing...' : 'Analyze'}
                        </button>
                    </fieldset>
                </form>
            </div>
        </>
    );
}
