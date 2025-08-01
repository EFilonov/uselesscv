import { JSX } from 'react';

import style from './Card.module.css';
import { CardProps } from './Card.props';
import cn from 'classnames';

export const Card = ({ className, color = 'white', children, ...props }: CardProps): JSX.Element => {
    return (
        <div className={cn(className, style.card, { [style.lightBlue]: color === 'lightBlue' })} {...props}>
            {children}
        </div>
    );
};
