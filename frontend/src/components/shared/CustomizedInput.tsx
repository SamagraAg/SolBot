import TextField from "@mui/material/TextField";

type Props = {
  name: string;
  type: string;
  label: string;
};

const CustomizedInput = ({ name, type, label }: Props) => {
  return (
    <TextField
      fullWidth
      margin="normal"
      name={name}
      label={label}
      type={type}
      InputLabelProps={{
        style: { color: "white" },
      }}
      InputProps={{
        style: {
          borderRadius: 10,
          fontSize: 16,
          color: "white",
          padding: "12px",
        },
      }}
    />
  );
};

export default CustomizedInput;
