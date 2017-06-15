// worker model
import { User } from '../User/User';

export class Worker extends User {
  profession: string;
  region: string[];
  description: string;

  constructor() {
    super('worker');
  }
}
