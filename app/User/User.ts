// User model
export class User {
  id: string;
  firstName: string;
  lastName: string;
  birthday: string;
  gender: string;
  phone: string;
  email: string;
  username: string;
  password: string;
  type: string;
  fbId: string;
  imageURL: string = 'assets/images/no-profile-pic.png';
  fbToken: string;

  constructor(type: string = 'employer') {
    this.type = type;
  }
}
