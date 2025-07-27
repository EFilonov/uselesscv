
import './Hamburger.css';


export const Hamburger = ({ className, onClick, active = false }) => {
    
    return (
        <button 
            className={`hamburger ${className} ${active ? active : ''} `}
            type="button"
            onClick={onClick}
        >
            <span></span>
            <span></span>
            <span></span>
        </button>
    );
};

