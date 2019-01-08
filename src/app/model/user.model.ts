export class UserModel {
    id: number;
    name: string;
    password: string;
    email: string;
    token: string;
    lastLogin: Date;
    userGroupId: number;
    userRoleId: number;
}
