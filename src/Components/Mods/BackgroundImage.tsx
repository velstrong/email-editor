import { Grid,FormControl, FormLabel,FormGroup ,Input } from '@mui/material';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useVisibility } from '../../Hooks/Attribute.hook';
import { useEditor } from '../../Hooks/Editor.hook';
import { useHtmlWrapper } from '../../Hooks/Htmlwrapper.hook';

const URL = 'background-url';
const SIZE = 'background-size';
const REPEAT = 'background-repeat';

const BackgroundImage = () => {
  const [url, setUrl] = useState<string>('');
  const [size, setSize] = useState<string>('');
  const [repeat, setRepeat] = useState<string>('');
  const { mjmlJson, setMjmlJson } = useEditor();

  const [urlVisibility, urlPath] = useVisibility({ attribute: URL });
  const [sizeVisibility, sizePath] = useVisibility({ attribute: SIZE });
  const [repeatVisiblity, repeatPath] = useVisibility({ attribute: REPEAT });

  useEffect(() => {
    if (mjmlJson) {
      if (urlVisibility) {
        const item = _.get(mjmlJson, urlPath);
        item && setUrl(item.attributes[URL]);
      }
      if (sizeVisibility) {
        const item = _.get(mjmlJson, sizePath);
        item && setSize(item.attributes[SIZE]);
      }
      if (repeatVisiblity) {
        const item = _.get(mjmlJson, repeatPath);
        item && setRepeat(item.attributes[REPEAT]);
      }
    }
  }, [urlVisibility, sizeVisibility, repeatVisiblity]);

  if (urlVisibility === false && sizeVisibility === false && repeatVisiblity === false) {
    return null;
  }

  const onChangeUrl = (e: any) => {
    setUrl(e.target.value);
    if (urlVisibility && urlPath && e.target.value) {
      let item = _.get(mjmlJson, urlPath);
      if (item && item.attributes) {
        item.attributes[URL] = e.target.value;
        const updated = _.set(mjmlJson, urlPath, item);
        setMjmlJson({ ...updated });
      }
    }
  };

  const onChangeSize = (e: any) => {
    setSize(e.target.value);
    if (sizeVisibility && sizePath && e.target.value) {
      let item = _.get(mjmlJson, urlPath);
      if (item && item.attributes) {
        item.attributes[SIZE] = e.target.value;
        const updated = _.set(mjmlJson, sizePath, item);
        setMjmlJson({ ...updated });
      }
    }
  };

  const onChangeRepeat = (e: any) => {
    setRepeat(e.target.value);
    if (repeatVisiblity && repeatPath && e.target.value) {
      let item = _.get(mjmlJson, urlPath);
      if (item && item.attributes) {
        item.attributes[REPEAT] = e.target.value;
        const updated = _.set(mjmlJson, repeatPath, item);
        setMjmlJson({ ...updated });
      }
    }
  };

  return (
    <FormControl fullWidth style={{ marginBottom: '8px' }}>
      <FormLabel id="background-image-label">Background Image:</FormLabel>
      <FormGroup>
        <Grid container spacing={1}>
          {urlVisibility ? (
            <Grid item xs={12}>
              <Input addonBefore="url" onChange={onChangeUrl} value={url} />
            </Grid>
          ) : null}
          {sizeVisibility ? (
            <Grid item xs={12}>
              <Input
                addonBefore="size"
                onChange={onChangeSize}
                value={size}
                placeholder="px/percent/'cover'/'contain'"
              />
            </Grid>
          ) : null}
          {repeatVisiblity ? (
            <Grid item xs={12}>
              <Input addonBefore="repeat" onChange={onChangeRepeat} value={repeat} placeholder="repeat" />
            </Grid>
          ) : null}
        </Grid>
      </FormGroup>
    </FormControl>
  );
};

export { BackgroundImage };
