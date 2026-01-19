import { FormControl, Select,InputLabel,MenuItem } from '@mui/material';
import _ from 'lodash';
import { useValue, useVisibility } from '../../Hooks/Attribute.hook';
import { useEditor } from '../../Hooks/Editor.hook';
import { useFonts } from '../../Hooks/useFonts';

const ATTRIBUTE = 'font-family';

export const FontFamily = () => {
  const [visible, path] = useVisibility({ attribute: ATTRIBUTE });
  const { mjmlJson, setMjmlJson } = useEditor();
  const { getValue } = useValue({ path, visible, attribute: ATTRIBUTE });
  const [fontlist, fontvalue] = useFonts();

  const handleChange = (value: string) => {
    if (visible && path) {
      let item = _.get(mjmlJson, path);
      if (item) {
        item.attributes['font-family'] = value;
        const updated = _.set(mjmlJson, path, item);
        if (updated) {
          setMjmlJson({ ...updated });
        }
      }
    }
  };

  let value = '';

  if (visible && path) {
    value = getValue();
    if (value && value.indexOf(',') > -1) {
      value = value.split(',')[0];
    }
  }

  return visible ? (
    <FormControl fullWidth>
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        Font Family
      </InputLabel>
      <Select muiSkipListHighlight="true" value={fontvalue} onChange={handleChange}>
        {fontlist.map((name: string) => {
          return (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  ) : null;
};
