export class UserModel {
  constructor(public fullName: string, public username: string, public jwtToken?: string) {
  }
}
