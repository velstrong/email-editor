import { CKEditor } from '@ckeditor/ckeditor5-react';
import {useState} from 'react';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
//import ED from 'ckeditor5-custom-build/build/ckeditor';
import { useEffect, useMemo } from 'react';
import { useCkeditor } from '../../Hooks/Ckeditor.hook';
import { useEditor } from '../../Hooks/Editor.hook';
import { useHtmlWrapper } from '../../Hooks/Htmlwrapper.hook';
import { Remove, Copy as CopyOperation } from '../../Utils/operations';
import { findTextNode } from '../../Utils/findTextNode';
import Quill from 'quill';
import { useQuillEditor } from '../../Hooks/Quill.hook';
import { findUniqueIdentifier } from '../../Utils/closestParent';
import { findElementInJson } from '../../Utils/findElementInMjmlJson';
import _ from 'lodash';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import { useUniqueIdGenerator } from '../../Hooks/Drag.hook';
import { logger } from '../../Utils/logger';

export const Editor = () => {
  const { ref, isActive, x, y, delActive, delX, delY, setDelActive, copy } = useCkeditor();
  const { mjmlJson, setMjmlJson } = useEditor();
  const { active, setActive } = useHtmlWrapper();
  const { QuillActive, quillX, quillY, setQuillEditor, setQuillActive } = useQuillEditor();
  let { quillEditor } = useQuillEditor();
  const { copyActive, setCopyActive, copyX, copyY } = copy;
  const { getId } = useUniqueIdGenerator();


  useEffect(() => {
    if (quillEditor) {
      const identifier = findUniqueIdentifier(active, active.classList);
      quillEditor.on('text-change', () => {
        const change = quillEditor.container.firstChild.innerHTML;
        logger.log(change);
        if (identifier) {
          let position = findElementInJson(mjmlJson, identifier);
          if (position) {
            let [, path] = position;
            let item = _.get(mjmlJson, path.slice(1));
            item.content = change;
            const updated = _.set(mjmlJson, path.slice(1), item);
            setMjmlJson({ ...updated });
          }
        }
      });
    }
    return () => quillEditor && quillEditor.off('text-change');
  }, [quillEditor]);

  useEffect(() => {
    if (active && QuillActive) {
      let textNode = findTextNode(active);

      if (quillEditor) {
        // previous instance listeners
        quillEditor.off('text-change');
      }

      if (textNode) {
        // fix for QuillWrapper keeps wrapping up an extra div on init
        while (textNode.parentElement.classList.contains('ql-container') || textNode.hasAttribute('data-gramm')) {
          textNode = textNode.parentElement;
        }
        if (textNode.classList.contains('ql-container')) {
          textNode.classList.remove('ql-container');
          textNode.classList.remove('ql-snow');
        }

        let lquill: any = new Quill(textNode, { theme: 'snow', modules: { toolbar: '#toolbarContainer' } });

        // fix for allowing multiple instances,
        // on how it works refer, 'https://github.com/quilljs/quill/blob/develop/modules/toolbar.js'
        // pain \u{1F63F}
        lquill.getModule('toolbar').container.childNodes.forEach((element: any) => {
          const clone = element.cloneNode(true);
          element.parentNode.replaceChild(clone, element);
        });

        let toolbar = lquill.getModule('toolbar');

        toolbar.container.childNodes.forEach((input: any) => {
          toolbar.attach(input);
        }, toolbar);

        setQuillEditor(lquill);
        lquill.editor.scroll.domNode.classList.remove('ql-editor');

        // remove clipboard and tooltip
        lquill.container.children[1].remove();
        lquill.container.children[1].remove();
        lquill = undefined;
      }
    }
  }, [active]);

  const deleteConfirm = useMemo(
    () => () => {
      if (active) {
        // setQuillActive(false);
        Remove({ target: active, mjmlJson, setMjmlJson, setDelActive, setActive, setCopyActive });
        setOpen(true);
      }
    },
    [active]
  );

  const copyAction = () => {
    if (active) {
      CopyOperation({
        mjmlJson,
        setActive,
        setMjmlJson,
        setCopyActive,
        setDelActive,
        target: active,
        uidGenerator: getId,
      });
    }
  };

  return (
    <>
      {/* <div
        id="toolbarContainer"
        style={{
          visibility: QuillActive ? 'visible' : 'hidden',
          backgroundColor: '#fff',
          zIndex: 99,
          position: 'fixed',
          left: `${quillX}px`,
          top: `${quillY}px`,
        }}
      >
        <button className="ql-bold"></button>
        <button className="ql-italic"></button>
        <button className="ql-underline"></button>
        <button className="ql-script" value="sub"></button>
        <button className="ql-script" value="super"></button>
      </div> */}

      {/* <div
        key="editorContainer"
        id="editorContainer"
        ref={ref}
        style={{ display: isActive ? 'block' : 'none', position: 'fixed', left: `${x}px`, top: `${y}px` }}
      >
        <div key="editor">
          <CKEditor
            editor={ED}
            disabled={false}
            config={{
              toolbar: [
                'fontSize',
                'fontColor',
                'FontFamily',
                'FontBackgroundColor',
                '|',
                'heading',
                '|',
                'bold',
                'italic',
                '|',
                'undo',
                'redo',
                'insertTable',
              ],
            }}
            data={'placement'}
            onReady={(editor) => {}}
            onChange={(event, editor) => {}}
            onBlur={(event, editor) => {}}
            onFocus={(event, editor) => {}}
          />
        </div>
      </div> */}
      <Delete
        style={{
          zIndex: 200,
          display: delActive ? 'block' : 'none',
          position: 'fixed',
          left: `${delX}px`,
          top: `${delY}px`,
        }}
        deleteConfirm={deleteConfirm}
      />
      <Copy
        onClick={copyAction}
        style={{
          zIndex: 200,
          display: copyActive ? 'block' : 'none',
          position: 'fixed',
          left: `${copyX}px`,
          top: `${copyY}px`,
        }}
      />
    </>
  );
};

interface DeleteProps {
  style: any;
  deleteConfirm: () => void;
}


const Delete = ({ style, deleteConfirm }: DeleteProps) => {
    const [open, setOpen] = useState(false);
 const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        startIcon={<DeleteIcon />}
        variant='contained'
        style={style}
        onClick={() => setOpen(true)}
      >
        
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone. Are you sure you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button startIcon={<DeleteIcon />} variant='contained' onClick={deleteConfirm} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
   </>
  );
};

interface CopyProps {
  style: any;
  onClick: () => void;
}

const Copy = ({ style, onClick }: CopyProps) => {
  return <Button startIcon={<ContentCopyIcon />} variant='contained' style={style} onClick={onClick} type="primary"></Button>;
};
