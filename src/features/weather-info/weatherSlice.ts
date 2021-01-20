import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchParams {
  searchValue: string;
  units: string;
}

interface Data {
  getCityByName: {
    weather: {
      temperature: {
        actual: number;
      };
      summary: {
        description: string;
      };
      wind: {
        speed: number;
        deg: number;
      };
    };
  };
}

interface WeatherState {
  isLoading: boolean;
  data: Data | null;
  searchParams: SearchParams;
}

interface SetDataPayload {
  result: {
    data: Data;
  };
  searchParams: SearchParams;
}

const initialState: WeatherState = {
  isLoading: false,
  data: null,
  searchParams: {
    searchValue: "",
    units: "",
  },
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setData: (state, action: PayloadAction<SetDataPayload>) => {
      state.isLoading = false;
      state.data = action.payload.result.data;
      state.searchParams = action.payload.searchParams;
    },
  },
});

export const { setIsLoading, setData } = weatherSlice.actions;

export default weatherSlice.reducer;
