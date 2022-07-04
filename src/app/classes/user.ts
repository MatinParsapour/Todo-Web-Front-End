import { AccessLevel } from './../enum/access-level';
export class User {
  id: number = 0;
  firstName: string = '';
  password: string= '';
  lastName: string = '';
  email: string = '';
  userName: string = '';
  phoneNumber: number = 0;
  birthDay: any;
  bio!: string;
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