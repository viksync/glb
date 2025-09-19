import { Card, CardContent, CardFooter } from '@/components/ui/shadcn/card';
import { SteamIdentification } from '@/components/features/form/SteamIdentification';
import { DateOfBirthPicker } from '@/components/features/form/DobPicker';
import { Button } from '@/components/ui/shadcn/button';
import type { UseFormDataReturn } from '@/hooks/useFormData';

export default function UserForm(props: UseFormDataReturn) {
    const { formData, onChange, onSubmit, isLoading } = props;

    return (
        <Card className='w-96 shadow-xl'>
            <form onSubmit={onSubmit}>
                <CardContent className='flex flex-col gap-6'>
                    <SteamIdentification
                        formData={formData}
                        onChange={onChange}
                    />
                    <DateOfBirthPicker
                        formData={formData}
                        onChange={onChange}
                    />
                </CardContent>
                <CardFooter className='justify-center pt-3'>
                    <Button type='submit' disabled={isLoading}>
                        {isLoading ? 'Analyzing...' : 'Will i get laid?'}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
