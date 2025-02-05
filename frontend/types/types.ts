export type TMessageBody = {
  id: number;
  message: string;
};

export type TMessagesResponse = {
  data: TMessageBody[];
  totalPages: number;
};

export type TMessageEditParams = {
  id: number;
  content: string;
};

export type TMessageCreateRequest = {
  content: string;
};

export type TMessagePaginationParams = {
  page: number;
  perPage: number;
};

export type FormData = {
  content: string;
};
