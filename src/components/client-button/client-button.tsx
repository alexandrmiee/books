import React from 'react';
import Button, {ButtonProps} from '@material-ui/core/Button';

export interface Props extends ButtonProps {
  text: string;
  wrapperStyles?: React.CSSProperties;
}

export const ClientButton: React.FC<Props> = ({
    text,
    wrapperStyles,
    ...buttonConfig
}) => (
    <div className="button" style={wrapperStyles}>
        <Button {...buttonConfig}>{text}</Button>
    </div>
);
