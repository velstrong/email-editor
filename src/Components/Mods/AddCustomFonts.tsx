import { Button, Grid, Input, Popover, Tooltip,FormControl } from '@mui/material';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useEditor } from '../../Hooks/Editor.hook';

const AddCustomFonts = () => {
  const { mjmlJson, setMjmlJson } = useEditor();
  const [fonts, setFonts] = useState([]);
  const [addFontActive, setAddFontActive] = useState(false);

  useEffect(() => {
    if (mjmlJson) {
      const head = mjmlJson.children[0];
      if (head && head.children) {
        const _fonts = head.children.filter((item: any) => item && item.tagName && item.tagName.includes('font'));
        if (_fonts.length > 0 && _fonts.lenght !== fonts.length) {
          setFonts(_fonts);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (mjmlJson) {
      const head = mjmlJson.children[0];
      if (head && head.children) {
        const _fonts = head.children.filter((item: any) => item && item.tagName && item.tagName.includes('font'));
        if (_fonts.length > 0 && _fonts.lenght !== fonts.length) {
          setFonts(_fonts);
        }
      }
    }
  }, [mjmlJson]);

  const handleRemove = (fontName: string) => {
    let head = _.cloneDeep(mjmlJson.children[0]);
    if (head && head.children) {
      const filteredfonts = head.children.filter((item: any) => {
        if (item && item.tagName && item.tagName.includes('font')) {
          return item.attributes.name !== fontName;
        }
        return true;
      });
      head.children = filteredfonts;
      setFonts(filteredfonts);
      const updated = _.set(mjmlJson, 'children[0]', head);
      if (updated) {
        setFonts(head.children.filter((item: any) => item && item.tagName && item.tagName.includes('font')));
        setMjmlJson({ ...updated });
      }
    }
  };

  const handleAddFont = (name: string, href: string) => {
    if (mjmlJson) {
      let head = _.cloneDeep(mjmlJson.children[0]);
      if (head && head.children) {
        head.children.push({
          tagName: 'mj-font',
          attributes: {
            name,
            href,
          },
        });

        const updated = _.set(mjmlJson, 'children[0]', head);
        if (updated) {
          setFonts(head.children.filter((item: any) => item && item.tagName && item.tagName.includes('font')));
          setMjmlJson({ ...updated });
        }
      }
    }
  };

  return (

      <Grid container>
        <Grid
          item
          xs={24}
          style={{ justifyContent: 'center', paddingBottom: '24px', display: 'flex', rowGap: '6px', flexWrap: 'wrap' }}
        >
          {fonts &&
            fonts.length > 0 &&
            fonts.map((font: any, index) =>
              font.attributes && font.attributes.href && font.attributes.name ? (
                <Tooltip key={index} title={font.attributes.href}>
                  <Tag closable onClose={() => handleRemove(font.attributes.name)}>
                    {font.attributes.name}
                  </Tag>
                </Tooltip>
              ) : null
            )}
        </Grid>
        <Grid item xs={24} style={{ textAlign: 'center' }}>
          <Popover
            visible={addFontActive}
            trigger="click"
            placement="bottom"
            content={<GetFontsValue addCustomFontClick={handleAddFont} popOverCallBacK={setAddFontActive} />}
          >
            <Button onClick={(e) => setAddFontActive(!addFontActive)}>Add custom font</Button>
          </Popover>
        </Grid>
      </Grid>

  );
};

const FontInputContainer = styled.div`
  .ant-form-item {
    margin-bottom: 8px;
  }
`;

const GetFontsValue = ({
  addCustomFontClick,
  popOverCallBacK,
}: {
  addCustomFontClick: (name: string, href: string) => void;
  popOverCallBacK: (arg: any) => void;
}) => {
  const [fontName, setFontName] = useState('');
  const [fontUrl, setFontUrl] = useState('');
  return (
    <FontInputContainer>
      <FormControl fullWidth style={{ marginBottom: '8px' }}>
        <InputLabel htmlFor="font-name">Name</InputLabel>
        <Input id="font-name" value={fontName} onChange={(e) => setFontName(e.target.value)} />
      </FormControl>
      <FormControl fullWidth style={{ marginBottom: '8px' }}>
        <InputLabel htmlFor="font-url">URL</InputLabel>
        <Input id="font-url" value={fontUrl} onChange={(e) => setFontUrl(e.target.value)} />
      </FormControl>
      <FormControl style={{ textAlign: 'center' }}>
        <Button
          onClick={() => {
            popOverCallBacK(false);
            if (fontName && fontUrl) {
              addCustomFontClick(fontName, fontUrl);
            }
          }}
        >
          add
        </Button>

        <Button
          style={{ marginLeft: '6px' }}
          onClick={() => {
            popOverCallBacK(false);
          }}
        >
          cancel
        </Button>
      </FormControl>
    </FontInputContainer>
  );
};

export { AddCustomFonts };
