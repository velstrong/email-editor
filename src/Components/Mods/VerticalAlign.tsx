import { Button, Grid, Tooltip, Typography } from '@mui/material';
import { useVisibility } from '../../Hooks/Attribute.hook';
import { useHtmlWrapper } from '../../Hooks/Htmlwrapper.hook';
import { useEditor } from '../../Hooks/Editor.hook';
import _ from 'lodash';

const ATTRIBUTE = 'vertical-align';

interface VerticalAlignProps {
  activePath?: string;
}

export const VerticalAlign = ({ activePath }: VerticalAlignProps) => {
  const [visible, path] = useVisibility({
    attribute: ATTRIBUTE,
    customPath: activePath,
  });
  const { mjmlJson, setMjmlJson } = useEditor();
  const { active } = useHtmlWrapper();

  const onClick = (value: string) => {
    if (active && visible && path) {
      const item = _.get(mjmlJson, path);
      if (item?.attributes) {
        item.attributes[ATTRIBUTE] = value;
        const updated = _.set(mjmlJson, path, item);
        setMjmlJson({ ...updated });
      }
    }
  };

  if (!visible) return null;

  return (
    <Grid container alignItems="center" spacing={2}>
      {/* Label */}
      <Grid item xs>
        <Typography variant="subtitle2">
          Vertical Align
        </Typography>
      </Grid>

      {/* Actions */}
      <Grid item>
        <Grid container spacing={2}>
          <Grid item>
            <Tooltip title="Top">
              <Button variant="text" onClick={() => onClick('top')}>
                Top
              </Button>
            </Tooltip>
          </Grid>

          <Grid item>
            <Tooltip
              placement="left"
              title="Middle : Note: all columns in section must be set to middle, for this to work."
            >
              <Button variant="text" onClick={() => onClick('middle')}>
                Middle
              </Button>
            </Tooltip>
          </Grid>

          <Grid item>
            <Tooltip title="Bottom">
              <Button variant="text" onClick={() => onClick('bottom')}>
                Bottom
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
