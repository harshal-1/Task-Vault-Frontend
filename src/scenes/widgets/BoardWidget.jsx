import {
  DeleteOutlineOutlined,
  EditOutlined,
  SaveOutlined,
  CancelOutlined,
  AddOutlined,
} from '@mui/icons-material';
import {
  Box,
  TextField,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import WidgetWrapper from 'components/WidgetWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { setBoards } from 'state';
import { useState } from 'react';
import FlexBetween from 'components/FlexBetween';
import Task from './TaskWidget.jsx';

const BoardWidget = ({ boardId, boardUserId, name, tasks }) => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  const [isEditingBoard, setIsEditingBoard] = useState(false);
  const [updatedName, setUpdatedName] = useState('');

  const [isAddingTask, setIsAddingTask] = useState(false);
  const [desc, setDesc] = useState('');

  const handleEditBoardClick = () => {
    setIsEditingBoard(true);
  };

  const handleSaveUpdateBoardClick = () => {
    updateBoard(updatedName);
    setIsEditingBoard(false);
  };

  const handleCancelUpdateBoardClick = () => {
    setUpdatedName(name);
    setIsEditingBoard(false);
  };

  const handleNameChange = (event) => {
    setUpdatedName(event.target.value);
  };

  const handleAddTaskClick = () => {
    setIsAddingTask(true);
  };

  const handleSaveAddTaskClick = () => {
    addTask(desc);
    setIsAddingTask(false);
  };

  const handleCancelAddTaskClick = () => {
    setDesc(desc);
    setIsAddingTask(false);
  };

  const handleDescChange = (event) => {
    setDesc(event.target.value);
  };

  const addTask = async (desc) => {
    await fetch(`${process.env.REACT_APP_API_URL}/tasks/${boardId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        desc: desc,
      }),
    });

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/boards/${boardUserId}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    dispatch(setBoards({ boards: data }));
  };

  const updateBoard = async (updatedName) => {
    await fetch(`${process.env.REACT_APP_API_URL}/boards/${boardId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: updatedName,
      }),
    });

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/boards/${boardUserId}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    dispatch(setBoards({ boards: data }));
  };

  const deleteBoard = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/boards/${boardId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/boards/${boardUserId}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    dispatch(setBoards({ boards: data }));
  };

  return (
    <WidgetWrapper m="2rem 0">
      {isEditingBoard ? (
        <>
          <TextField
            value={updatedName}
            onChange={handleNameChange}
            fullWidth
          />
          <IconButton onClick={handleSaveUpdateBoardClick}>
            <SaveOutlined />
          </IconButton>
          <IconButton onClick={handleCancelUpdateBoardClick}>
            <CancelOutlined />
          </IconButton>
        </>
      ) : (
        <>
          <FlexBetween>
            <Typography color={main} sx={{ mt: '1rem' }}>
              {name}
            </Typography>
            <FlexBetween>
              {isAddingTask ? (
                // Render component for adding task
                <>
                  <TextField
                    value={desc}
                    onChange={handleDescChange}
                    fullWidth
                  />
                  <IconButton onClick={handleSaveAddTaskClick}>
                    <SaveOutlined />
                  </IconButton>
                  <IconButton onClick={handleCancelAddTaskClick}>
                    <CancelOutlined />
                  </IconButton>
                </>
              ) : (
                // Render buttons for Boards Section
                <>
                  <IconButton onClick={handleAddTaskClick}>
                    <AddOutlined sx={{ color: primary }} />
                  </IconButton>
                  <IconButton onClick={handleEditBoardClick}>
                    <EditOutlined sx={{ color: primary }} />
                  </IconButton>
                  <IconButton onClick={deleteBoard}>
                    <DeleteOutlineOutlined sx={{ color: primary }} />
                  </IconButton>
                </>
              )}
            </FlexBetween>
          </FlexBetween>
        </>
      )}
      <Box mt="0.5rem">
        {tasks?.map((task, i) => (
          <Task key={i} id={task._id} boardId={task.boardId} desc={task.desc} boardUserId={boardUserId}/>
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default BoardWidget;
