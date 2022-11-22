function MyButton(props) {

    const { color, label, variant, onClick, ClassName } = props
    return (
        <div>
            <button color={color}  variant={variant} className={`btn ${ClassName}`} onClick={onClick}>{label}</button>
        </div>
        // <button variant={variant} color={color} onclick={onclick} >{label}
        // </button>
    )
}
export default MyButton;
