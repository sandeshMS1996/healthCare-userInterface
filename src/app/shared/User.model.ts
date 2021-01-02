export class UserModel {
  constructor(public username?: string, public password?: string,
              public fullName?: string, public role?: string, public isAuthenticated = false) {
  }
}
