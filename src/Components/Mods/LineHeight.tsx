import _ from 'lodash';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Box,
  Grid,
  TextField,
  InputAdornment,
  Typography,
} from '@mui/material';
import { useValue, useVisibility } from '../../Hooks/Attribute.hook';
import { useEditor } from '../../Hooks/Editor.hook';

const ATTRIBUTE = 'line-height';

const LineHeight = () => {
  const [visible, path] = useVisibility({ attribute: ATTRIBUTE });
  const { mjmlJson, setMjmlJson } = useEditor();
  const [value, setValue] = useState<string>('100%');
  const { getValue } = useValue({ path, visible, attribute: ATTRIBUTE });

  useEffect(() => {
    if (visible && path) {
      setValue(getValue());
    }
  }, [visible, path, getValue]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (visible && path) {
      SetValue(newValue.toString(), path, mjmlJson, setMjmlJson);
    }
  };

  const decrement = () => {
    changeValue(visible, value, mjmlJson, path!, setValue, setMjmlJson, 'dec');
  };

  const increment = () => {
    changeValue(visible, value, mjmlJson, path!, setValue, setMjmlJson, 'inc');
  };

  if (!visible) return null;

  return (
    <Box>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs>
          <Typography variant="body2">
            Line Height:
          </Typography>
        </Grid>

        <Grid item>
          <IncrementDecrementTextField
            size="small"
            value={value}
            onChange={onChange}
            InputProps={{
              startAdornment: (
                <Adornment onClick={decrement}>-</Adornment>
              ),
              endAdornment: (
                <Adornment onClick={increment}>+</Adornment>
              ),
            }}
            sx={{
              width: `${value ? value.length + 12 : 12}ch`,
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

/* ---------- styled components ---------- */

const IncrementDecrementTextField = styled(TextField)`
  .MuiInputAdornment-root {
    cursor: pointer;
    user-select: none;
    margin: 0;
  }
`;

const Adornment = styled(InputAdornment).attrs({
  position: 'start',
})`
  cursor: pointer;
  padding: 0 11px;
  &:hover {
    color: #1976d2;
  }
`;

/* ---------- logic helpers (unchanged) ---------- */

const changeValue = (
  visible: boolean | null,
  value: string,
  mjmlJson: any,
  path: string,
  setValue: (arg: string) => void,
  setMjmlJson: (arg: any) => void,
  type: 'inc' | 'dec'
) => {
  if (visible && value) {
    let existingValue: number;
    let increment: number;

    if (value.includes('%')) {
      existingValue = parseInt(value.replace('%', ''), 10);
      increment = type === 'inc' ? 10 : -10;
    } else {
      existingValue = parseInt(value, 10);
      increment = type === 'inc' ? 1 : -1;
    }

    const nextValue = Math.max(existingValue + increment, 0);
    const newValue = value.replace(
      existingValue.toString(),
      nextValue.toString()
    );

    setValue(newValue);
    SetValue(newValue, path, mjmlJson, setMjmlJson);
  }
};

const SetValue = (
  valueToSet: string,
  path: string,
  mjmlJson: any,
  setMjmlJson: (arg: any) => void
) => {
  const item = _.get(mjmlJson, path);
  if (item?.attributes) {
    item.attributes[ATTRIBUTE] = valueToSet;
    const updated = _.set(mjmlJson, path, item);
    setMjmlJson({ ...updated });
  }
};

export { LineHeight };
