
import {HTMLAttributes, ReactNode, ClassAttributes, DetailedHTMLProps} from "react";

export interface CardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, ClassAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
    color?: 'white' | 'lightBlue' 
}
