// User model
export class User {
  id: string;
  firstName: string;
  lastName: string;
  birthday: string;
  gender: string;
  phone: string;
  email: string;
  type: string;           // [worker, employer]
  username: string;
  password: string;
  fbId: string;
  imageURL: string = 'assets/images/no-profile-pic.png';

  constructor(type: string) {
    this.type = type;
  }
}
