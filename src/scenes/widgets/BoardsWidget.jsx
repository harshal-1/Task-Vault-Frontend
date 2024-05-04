import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBoards } from 'state';
import BoardWidget from './BoardWidget.jsx';

const BoardsWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.user.boards);

  const token = useSelector((state) => state.token);

  const getBoards = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/boards/${userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setBoards({ boards: data }));
  };

  useEffect(() => {
    getBoards();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      
        {boards.map(({ _id, userId, name, tasks }) => (
          <BoardWidget
            key={_id}
            boardId={_id}
            boardUserId={userId}
            name={name}
            tasks={tasks}
          />
        ))}
      
    </>
  );
};

export default BoardsWidget;
