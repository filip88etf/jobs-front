// Job model
export class Job {
  id: string;
  username: string;
  profession: string;
  region: string;
  description: string;
  createdDate: string;
  modifiedDate: string;
  imageURL: string;
  status: string;         // [active, inprogress, done]
  type: string;           // [posted, generated]

  constructor(username?: string, profession?: string, region?: string, description?: string, status?: string,
    type?: string) {
    this.username = username;
    this.profession = profession;
    this.region = region;
    this.description = description;
    this.status = status;
    this.type = type || 'posted';
  }
}
