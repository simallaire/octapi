import { FormControlLabel, Switch } from "@mui/material";



function LabelledSwitch({checked, onChange, label}: any){

    return (
        <FormControlLabel control={<Switch checked={checked} onChange={onChange} />} label={label} />
    )
}

export default LabelledSwitch;