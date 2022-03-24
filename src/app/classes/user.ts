export class User {
  id: number = 0;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber: number = 0;
  birthDay: any;
  role: any;
  authorities = [];
  isBlocked!: boolean;
  isDeleted!: boolean;
  age: string = '';
  profileImageUrl: string = '';
}