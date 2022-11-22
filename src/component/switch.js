import Switch from "@mui/material/Switch";

function MySwitch(props) {
  const { label, onChange, value } = props;
  return (
    <>
      <Switch checked={value} value={value} label={label} onChange={onChange} />
    </>
  );  
}
export default MySwitch;