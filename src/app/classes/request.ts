import { User } from './user';
export class Request {
  id!: string;

  startsAt!: Date;

  isFinished!: boolean;

  isSolved!: boolean;

  finishedAt!: Date;

  topic!: string;

  priority!: string;

  messages!: [];

  user!: User;

  isDeleted!: boolean
}
