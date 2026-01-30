export interface User {
  _id: string;
  username: string;
  email: string;
  profileImg: string;
  aboutMe?: string;
  roles?: { name: string }[];
}
