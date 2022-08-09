export interface News {
  status?: string,
  totalResults?: number,
  articles?: Articles[],
};

export interface Articles {
  isAdded?: boolean,
  user?: string,
  author?: string,
  content?: string,
  publishedAt?: Date,
  description?: string,
  title?: string,
  url?: string,
  urlToImage?: string,
  source?: Source,
};

export interface Source {
  id?: string,
  name?: string,
};