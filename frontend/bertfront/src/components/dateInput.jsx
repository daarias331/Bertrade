import { TextField } from "@mui/material";

export const TextField2 = withStyles({
    root: {
        '& .MuiInput-underline:after': {
            borderBottomColor: '#ffffff',
        },
        "& .MuiSelect-icon": {
            color: "#ffffff"
        },
        "& .MuiInput-icon": {
            color: "#ffffff"
        },
    },})(TextField);


