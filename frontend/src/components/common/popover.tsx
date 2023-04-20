import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

export default function PopoverPopupState({component}: any) {
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState: any) => (
        <div>
          <Button variant="contained" {...bindTrigger(popupState)}>
            Open Popover
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}

          >
            <div style={{
              width: "100%",
              minHeight: "600px",
              margin: "20px"
            }}>{component}</div>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}