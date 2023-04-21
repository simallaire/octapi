import { Box, LinearProgress, LinearProgressProps, Typography } from "@mui/material";



function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${(props?.value || 0.0).toFixed(2)}%`}</Typography>
        </Box>
      </Box>
    );
}

export default LinearProgressWithLabel;