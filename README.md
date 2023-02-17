## File reader

- App reads files from target directory and displays them in web based UI.
- Target directory is set in `src/constants.tsx` file.
- App is build using `next.js`/`react`/`redux`
    - BE code is in `src/pages/api`
    - FE code is in `src/app`

## How to use

- Start app by running `yarn && yarn dev`
- Set target directory in `src/constants.tsx`
- Go to `localhost:3000` to see file list
- Click `ReScan` to scan dir again
- Click `Download list` to download list to json file


