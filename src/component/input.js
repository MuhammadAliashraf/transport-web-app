// function MyInput(props) {
//     const { label, OnChange, disabled, required, min, max, type, fullWidth
// , value ,name} = props
//     return <input  name={name}                                  fullWidth
//  placeholder={label} disabled={disabled} onChange={OnChange} type={type} value={value} />
// }


function MyInput(props) {
    const {
        placeholder, label, onChange, disabled, required, fullWidth, name,id,type,
className    } = props;
    return <>
        <input
            fullWidth
            required
            className="input"
            id={id}
            placeholder={label}
            name={name}
            autoFocus
            onChange={onChange}
        />

    </>
}

export { MyInput };