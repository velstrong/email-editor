import { Button, Grid,Tooltip,FormControl } from '@mui/material';
import _ from 'lodash';
import { ReactNode } from 'react';
import { useVisibility } from '../../Hooks/Attribute.hook';
import { useEditor } from '../../Hooks/Editor.hook';
import { useHtmlWrapper } from '../../Hooks/Htmlwrapper.hook';

const ATTRIBUTE = 'align';

interface AlignOptions {
  title: string;
  prop: string;
  component: ReactNode;
}

const alignOptions: AlignOptions[] = [
  { title: 'Left', prop: 'left', component: null /*<AlignLeftOutlined />*/ },
  { title: 'Justify', prop: 'justify', component: null /*<PicCenterOutlined />*/ },
  { title: 'Center', prop: 'center', component: null /*<AlignCenterOutlined />*/ },
  { title: 'Right', prop: 'right', component: null /*<AlignRightOutlined />*/ },
];

export const Align = () => {
  const [visible, path] = useVisibility({ attribute: ATTRIBUTE });
  const { mjmlJson, setMjmlJson } = useEditor();
  const { active } = useHtmlWrapper();

  const onClick = (align: string) => {
    if (active && visible && path) {
      let item = _.get(mjmlJson, path);
      if (item && item.attributes && item.attributes) {
        item.attributes['align'] = align;
        const updated = _.set(mjmlJson, path, item);
        setMjmlJson({ ...updated });
      }
    }
  };

  return visible ? (
    <Grid container>
      <Grid item xs={3}>
        <FormControl label="Align"></FormControl>
      </Grid>
      <Grid item xs={2}>
        <Grid container justifyContent="space-between">
          {alignOptions.map(({ prop, component, title }, key) => {
            return (
              <Grid item key={key}>
                <Tooltip title={title}>
                  <Button onClick={() => onClick(prop)} type="ghost" icon={component} />
                </Tooltip>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  ) : null;
};
