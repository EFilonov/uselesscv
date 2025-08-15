import { ClassAttributes, DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface CardProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
        ClassAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
    color?: 'white' | 'lightBlue';
}
