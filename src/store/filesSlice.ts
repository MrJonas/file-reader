import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { loadFilesList } from "./filesAPIActions";

interface File {
  name: string;
  active: boolean;
}

export interface FilesState {
  path: string | null;
  files: File[];
  status: "loading" | "success" | "failed";
  error?: string;
}

const initialState: FilesState = {
  path: null,
  files: [],
  status: "loading",
  error: undefined,
};

export const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(loadFilesList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadFilesList.fulfilled, (state, action) => {
        const oldFiles = state.files.reduce(
          (files, file) => ({ ...files, [file.name]: false }),
          {}
        );
        const newFiles = action.payload.files.reduce(
          (files, file) => ({ ...files, [file.name]: true }),
          oldFiles
        );

        state.files = Object.entries(newFiles).map(
          ([name, active]) =>
            ({
              name,
              active,
            } as File)
        );

        state.path = action.payload.path;
        state.status = "success";
      })
      .addCase(loadFilesList.rejected, (state, action) => {
        state.files = [];
        state.path = null;
        state.status = "failed";
        state.error = action.payload?.error || action.error.message;
      }),
});

export const selectFiles = (state: RootState) => state.files;
