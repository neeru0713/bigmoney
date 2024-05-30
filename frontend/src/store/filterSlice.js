import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    fieldName: "IDX",
    operator: "",
    value: "",
    filters: [],
  },
  reducers: {
    setFieldName: (state, action) => {
      state.fieldName = action.payload;
    },
    setOperator: (state, action) => {
      state.operator = action.payload;
    },
    setValue: (state, action) => {
      state.value = action.payload;
    },
    clearFilter: (state) => {
      state.fieldName = "";
      state.operator = "";
      state.value = "";
    },
    updateFilters: (state, newFilter) => {
      state.filters.push(newFilter)
    }
  },
});

export const { setFieldName, setOperator, setValue, clearFilter, updateFilters } = filterSlice.actions;

export default filterSlice.reducer;
