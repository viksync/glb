'use client';

import * as React from 'react';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/shadcn/button';
import { Calendar } from '@/components/ui/shadcn/calendar';
import { Label } from '@/components/ui/shadcn/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/shadcn/popover';

interface DateOfBirthPickerProps {
    formData: { dob: string };
    onChange: (name: string, value: string) => void;
}

export function DateOfBirthPicker({ formData, onChange }: DateOfBirthPickerProps) {
    const [open, setOpen] = React.useState(false);
    // const [date, setDate] = React.useState<Date | undefined>(undefined);

    const date = formData.dob ? new Date(formData.dob) : undefined;

    return (
        <div className='flex flex-col gap-3'>
            <Label htmlFor='date' className='px-1'>
                Date of birth
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant='outline'
                        id='date'
                        className='w-full justify-between font-normal'
                    >
                        {date ? date.toLocaleDateString() : 'Select date'}
                        <CalendarIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className='w-auto overflow-hidden p-0'
                    align='start'
                >
                    <Calendar
                        mode='single'
                        selected={date}
                        captionLayout='dropdown'
                        // onSelect={(date) => {
                        // setDate(date);
                        onSelect={(selectedDate) => {
                            if (selectedDate) {
                                const dateString = selectedDate.toISOString().split('T')[0]!;
                                onChange('dob', dateString);
                            }
                            setOpen(false);
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
