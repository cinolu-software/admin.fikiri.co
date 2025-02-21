import { configureStore } from "@reduxjs/toolkit";
import {
    HeaderBookmarkSlice,
    ThemeCustomizerSlice,
    LayoutSlice,
    authenticationSlice,
    roleSlice,
    organizationSlice,
} from "@/Redux/Reducers";

const Store = configureStore({
  reducer: {
    layout: LayoutSlice,
    headerBookMark: HeaderBookmarkSlice,
    themeCustomizer: ThemeCustomizerSlice,
    authentication: authenticationSlice,
    role: roleSlice,
    organization: organizationSlice
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
