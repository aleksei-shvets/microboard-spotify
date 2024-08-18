import { createSlice, createAsyncThunk, SerializedError } from "@reduxjs/toolkit";
import { createSelector } from 'reselect';
import dataCorrector from "../lib/dataCorrector";
import { SongItem} from "../types";
import { RootState } from './index';

export const fetchSongs = createAsyncThunk<SongItem[]>(
  'knnSlice/getSongs',
  async() => {
    const response = await fetch('/dataset.json');
    const jsonData = await response.json();

    return dataCorrector(jsonData);
  }
)

interface InitState {
  songs: SongItem[] | null
  selectedSong: number | null
  loading: string | null
  error: SerializedError | null
}

const initialState: InitState = {
  songs: null,
  selectedSong: null,
  loading: null,
  error: null,
}

const knnSlice = createSlice({
  name: 'knnSlice',
  initialState,
  reducers: {
    setSelectedSong: (state, action) => {
      state.selectedSong = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.songs = action.payload
      })
      .addCase(fetchSongs.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.error = action.error
      })
  }
});

export const getSongsSelector = createSelector(
  (state: RootState) => state.knnSlice.songs ,
  (songs) => songs ?? [],
);

export const getSelectedSongSelector = createSelector(
  (state: RootState) => state.knnSlice.selectedSong,
  (selectedSong) => selectedSong ?? '',
);

export const { setSelectedSong} = knnSlice.actions

export default knnSlice.reducer
