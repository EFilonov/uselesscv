import {CardProps} from "./Card.props";
import {JSX} from "react";
import cn from 'classnames';
import style from './Card.module.css';

export const Card = ({ className, color = 'white', children, ...props }: CardProps): JSX.Element  => {
    return (
        <div className={cn(className, style.card, {[style.lightBlue]: color === 'lightBlue' })} {...props} >
            {children}
            
        </div>    
    );
};

