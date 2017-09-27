// Report modal
export class Report {
  id: string;
  reporterId: string;
  reporterUsername: string;
  reportedId: string;
  reportedUsername: string;
  type: string;         // [‘job’, ‘worker’, ‘employer’]
  comment: string;
  addresed: boolean;
  real: boolean;
  resolved: boolean;
  action: string;
  resolution: string;
  status: string;
  createdDate: string;
  modifiedDate: string;
  constructor(reporterId: string, reporterUsername: string, reportedId: string, reportedUsername: string,
    type: string, comment?: string) {
    this.reporterId = reporterId;
    this.reporterUsername = reporterUsername;
    this.reportedId = reportedId;
    this.reportedUsername = reportedUsername;
    this.type = type;
    this.comment = comment;
  }
}
