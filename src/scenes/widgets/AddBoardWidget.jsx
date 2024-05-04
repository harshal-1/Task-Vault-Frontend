import { Divider, InputBase, useTheme, Button } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import WidgetWrapper from 'components/WidgetWrapper';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBoards } from 'state';

const AddBoardWidget = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [name, setName] = useState('');

  const handleAddBoard = async () => {
    await fetch(`https://task-vault-backend-production.up.railway.app/boards/${_id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
      }),
    });

    const response = await fetch(
      `https://task-vault-backend-production.up.railway.app/boards/${_id}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    dispatch(setBoards({ boards: data }));

    setName('');
  };

  return (
    <WidgetWrapper >
      <FlexBetween gap="1.5rem">
        <InputBase
          placeholder="Enter the name of  the Board"
          onChange={(e) => setName(e.target.value)}
          value={name}
          sx={{
            width: '100%',
            backgroundColor: palette.neutral.light,
            borderRadius: '2rem',
            padding: '1rem 2rem',
          }}
        />
      </FlexBetween>

      <Divider sx={{ margin: '1.25rem 0' }} />

      <FlexBetween>
        <Button
          disabled={!name}
          onClick={handleAddBoard}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: '3rem',
          }}
        >
          Create Board
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default AddBoardWidget;
