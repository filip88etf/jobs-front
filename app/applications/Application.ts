// Application model
export class Application {
  id: string;
  workerId: string;
  jobId: string;
  comment: string;
  status: string;   // [pending,accepted]
  employerUsername: string;
  type: string;

  constructor(workerId?: string, jobId?: string, status?: string, username?: string, comment?: string, type?: string) {
    this.workerId = workerId;
    this.jobId = jobId;
    this.comment = comment;
    this.status = status;
    this.employerUsername = username;
    this.type = type || 'posted';
  }
}
