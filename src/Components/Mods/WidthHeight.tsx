import _ from 'lodash';
import { useEditor } from '../../Hooks/Editor.hook';
import { Box, TextField, Typography } from '@mui/material';
import { useValue, useVisibility } from '../../Hooks/Attribute.hook';
import { useEffect, useState } from 'react';

const ATTRIBUTE = 'width';

interface WidthHeightProps {
  activePath?: string;
}

export const Width = ({ activePath }: WidthHeightProps) => {
  const [visible, path] = useVisibility({
    attribute: ATTRIBUTE,
    customPath: activePath,
  });

  const { mjmlJson, setMjmlJson } = useEditor();
  const [value, setValue] = useState<string>('');
  const { getValue } = useValue({ path, visible, attribute: ATTRIBUTE });

  useEffect(() => {
    if (visible) {
      setValue(getValue());
    }
  }, [visible, getValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    setValue(newValue);

    if (newValue === '' || newValue === '%') {
      newValue = '0';
    }

    if (visible && path && newValue) {
      const element = _.get(mjmlJson, path);
      element.attributes[ATTRIBUTE] = newValue;
      const json = _.set(mjmlJson, path, element);
      setMjmlJson({ ...json });
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length === 1 && e.key === 'Backspace') {
      e.currentTarget.value = '';
    }
  };

  if (!visible) return null;

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        Width
      </Typography>
      <TextField
        fullWidth
        size="small"
        value={value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
      />
    </Box>
  );
};

const ATTRIBUTE_HEIGHT = 'height';

export const Height = () => {
  const [visible, path] = useVisibility({ attribute: ATTRIBUTE_HEIGHT });
  const { mjmlJson, setMjmlJson } = useEditor();
  const { getValue } = useValue({
    path,
    visible,
    attribute: ATTRIBUTE_HEIGHT,
  });
  const [value, setValue] = useState('');

  useEffect(() => {
    if (visible) {
      setValue(getValue());
    }
  }, [visible, getValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    setValue(newValue);

    if (newValue === '' || newValue === '%') {
      newValue = '';
    }

    if (visible && path && newValue) {
      const element = _.get(mjmlJson, path);
      element.attributes[ATTRIBUTE_HEIGHT] = newValue;
      const json = _.set(mjmlJson, path, element);
      setMjmlJson({ ...json });
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length === 1 && e.key === 'Backspace') {
      e.currentTarget.value = '';
    }
  };

  if (!visible) return null;

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        Height
      </Typography>
      <TextField
        fullWidth
        size="small"
        value={value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
      />
    </Box>
  );
};
