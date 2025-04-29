import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OverviewState {
    unreadNotificationCount: number;
    unreadChatCount: number;
}

const initialState: OverviewState = {
    unreadNotificationCount: 0,
    unreadChatCount: 0,
};

const overviewSlice = createSlice({
    name: 'overview',
    initialState,
    reducers: {
        setCounts(state, action: PayloadAction<OverviewState>) {
            state.unreadNotificationCount = action.payload.unreadNotificationCount;
            state.unreadChatCount = action.payload.unreadChatCount;
        },
        incrementNotification(state) {
            console.log('incrementing notification ', state)
            state.unreadNotificationCount += 1;
        },
        incrementChat(state) {
            state.unreadChatCount += 1;
        }
    },
});

export const {
    setCounts,
    incrementNotification,
    incrementChat,
} = overviewSlice.actions;

export default overviewSlice
