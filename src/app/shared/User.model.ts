export class UserModel {
  // tslint:disable-next-line:variable-name
  public access_token: string;
  // tslint:disable-next-line:variable-name
  public expires_in: number;
  public username: string;
  public role: string;
  // tslint:disable-next-line:variable-name
  constructor(access_token?: string, expiers_in?: number) {
    this.access_token = access_token;
    this.expires_in = expiers_in;
  }
}
