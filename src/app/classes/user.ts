import { AccessLevel } from './../enum/access-level';
export class User {
  id: number = 0;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber: number = 0;
  birthDay: any;
  role: any;
  authorities = [];
  followers = [];
  followings = [];
  isBlocked!: boolean;
  isDeleted!: boolean;
  registerDate: any;
  lastLoginDate: any;
  age: string = '';
  accessLevel!: AccessLevel;
  profileImageUrl: string = '';
}