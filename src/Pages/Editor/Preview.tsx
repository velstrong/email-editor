import {
  Dialog,
  DialogContent,
  ToggleButton,
  ToggleButtonGroup,
  Box,
} from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';
import './Preview.module.css';

const DESKTOP_WIDTH = '800px';
const MOBILE_WIDTH = '323px';

/* ---------- Styled fullscreen dialog ---------- */

const FullscreenDialog = styled(Dialog)`
  .MuiDialog-paper {
    width: 100%;
    height: 100%;
    max-width: unset;
    margin: 0;
    display: flex;
    flex-direction: column;
  }

  .MuiDialogContent-root {
    flex: 1;
    padding: 0;
    display: flex;
    justify-content: center;
  }
`;

const PreviewMode = styled.div`
  position: absolute;
  bottom: 24px;
  left: 24px;
  z-index: 10;
`;

interface PreviewProps {
  visible: boolean;
  visibleChange: (visible: boolean) => void;
  inframeContent: string;
}

export const Preview = ({
  visible,
  visibleChange,
  inframeContent,
}: PreviewProps) => {
  const [mode, setMode] = useState<'desktop' | 'mobile'>('desktop');

  const onChange = (
    _: React.MouseEvent<HTMLElement>,
    value: 'desktop' | 'mobile' | null
  ) => {
    if (value) {
      setMode(value);
    }
  };

  return (
    <FullscreenDialog
      open={visible}
      onClose={() => visibleChange(false)}
    >
      <PreviewMode>
        <ModeSelect value={mode} onChange={onChange} />
      </PreviewMode>

      <DialogContent>
        {inframeContent ? (
          <iframe
            title="Preview"
            style={{ margin: '0 auto', border: 'none' }}
            width={mode === 'desktop' ? DESKTOP_WIDTH : MOBILE_WIDTH}
            height="100%"
            srcDoc={inframeContent}
          />
        ) : null}
      </DialogContent>
    </FullscreenDialog>
  );
};

/* ---------- Mode selector ---------- */

interface ModeSelectProps {
  onChange: (
    event: React.MouseEvent<HTMLElement>,
    value: 'desktop' | 'mobile' | null
  ) => void;
  value: 'desktop' | 'mobile';
}

const ModeSelect = ({ onChange, value }: ModeSelectProps) => {
  return (
    <Box>
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={onChange}
        size="small"
      >
        <ToggleButton value="desktop">
          desktop
        </ToggleButton>
        <ToggleButton value="mobile">
          mobile
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};
