import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export const firestoreApi = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ['User', 'List', 'Todo'],
  endpoints: () => ({}),
});
