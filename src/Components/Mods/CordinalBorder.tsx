import _ from 'lodash';
import { useEditor } from '../../Hooks/Editor.hook';
import {
  Box,
  TextField,
  Grid,
  Typography,
  InputAdornment,
} from '@mui/material';
import { useVisibility } from '../../Hooks/Attribute.hook';

interface CordinalBorderProps {
  activePath?: string;
}

export const CordinalBorder = ({ activePath }: CordinalBorderProps) => {
  const { mjmlJson, setMjmlJson } = useEditor();
  const [visible, path] = useVisibility({
    attribute: 'border-top',
    customPath: activePath,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    direction: string
  ) => {
    if (visible && path) {
      setValue(direction, e.target.value);
    }
  };

  const setValue = (direction: string, value: string) => {
    if (path) {
      const finalValue = value === '' ? 'none' : value;
      const element = _.get(mjmlJson, path);
      element.attributes[`border-${direction}`] = finalValue;
      const json = _.set(mjmlJson, path, element);
      setMjmlJson({ ...json });
    }
  };

  const onKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    direction: string
  ) => {
    if (e.currentTarget.value.length === 1 && e.key === 'Backspace') {
      e.currentTarget.value = '';
    }

    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (visible && path) {
        const attributes = _.get(mjmlJson, path + 'attributes');
        let value = attributes[`border-${direction}`];
        const match = /^\d+/.exec(value);
        const num = match ? parseInt(match[0], 10) : 0;

        if (e.key === 'ArrowUp') {
          value = value.replace(/^\d+/, String(num + 1));
        } else if (e.key === 'ArrowDown' && num > 0) {
          value = value.replace(/^\d+/, String(num - 1));
        }

        e.currentTarget.value = value;
        setValue(direction, value);
      }
    }
  };

  let [valuel, valuer, valueb, valuet] = ['', '', '', ''];
  if (visible && path) {
    valuel = _.get(mjmlJson, path + 'attributes.border-left');
    valuer = _.get(mjmlJson, path + 'attributes.border-right');
    valuet = _.get(mjmlJson, path + 'attributes.border-top');
    valueb = _.get(mjmlJson, path + 'attributes.border-bottom');
  }

  if (!visible) return null;

  const renderInput = (
    label: string,
    value: string,
    direction: string
  ) => (
    <TextField
      fullWidth
      size="small"
      value={value}
      onChange={(e) => handleChange(e, direction)}
      onKeyDown={(e) => onKeyDown(e, direction)}
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
        Border Directions
      </Typography>

      <Grid container spacing={2} mb={1}>
        <Grid item xs={6}>
          {renderInput('top', valuet, 'top')}
        </Grid>
        <Grid item xs={6}>
          {renderInput('right', valuer, 'right')}
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          {renderInput('bottom', valueb, 'bottom')}
        </Grid>
        <Grid item xs={6}>
          {renderInput('left', valuel, 'left')}
        </Grid>
      </Grid>
    </Box>
  );
};
