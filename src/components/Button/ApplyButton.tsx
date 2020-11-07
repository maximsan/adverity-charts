import React, { FC } from 'react';
import { Button, ButtonProps } from '@material-ui/core';

export const ApplyButton: FC<ButtonProps> = (props) => {
    return (
        <Button {...props} variant="outlined">
            Apply
        </Button>
    );
};
