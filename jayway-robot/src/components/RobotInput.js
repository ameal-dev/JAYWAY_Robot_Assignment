import TextField from "@mui/material/TextField";

export function RobotInput(props) {
  return (
    <>
      <TextField id="outlined" label={props.text} onChange={props.onChange} />
    </>
  );
}
