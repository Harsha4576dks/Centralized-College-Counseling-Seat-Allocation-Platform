import '../styles/Button.css';

export default function Button({label, onClick, type='button', variant='primary', disabled=false}){

    return (
        <button type={type} onClick={onClick} disabled={disabled} className={`custom-btn${variant}`}>
            {label}
        </button>
    );
}