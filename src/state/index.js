import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    mode: "light",
    user: null,
    token: null,
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setBoards: (state, action) => {
            state.user.boards = action.payload.boards;
        },
        setBoard: (state, action) => {
            const updatedBoards = state.user.boards.map((board) => {
                if (board._id === action.payload.board._id) return action.payload.board;
                return board;
            })
            state.user.boards = updatedBoards
        },
        setTasks: (state, action) => {
            state.tasks = action.payload.tasks;
        },
        setTask: (state, action) => {
            const updatedTasks = state.tasks.map((task) => {
                if (task._id === action.payload.task._id) return action.payload.task;
                return task;
            })
            state.tasks = updatedTasks
        },

    }
})

export const { setMode, setLogin, setLogout, setBoards, setBoard, setTasks, setTask } = authSlice.actions;
export default authSlice.reducer;