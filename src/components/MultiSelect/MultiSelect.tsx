import React, { FC } from 'react';
import { FormControl, FormLabel, IconButton, TextField, StandardTextFieldProps } from '@material-ui/core';
import Restore from '@material-ui/icons/Restore';
import { Autocomplete } from '@material-ui/lab';
import { Tag } from '../Tag/Tag';
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Value,
} from '@material-ui/lab/useAutocomplete/useAutocomplete';
import { ALL, AllOption } from '../../shared/constants';
import { useStyles } from './styles';

export interface Option {
  id: string;
  value: string;
  name: string;
}

export interface MultiSelectProps extends Omit<StandardTextFieldProps, 'name' | 'value' | 'onChange' | 'variant'> {
  name: string;
  value: Option[];
  options: Option[];
  label?: string;
  onChange: (name: string, value: Option[]) => void;
  restoreOptions?: (name: string) => () => void;
  deleteOption?: (name: string, value: string) => (e: React.MouseEvent) => void;
}

export const MultiSelect: FC<MultiSelectProps> = ({
  label,
  id,
  options,
  value,
  onChange,
  name,
  restoreOptions,
  deleteOption,
  disabled,
  ...restProps
}) => {
  const { formControl } = useStyles();

  const onHandleChange = (name: string) => (
    event: React.ChangeEvent<{}>,
    value: Value<Option, boolean, boolean, boolean>,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<Option>
  ) => {
    let values = value as Option[];
    let options: Option[] = values;
    const hasAllOption = values.find(({ name }) => name === ALL);
    const passAllOption = details?.option?.name === ALL;
    if ((hasAllOption && passAllOption) || !values.length) {
      options = [AllOption];
    } else if (hasAllOption && !passAllOption) {
      options = values.filter(({ name }) => name !== ALL);
    }

    onChange(name, options);
  };

  return (
    <FormControl className={formControl}>
      <FormLabel id={id}>
        {label}
        <IconButton onClick={restoreOptions ? restoreOptions(name) : undefined} aria-label="delete">
          <Restore fontSize="small" />
        </IconButton>
      </FormLabel>
      <Autocomplete<Option, boolean, boolean, boolean>
        multiple
        filterSelectedOptions
        disableClearable
        options={options || []}
        getOptionLabel={(option) => option?.name}
        renderTags={(tagValue, getTagProps) => {
          return (
            tagValue.length &&
            tagValue.map((option: Option, index: number) => {
              if (option?.name === ALL) {
                return <div {...getTagProps({ index })}>{option.name}</div>;
              }
              return <Tag label={option?.name} {...getTagProps({ index })} />;
            })
          );
        }}
        loading={options.length < 2}
        loadingText="Options loading..."
        value={value}
        getOptionSelected={({ value: inputValue }, itemValue) => {
          return inputValue === itemValue?.value;
        }}
        onChange={onHandleChange(name)}
        renderInput={(params) => <TextField disabled={disabled} variant="outlined" {...restProps} {...params} />}
      />
    </FormControl>
  );
};
