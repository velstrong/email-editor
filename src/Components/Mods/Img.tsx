import _ from 'lodash';
import { ChangeEvent } from 'react';
import { useEditor } from '../../Hooks/Editor.hook';
import { Grid, TextField, InputAdornment } from '@mui/material';
import { useValue, useVisibility } from '../../Hooks/Attribute.hook';

const ATTRIBUTE = 'src';

const Img = () => {
  const [visible, path] = useVisibility({ attribute: ATTRIBUTE });
  const { mjmlJson, setMjmlJson } = useEditor();

  const { getValue } = useValue({ path, visible, attribute: ATTRIBUTE });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    if (path && visible) {
      const element = _.get(mjmlJson, path);
      element.attributes[ATTRIBUTE] = value;
      const json = _.set(mjmlJson, path, element);
      setMjmlJson({ ...json });
    }
  };

  if (!visible) return null;

  return (
    <Grid container>
      <Grid item xs={12}>
        <TextField
          fullWidth
          size="small"
          value={getValue()}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                src
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
};

export { Img };
