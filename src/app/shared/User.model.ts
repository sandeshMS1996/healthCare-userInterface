export class UserModel {
  constructor(public username?: string, public password?: string,
              public role?: string, public isAuthenticated?) {
  }
}
