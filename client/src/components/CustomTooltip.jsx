import { Tooltip } from '@mui/material';

export const CustomTooltip = ({ children, message }) => {
    return (
        <Tooltip
            arrow
            placement='top'
            title={message && message}
            slotProps={{
                tooltip: {
                    sx: { backgroundColor: 'error.main' }
                },
                arrow: {
                    sx: { color: 'error.main' }
                }
            }}
        >
            {children}
        </Tooltip>
    );
};
