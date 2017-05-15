// User model
export class User {
  id: string;
  firstName: string;
  lastName: string;
  birth: string;
  gender: string;
  phone: string;
  email: string;
  username: string;
  password: string;
  userType: string;
  fbId: string = '21e3dsaf';
  fbToken: string = '1243723985698753';

  constructor(type: string = 'user') {
    this.userType = type;
  }
}
