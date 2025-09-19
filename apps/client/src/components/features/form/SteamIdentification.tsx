import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from '@/components/ui/shadcn/card';
import { Input } from '@/components/ui/shadcn/input';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/shadcn/tabs';

interface SteamIdentificationProps {
    formData: { username: string; steamid: string };
    onChange: (name: string, value: string) => void;
}

export function SteamIdentification({ formData, onChange }: SteamIdentificationProps) {
    return (
        <div className='flex w-full max-w-sm flex-col gap-6'>
            <Tabs defaultValue='username'>
                <TabsList>
                    <TabsTrigger value='username'>Username</TabsTrigger>
                    <TabsTrigger value='steamid'>Steam ID</TabsTrigger>
                </TabsList>

                <TabsContent value='username'>
                    <Card>
                        <CardHeader>
                            <CardDescription>
                                If you have created a custom public url, paste
                                your username.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className='grid gap-6'>
                            <div className='grid gap-3'>
                                <Input
                                    id='from-username'
                                    name='username'
                                    placeholder='Paste username here'
                                    value={formData.username}
                                    onChange={(e) =>
                                        onChange('username', e.target.value)
                                    }
                                    minLength={3}
                                    maxLength={32}
                                    autoCapitalize='none'
                                    spellCheck='false'
                                    autoComplete='username'
                                    pattern='[a-zA-Z0-9_\-]+'
                                    title='Steam username can only contain letters, numbers, underscores, and dashes'
                                    required
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value='steamid'>
                    <Card>
                        <CardHeader>
                            <CardDescription>
                                Steam ID is 17 digit id from your profile link
                            </CardDescription>
                        </CardHeader>

                        <CardContent className='grid gap-6'>
                            <div className='grid gap-3'>
                                <Input
                                    id='form-steamid'
                                    name='steamid'
                                    placeholder='Paste Steam ID here'
                                    value={formData.steamid}
                                    onChange={(e) =>
                                        onChange('steamid', e.target.value)
                                    }
                                    minLength={17}
                                    maxLength={17}
                                    pattern='[0-9]'
                                    title='Steam ID has to contain exactly 17 numbers'
                                    required
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
