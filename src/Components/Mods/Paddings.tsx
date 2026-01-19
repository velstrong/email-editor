import _ from 'lodash';
import { ChangeEvent, useMemo } from 'react';
import { Box, Grid, TextField, Typography, InputAdornment } from '@mui/material';
import { useVisibility } from '../../Hooks/Attribute.hook';
import { useEditor } from '../../Hooks/Editor.hook';

interface PaddingProps {
  activePath?: string;
}

const Padding = ({ activePath }: PaddingProps) => {
  const [visible, path, active] = useVisibility({
    attribute: 'padding',
    customPath: activePath,
  });
  const { mjmlJson, setMjmlJson } = useEditor();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    direction: string
  ) => {
    let value = e.currentTarget.value;
    if (value === '') {
      value = '0';
    }
    setPadding(direction, value);
  };

  const setPadding = useMemo(
    () => (direction: string, value: string) => {
      if (path && visible) {
        const element = _.get(mjmlJson, path);
        element.attributes[`padding-${direction}`] = value;
        const json = _.set(mjmlJson, path, element);
        setMjmlJson({ ...json });
      }
    },
    [visible, path, mjmlJson, setMjmlJson]
  );

  // NOTE: kept as-is (called on render), same as AntD version
  const getValue = (direction: string) => {
    let value = '';

    if (path && visible && active) {
      const element = _.get(mjmlJson, path);
      if (!element) return '';

      value = element.attributes?.[`padding-${direction}`];

      if (!value) {
        const shorthand = element.attributes?.padding;
        if (shorthand) {
          const [vertical, horizontal] = shorthand.split(' ');
          switch (direction) {
            case 'top':
            case 'bottom':
              return vertical;
            case 'left':
            case 'right':
              return horizontal;
          }
        }
      }
    }

    return value;
  };

  if (!visible) return null;

  const renderInput = (label: string, direction: string) => (
    <TextField
      fullWidth
      size="small"
      value={getValue(direction)}
      onChange={(e) => handleChange(e, direction)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {label}
          </InputAdornment>
        ),
      }}
    />
  );

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        Padding :
      </Typography>

      <Box mb={1}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {renderInput('top', 'top')}
          </Grid>
          <Grid item xs={6}>
            {renderInput('right', 'right')}
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          {renderInput('bottom', 'bottom')}
        </Grid>
        <Grid item xs={6}>
          {renderInput('left', 'left')}
        </Grid>
      </Grid>
    </Box>
  );
};

export { Padding };
