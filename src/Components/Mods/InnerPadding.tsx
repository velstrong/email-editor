import _ from 'lodash';
import { ChangeEvent, useEffect, useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { useVisibility } from '../../Hooks/Attribute.hook';
import { useEditor } from '../../Hooks/Editor.hook';
import { logger } from '../../Utils/logger';
import { UpdateValue } from '../../Utils/operations';

const ATTRIBUTE = 'inner-padding';

const InnerPadding = () => {
  const [visible, path] = useVisibility({ attribute: ATTRIBUTE });
  const { mjmlJson, setMjmlJson } = useEditor();
  const [value, setValue] = useState<string>();

  useEffect(() => {
    if (visible && path) {
      const item = _.get(mjmlJson, path);
      if (item?.attributes?.[ATTRIBUTE]) {
        setValue(item.attributes[ATTRIBUTE]);
      }
    }
  }, [visible, path, mjmlJson]);

  useEffect(() => {
    if (value) {
      UpdateValue({
        visible,
        path,
        mjmlJson,
        setMjmlJson,
        value,
        attribute: ATTRIBUTE,
      });
    }
  }, [value, visible, path, mjmlJson, setMjmlJson]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    logger.log('inner padding value', newValue);
    if (path && visible) {
      setValue(newValue);
    }
  };

  if (!visible) return null;

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        Inner Padding :
      </Typography>
      <TextField
        fullWidth
        size="small"
        type="text"
        value={value || ''}
        onChange={handleChange}
      />
    </Box>
  );
};

export { InnerPadding };
