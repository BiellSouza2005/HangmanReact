import { ReactElement, ButtonHTMLAttributes } from 'react';
import './Button.css';
 
interface BotaoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactElement | string;
    dataTestId?: string;
}
 
const Button = ({dataTestId, children, ...rest }: BotaoProps) => {
    return (
<button className='button' {...rest} data-test={dataTestId}>
            {children}
</button>
    );
}
 
export default Button;