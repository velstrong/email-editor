import { Scrollbars } from 'react-custom-scrollbars-2';
import { Align } from '../../Components/Mods/Align';
import { Background } from '../../Components/Mods/Background';
import { Border } from '../../Components/Mods/Border';
import { BorderRadius } from '../../Components/Mods/BorderRadius';
import { ContainerBackground } from '../../Components/Mods/ContainerBackground';
import { Content } from '../../Components/Mods/Content';
import { CordinalBorder } from '../../Components/Mods/CordinalBorder';
import { FontSize } from '../../Components/Mods/FontSize';
import { Img } from '../../Components/Mods/Img';
import { InnerPadding } from '../../Components/Mods/InnerPadding';
import { Link } from '../../Components/Mods/Link';
import { Padding } from '../../Components/Mods/Paddings';
import { Height, Width } from '../../Components/Mods/WidthHeight';
import styled from 'styled-components';
import css from './Editor.module.scss';
import { Drawer, Tabs, Tab, Box } from '@mui/material';
import { ColumnSelector } from '../../Components/ColumnSelector';
import { FontFamily } from '../../Components/Mods/FontFamily';
import { UNDOREDO } from '../../Utils/undoRedo';
import { useEditor } from '../../Hooks/Editor.hook';
import { VerticalAlign } from '../../Components/Mods/VerticalAlign';
import { BackgroundImage } from '../../Components/Mods/BackgroundImage';
import { ColumnAttributes } from '../../Components/ColumnAttributes';
import { useHtmlWrapper } from '../../Hooks/Htmlwrapper.hook';
import { useEffect, useRef, useState } from 'react';
import { LineHeight } from '../../Components/Mods/LineHeight';
import { BodyAttributes } from '../../Components/BodyAttributes';

const { TabPane } = Tabs;



const CustomTabs = styled(Tabs)`
  height: 100%;

  .MuiTabs-flexContainer {
    height: 100%;
  }

  .MuiTab-root {
    padding: 8px 16px;
    min-height: unset;
    font-size: 12px;
  }
`;


export const Attributes = () => {
  const { mjmlJson } = useEditor();
  const { active } = useHtmlWrapper();
  const [isColumn, setIsColumn] = useState(false);
  const [tab, setTab] = useState(1);

  useEffect(() => {
    if (active?.className?.includes('mj-column')) {
      setIsColumn(true);
    } else {
      setIsColumn(false);
    }
  }, [active]);

  return (
    <Box sx={{ height: '100%', display: 'flex' }}>
      <CustomTabs
        orientation="vertical"
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{ borderLeft: 1, borderColor: 'divider' }}
      >
        <Tab label="layout" />
        <Tab
          label={
            <>
              layout <br /> config
            </>
          }
        />
        <Tab
          label={
            <>
              body <br /> config
            </>
          }
        />
      </CustomTabs>

      <Box sx={{ flex: 1 }}>
        {tab === 0 && (
          <Scrollbars style={{ height: '100%' }} autoHide>
            <div className={css.columns}>
              <ColumnSelector />
            </div>
          </Scrollbars>
        )}

        {tab === 1 && (
          <Scrollbars style={{ height: '100%' }} autoHide>
            <ColumnAttributes />
          </Scrollbars>
        )}

        {tab === 2 && (
          <Scrollbars style={{ height: '100%' }} autoHide>
            <BodyAttributes />
          </Scrollbars>
        )}
      </Box>
    </Box>
  );
};


export const OnlyAttributesDrawer = () => {
  const { mjmlJson } = useEditor();
  const { active } = useHtmlWrapper();
  const [isDisabled, setIsDisabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (active && !init) setInit(true);

    if (
      active?.className?.includes('mj-column') ||
      active?.className?.includes('mj-body')
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [active]);

  useEffect(() => {
    setVisible(!isDisabled && !!active);
  }, [isDisabled, active]);

  if (!init) return null;

  return (
    <Drawer
      open={visible}
      onClose={() => setVisible(false)}
      anchor="right"
      variant="persistent"
      PaperProps={{
        sx: {
          width: '100%',
          position: 'absolute',
        },
      }}
    >
      <Box sx={{ textAlign: 'center', p: 1 }}>
        <span>Attributes</span>
      </Box>

      <Scrollbars style={{ height: '100%' }} autoHide>
        <div
          className={css.mods}
          onMouseDown={() => UNDOREDO.newAction(mjmlJson)}
          onBlur={() => UNDOREDO.newAction(mjmlJson)}
        >
          <Width />
          <Height />
          <Align />
          <VerticalAlign />
          <Content />
          <LineHeight />
          <FontSize />
          <FontFamily />
          <Padding />
          <InnerPadding />
          <ContainerBackground />
          <Background />
          <BackgroundImage />
          <Border />
          <Border label="Border Width" attribute_name="border-width" />
          <Border label="Border Style" attribute_name="border-style" />
          <Background label="Border Color" overrideAttribute="border-color" />
          <CordinalBorder />
          <BorderRadius />
          <Link />
          <Img />
        </div>
      </Scrollbars>
    </Drawer>
  );
};

