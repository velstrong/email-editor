import { Box, Grid, TextField, InputAdornment } from '@mui/material';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useEditor } from '../../Hooks/Editor.hook';

interface TitleProps {
  itemIndex: number;
}

const Title = ({ itemIndex: index }: TitleProps) => {
  const [value, setValue] = useState<string | undefined>();
  const { mjmlJson, setMjmlJson } = useEditor();

  useEffect(() => {
    if (index !== -1) {
      const titleConfig = mjmlJson.children[0].children[index];
      if (titleConfig?.content) {
        setValue(titleConfig.content);
      }
    }
  }, [index, mjmlJson]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (index !== -1) {
      setValue(e.target.value);
    }
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (index !== -1) {
      const titleConfig = _.cloneDeep(mjmlJson.children[0].children[index]);
      if (titleConfig) {
        titleConfig.content = e.target.value;
        const update = _.set(
          mjmlJson,
          `children[0].children[${index}]`,
          titleConfig
        );
        setMjmlJson({ ...update });
      }
    }
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            value={value || ''}
            onChange={handleChange}
            onBlur={onBlur}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  title
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export { Title };
