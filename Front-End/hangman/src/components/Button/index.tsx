import { ReactElement, ButtonHTMLAttributes } from 'react';
import './Button.css';
 
interface BotaoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactElement | string;
}
 
const Button = ({ children, ...rest }: BotaoProps) => {
    return (
<button className='button' {...rest}>
            {children}
</button>
    );
}
 
export default Button;