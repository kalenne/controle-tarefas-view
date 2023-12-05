export interface IResponse<T> {
    data: T;
    errors: string[];
  }

export interface IToken {
    token: string
}