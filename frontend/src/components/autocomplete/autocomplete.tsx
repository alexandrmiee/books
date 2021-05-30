import React, {useState} from 'react';
import {TextField} from '@material-ui/core';
import AutocompleteInput from '@material-ui/lab/Autocomplete';

interface AutocompleteProps {
  values: string[];
  defaultValue: string | null;
  label: string;
  onUpdateValue: (value: string) => void;
  onLoadValues: (value: string) => void;
}

export const Autocomplete: React.FC<AutocompleteProps> = ({
    values,
    defaultValue,
    label,
    onUpdateValue,
    onLoadValues,
}) => {
    const [value, setValue] = useState<string>(defaultValue ?? '');

    return (
        <AutocompleteInput
            options={values}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            onChange={(_event, newValue) => {
                setValue(newValue ?? '');
                onUpdateValue(newValue ?? '');
            }}
            onInputChange={(_event, newInputValue) => {
                setValue(newInputValue ?? '');
                onLoadValues(newInputValue ?? '');
            }}
            renderInput={params => (
                <TextField {...params} label={label} variant="outlined" fullWidth />
            )}
        />
    );
};
