import React, { FC, memo } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import styled from '@material-ui/core/styles/styled';
import { AutocompleteGetTagProps } from '@material-ui/lab';

export interface TagType extends AutocompleteGetTagProps {
    label: string;
    onDelete?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

const TagComponent: FC<TagType> = ({ label, onDelete, ...rest }) => (
    <div {...rest}>
        <CloseIcon onClick={onDelete} />
        <span>{label}</span>
    </div>
);

const StyledTag = styled(TagComponent)({
    display: 'flex',
    alignItems: 'center',
    height: 30,
    margin: 2,
    lineHeight: 28,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    boxSizing: 'content-box',
    padding: '0 10px',
    outline: 0,
    overflow: 'hidden',
    '& span': {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    '& svg': {
        fontSize: 12,
        cursor: 'pointer',
        padding: 4,
    },
});

export const Tag = memo(StyledTag);
