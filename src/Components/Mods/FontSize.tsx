import { useValue, useVisibility } from '../../Hooks/Attribute.hook';
import { FormControl, TextField,InputLabel } from '@mui/material';
import { useEditor } from '../../Hooks/Editor.hook';
import { ChangeEvent } from 'react';
import _ from 'lodash';

const ATTRIBUTE = 'font-size';

export const FontSize = () => {
  const [visible, path] = useVisibility({ attribute: ATTRIBUTE });
  const { mjmlJson, setMjmlJson } = useEditor();
  const { getValue } = useValue({ path, visible, attribute: ATTRIBUTE });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    if (path && visible) {
      let json = {};
      let element = _.get(mjmlJson, path);
      element.attributes[ATTRIBUTE] = value;
      json = _.set(mjmlJson, path, element);
      setMjmlJson({ ...json });
    }
  };

  return visible ? (
    <FormControl fullWidth>
        <TextField label="Font Size" id="font-size" onChange={handleChange} value={getValue()} />
    </FormControl>
  ) : null;
};
