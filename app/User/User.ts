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
  type: string;
  fbId: string = '21e3dsaf';
  fbToken: string = '1243723985698753';

  constructor(type: string = 'user') {
    this.type = type;
  }
}
