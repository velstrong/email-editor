import _ from 'lodash';
import { ChangeEvent, useEffect, useState } from 'react';
import { useEditor } from '../../Hooks/Editor.hook';
import { Box, Grid, TextField, InputAdornment } from '@mui/material';
import { useValue, useVisibility } from '../../Hooks/Attribute.hook';

const ATTRIBUTE = 'href';

const Link = () => {
  const [visible, path] = useVisibility({ attribute: ATTRIBUTE });
  const { mjmlJson, setMjmlJson } = useEditor();
  const { getValue } = useValue({ path, visible, attribute: ATTRIBUTE });
  const [value, setValue] = useState('');

  useEffect(() => {
    if (visible) {
      setValue(getValue());
    }
  }, [visible, path, getValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (path && visible) {
      setValueInState(newValue);
    }
  };

  const setValueInState = (userValue: string) => {
    const element = _.get(mjmlJson, path);
    element.attributes[ATTRIBUTE] = userValue;
    const json = _.set(mjmlJson, path, element);
    setMjmlJson({ ...json });
  };

  // If URL does not contain protocol, add https:// on blur
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target?.value) {
      const url = addHttps(e.target.value);
      setValueInState(url);
      setValue(url);
    }
  };

  if (!visible) return null;

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {ATTRIBUTE}
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const addHttps = (url: string) => {
  let value = url.trim();
  if (value && !value.startsWith('http://') && !value.startsWith('https://')) {
    value = `https://${value}`;
  }
  return value;
};

export { Link, addHttps };
