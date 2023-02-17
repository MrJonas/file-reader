import { createAsyncThunk } from "@reduxjs/toolkit";

interface File {
  name: string;
}

interface FilesAPIResponse {
  path: string;
  files: File[];
}

interface FilesAPIError {
  error: string;
}

export const loadFilesList = createAsyncThunk<
  FilesAPIResponse,
  undefined,
  { rejectValue: FilesAPIError }
>("users/loadFilesList", async (_, thunkAPI) => {
  const response = await fetch("http://localhost:3000/api/file", {
    signal: thunkAPI.signal,
  });
  if (response.status !== 200) {
    return thunkAPI.rejectWithValue(await response.json());
  }
  return await response.json();
});
