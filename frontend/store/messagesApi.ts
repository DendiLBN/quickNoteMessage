import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  TMessageEditParams,
  TMessageCreateRequest,
  TMessagesResponse,
  TMessagePaginationParams,
} from "@/types/types";

export const messagesApi = createApi({
  reducerPath: "messagesApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  tagTypes: ["messages"],

  endpoints: (builder) => ({
    getMessages: builder.query<TMessagesResponse, TMessagePaginationParams>({
      query: ({ page, perPage }) => ({
        method: "GET",
        url: "/messages",
        params: { page, perPage },
      }),
      providesTags: ["messages"],
    }),

    editMessage: builder.mutation<TMessagesResponse, TMessageEditParams>({
      query: ({ id, content }) => ({
        method: "PATCH",
        url: `/messages/${id}`,
        body: { content },
      }),
      invalidatesTags: ["messages"],
    }),

    deleteMessage: builder.mutation<void, number>({
      query: (id) => ({
        method: "DELETE",
        url: `/messages/${id}`,
      }),
      invalidatesTags: ["messages"],
    }),

    createMessage: builder.mutation<TMessagesResponse, TMessageCreateRequest>({
      query: (newMessage) => ({
        method: "POST",
        url: `/messages/`,
        body: newMessage,
      }),
      invalidatesTags: ["messages"],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useCreateMessageMutation,
  useDeleteMessageMutation,
  useEditMessageMutation,
} = messagesApi;
