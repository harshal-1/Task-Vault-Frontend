import {
  DeleteOutlineOutlined,
  EditOutlined,
  SaveOutlined,
  CancelOutlined,
} from '@mui/icons-material';
import {
  Box,
  Divider,
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

const TaskWidget = ({ i, id, boardId, desc, boardUserId }) => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [updatedDesc, setUpdatedDesc] = useState('');

  const handleEditTaskClick = () => {
    setIsEditingTask(true);
  };

  const handleSaveUpdateTaskClick = () => {
    updateTask(updatedDesc);
    setIsEditingTask(false);
  };

  const handleCancelUpdateTaskClick = () => {
    setUpdatedDesc(updatedDesc);
    setIsEditingTask(false);
  };

  const handleDescChange = (event) => {
    setUpdatedDesc(event.target.value);
  };

  
  const updateTask = async (updatedDesc) => {
    await fetch(`https://task-vault-backend-production.up.railway.app/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        desc: updatedDesc,
      }),
    });

    const response = await fetch(
      `https://task-vault-backend-production.up.railway.app/boards/${boardUserId}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    dispatch(setBoards({ boards: data }));
  };

  const deleteTask = async () => {
    await fetch(`https://task-vault-backend-production.up.railway.app/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await fetch(
      `https://task-vault-backend-production.up.railway.app/boards/${boardUserId}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    dispatch(setBoards({ boards: data }));
  };

  return (
    <Box key={`${i}`}>
      <Divider />
      <WidgetWrapper m="2rem 0">
        {isEditingTask ? (
          <>
            <TextField
              value={updatedDesc}
              onChange={handleDescChange}
              fullWidth
            />
            <IconButton onClick={handleSaveUpdateTaskClick}>
              <SaveOutlined />
            </IconButton>
            <IconButton onClick={handleCancelUpdateTaskClick}>
              <CancelOutlined />
            </IconButton>
          </>
        ) : (
          <>
          <FlexBetween>
            <Typography sx={{ color: main, m: '0.5rem 0', pl: '1rem' }}>
              {desc}
            </Typography>
          <FlexBetween>
            <IconButton onClick={handleEditTaskClick}>
              <EditOutlined sx={{ color: primary }} />
            </IconButton>
            <IconButton onClick={deleteTask}>
              <DeleteOutlineOutlined sx={{ color: primary }} />
            </IconButton>
            </FlexBetween>
            </FlexBetween>
          </>
        )}
      </WidgetWrapper>
    </Box>
  );
};

export default TaskWidget;
