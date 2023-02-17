"use client";

import { useCallback, useEffect, useMemo } from "react";
import { selectFiles, FilesState } from "src/store/filesSlice";
import { useAppDispatch, useAppSelector } from "src/store/store";
import { loadFilesList } from "src/store/filesAPIActions";

const useLoadedFiles = (): [FilesState, () => void] => {
  const filesState = useAppSelector(selectFiles);
  const dispatch = useAppDispatch();
  const loadFiles = useCallback(() => dispatch(loadFilesList()), [dispatch]);
  useEffect(() => {
    const promise = loadFiles();
    return () => {
      promise.abort();
    };
  }, [loadFiles]);
  return [filesState, loadFiles];
};

export default function Home() {
  const [{ status, files, path, error }, loadFiles] = useLoadedFiles();
  const filesString = JSON.stringify(files);

  const encodedFiles = useMemo(
    () => `data:text/json;charset=utf-8,${encodeURIComponent(filesString)}`,
    [filesString]
  );

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>ERROR: {error}</div>;

  return (
    <div>
      <h4>ACTIONS</h4>
      <a onClick={loadFiles}>{">"} ReScan</a>
      <br />
      <a href={encodedFiles} download="filesList.json">
        {">"} Download list
      </a>
      <h4>DIRECTORY PATH</h4>
      {path}
      <h4>LIST (count: {files.length})</h4>
      {files.map((file) => (
        <div key={file.name}>
          {file.name} {file.active ? "active" : "inactive"}
        </div>
      ))}
    </div>
  );
}
