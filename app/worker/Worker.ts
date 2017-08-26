// worker model
import { User } from '../user/User';

export class Worker extends User {
  profession: string;
  region: string[];
  description: string;

  constructor() {
    super('worker');
  }
}
