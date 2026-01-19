import { UndoOutlined, RedoOutlined } from '@mui/icons-material';
import { Button, Tooltip } from '@mui/material';
import { UNDOREDO } from '../Utils/undoRedo';

interface UndoRedoProps {
  undoCallback: () => void;
  redoCallback: () => void;
}

const UndoRedo = ({ undoCallback, redoCallback }: UndoRedoProps) => {
  return (
    <div
      style={{
        position: 'fixed',
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '4px',
        zIndex: 200,
      }}
    >
      <Tooltip mouseEnterDelay={0.5} color="cyan" title="undo" placement="right">
        <Button
        variant='outlined'
          disabled={UNDOREDO.isUndoEmpty()}
          onClick={undoCallback}
          type="default"
          size="large"
          style={{ background: '#fff' }}
          startIcon={<UndoOutlined />}
        />
      </Tooltip>

      <Tooltip mouseEnterDelay={0.5} color="cyan" title="redo" placement="right">
        <Button
          variant='outlined'
          disabled={UNDOREDO.isRedoEmpty()}
          onClick={redoCallback}
          type="default"
          style={{ background: '#fff' }}
          size="large"
          startIcon={<RedoOutlined />}
        />
      </Tooltip>
    </div>
  );
};

export { UndoRedo };
