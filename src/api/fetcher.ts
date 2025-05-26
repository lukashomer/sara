type TDataResult<T> = Promise<
  | {
      data: T;
      error: null;
    }
  | {
      data: null;
      error: unknown;
    }
>;

const fetcher =
  <TRes, TParams>(
    func: (params: TParams) => TDataResult<TRes>,
    params: TParams
  ) =>
  async (): Promise<TRes> => {
    const { data, error } = await func(params);

    if (error || !data) {
      throw error;
    }

    return data;
  };

export default fetcher;
