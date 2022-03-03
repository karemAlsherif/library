
enum UserRoles {
  Employee=2,
  Admin=1,
}
class User  {
  declare id: number;
  declare name: string;
  declare email: string;
  declare pwdHash: string;
  declare role: UserRoles;
}


export { User, UserRoles };
