import { TextField } from "@mui/material";

function MyDatepicker(props) {
    const { label, variant, onChange, name, id, helperText, error, disabled, required, min, max, type, value, placeholder } = props;
    return <>
        <TextField
            fullWidth
            name={name}
            id={id}
            label={label}
            type={type}
            defaultValue="YY-MM-DD"
            onChange={onChange}
            InputLabelProps={{
                shrink: true,
            }}
        />
    </>
}
export default MyDatepicker;