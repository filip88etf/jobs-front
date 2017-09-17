// Review model
export class Review {
  id: string;
  toId: string;
  toUsername: string;
  fromId: string;
  fromUsername: string;
  jobId: string;
  jobResourceId: string;
  review: string;
  recommended: boolean;
}
