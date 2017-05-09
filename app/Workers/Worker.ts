// worker model
import { User } from '../User/User';

export class Worker extends User {
  profession: string;
  cities: string[];
  jobDescription: string;
}
