import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import { Button } from '@/components/ui/shadcn/button';

export default function Header() {
    return (
        <header className='flex items-center justify-between p-4'>
            <div className='logo'>
                <a href='https://pawer.tools/'>
                    <img
                        src='/images/paw.png'
                        alt='Cat paw logo'
                        width='20'
                        height='20'
                        className='object-contain'
                    />
                </a>
            </div>

            {/* <nav>
                <Button variant='link'>Home</Button>
                <Button variant='link'>About</Button>
                <Button variant='link'>Other tools</Button>
                <Button variant='link'>Contact</Button>
            </nav> */}
            <ThemeSwitcher />
        </header>
    );
}
