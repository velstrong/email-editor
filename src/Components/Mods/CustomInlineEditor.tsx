import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import {
  Button,
  TextField,
  Popover,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import {
  FormatSizeOutlined,
  FormatBoldOutlined,
  FormatItalicOutlined,
  FormatUnderlinedOutlined,
  GradientOutlined,
  LinkOutlined,
} from '@mui/icons-material';

import { useCustomEditorPosition, useCustomEditorStatus } from '../../Hooks/CustomEditor.hook';
import { useEditor } from '../../Hooks/Editor.hook';
import { useHtmlWrapper } from '../../Hooks/Htmlwrapper.hook';
import { InlineEditorActions } from '../../Utils/inlineEditorActions';
import { ColorPicker } from '../ColorPicker';
import { findClosestParent, findUniqueIdentifier } from '../../Utils/closestParent';
import { findElementInJson } from '../../Utils/findElementInMjmlJson';
import { useFonts } from '../../Hooks/useFonts';
import { logger } from '../../Utils/logger';
import { addHttps } from './Link';

let r: any;

const restoreSelection = () => {
  const sel = window.getSelection();
  if (!sel || !r) return;
  sel.removeAllRanges();
  sel.addRange(r);
};

const InlineEditor = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { x, y } = useCustomEditorPosition();
  const { active } = useCustomEditorStatus();
  const { active: activeElement }: { active: HTMLDivElement } = useHtmlWrapper();
  const { mjmlJson, setMjmlJson } = useEditor();
  const [fontlist] = useFonts();

  useEffect(() => {
    if (ref.current) {
      const toolbar = ref.current.querySelectorAll('.MuiSelect-select');
      toolbar.forEach((item) =>
        item.addEventListener('mousedown', ResetEventBehaviour)
      );
      return () =>
        toolbar.forEach((item) =>
          item.removeEventListener('mousedown', ResetEventBehaviour)
        );
    }
  }, []);

  useEffect(() => {
    if (active && activeElement) {
      const uniqueIdentifier = findUniqueIdentifier(activeElement, activeElement.classList);
      if (uniqueIdentifier?.includes('mj-text')) {
        const editor: HTMLElement = activeElement.children[0].children[0] as any;

        const onFocusOut = () => {
          stateChangeCallback(editor, mjmlJson, setMjmlJson);
        };

        const onKeyUp = () => {
          r = window.getSelection()?.getRangeAt(0);
        };

        editor.addEventListener('focusout', onFocusOut, true);
        editor.addEventListener('keyup', onKeyUp);
        editor.addEventListener('click', onKeyUp);

        editor.classList.add('editor-active');
        editor.setAttribute('contentEditable', 'true');
        editor.setAttribute('spellcheck', 'false');

        return () => {
          editor.removeEventListener('focusout', onFocusOut, true);
          editor.removeEventListener('keyup', onKeyUp);
          editor.removeEventListener('click', onKeyUp);
        };
      }
    }
  }, [activeElement, mjmlJson]);

  return (
    <Box
      ref={ref}
      id="customtoolbar"
      onMouseDown={ResetEventBehaviour}
      sx={{
        display: active ? 'flex' : 'none',
        position: 'fixed',
        top: `${y}px`,
        left: `${x}px`,
        gap: 0.5,
        padding: '4px 8px',
        border: '1px solid black',
        backgroundColor: '#fff',
        zIndex: 999,
      }}
    >
      {/* Font size */}
      <Select
        size="small"
        defaultValue={2}
        onChange={(e) => InlineEditorActions(null, 'size', e.target.value)}
        sx={{ fontSize: '12px' }}
      >
        {Array.from({ length: 7 }).map((_, i) => (
          <MenuItem
            key={i}
            value={i + 1}
            onMouseDown={ResetEventBehaviour}
          >
            {i + 1}
          </MenuItem>
        ))}
      </Select>

      {/* Font family */}
      <Select
        size="small"
        defaultValue="Ubuntu"
        onChange={(e) => InlineEditorActions(null, 'fontFamily', e.target.value)}
        sx={{ fontSize: '12px', minWidth: 140 }}
        onMouseDown={ResetEventBehaviour}
      >
        {fontlist.map((font) => (
          <MenuItem
            key={font}
            value={font}
            onMouseDown={ResetEventBehaviour}
          >
            {font}
          </MenuItem>
        ))}
      </Select>

      {/* Font size color */}
      <ColorPopover
        icon={<FormatSizeOutlined />}
        onChange={(color) => InlineEditorActions(null, 'fontColor', color)}
      />

      {/* Text color */}
      <ColorPopover
        icon={<GradientOutlined />}
        onChange={(color) => InlineEditorActions(null, 'color', color)}
      />

      <IconButton icon={<FormatBoldOutlined />} onClick={(e) => InlineEditorActions(e, 'bold')} />
      <IconButton icon={<FormatItalicOutlined />} onClick={(e) => InlineEditorActions(e, 'italics')} />
      <IconButton icon={<FormatUnderlinedOutlined />} onClick={(e) => InlineEditorActions(e, 'underline')} />

      <LinkItem setLinkCallback={(e) => InlineEditorActions(e, 'link')} />
    </Box>
  );
};

/* ---------- helpers ---------- */

const IconButton = ({ icon, onClick }: any) => (
  <Button size="small" onClick={onClick} sx={{ minWidth: 28 }}>
    {icon}
  </Button>
);

const ColorPopover = ({ icon, onChange }: any) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  return (
    <>
      <Button size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
        {icon}
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <ColorPicker handleChange={onChange} mouseDown={false} />
      </Popover>
    </>
  );
};

interface LinkItemProps {
  setLinkCallback: (e: any) => void;
}

const LinkItem = ({ setLinkCallback }: LinkItemProps) => {
  const [active, setActive] = useState(false);
  const [link, setLink] = useState('');

  return (
    <>
      <Button
        size="small"
        onClick={(e) => {
          ResetEventBehaviour(e);
          setActive(true);
          setLink('');
        }}
      >
        <LinkOutlined />
      </Button>

      <Popover
        open={active}
        onClose={() => setActive(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{ display: 'flex', gap: 1, p: 1 }}>
          <TextField
            size="small"
            value={link}
            placeholder="link"
            onMouseDown={restoreSelection}
            onChange={(e) => setLink(e.target.value)}
          />
          <Button
            variant="outlined"
            onClick={() => {
              setActive(false);
              restoreSelection();
              document.execCommand(
                'insertHTML',
                false,
                `<a href="${addHttps(link)}" target="_blank">${document.getSelection()}</a>`
              );
            }}
          >
            create
          </Button>
        </Box>
      </Popover>
    </>
  );
};

/* ---------- unchanged helpers ---------- */

const stateChangeCallback = (item: any, mjmlJson: any, setMjmlJson: any) => {
  const closestParent = findClosestParent(item);
  if (!closestParent) return;

  if (closestParent.includes('mj-text')) {
    const find = findElementInJson(mjmlJson, closestParent);
    if (find) {
      const [, path] = find;
      const update = _.cloneDeep(_.get(mjmlJson, path.slice(1)));
      update.content = item.innerHTML;
      setMjmlJson({ ..._.set(mjmlJson, path.slice(1), update) });
    }
  }
};

export const ResetEventBehaviour = (e: any) => {
  if (
    e.target?.tagName === 'INPUT' &&
    e.target.className?.includes('inline-editor-link')
  ) {
    return;
  }
  e.preventDefault();
  e.stopPropagation();
  return false;
};

export { InlineEditor };
