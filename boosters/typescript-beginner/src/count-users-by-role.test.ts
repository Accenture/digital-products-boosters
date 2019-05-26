import { countUsersByRole, UserRole } from "./count-users-by-role";

let users = [
  {
    name: "Mark",
    role: UserRole.Member,
  },
  {
    name: "D-Rod",
    role: UserRole.Admin,
  },
  {
    name: "Maggie",
    role: UserRole.Organizer,
  },
  {
    name: "Adonica",
    role: UserRole.Admin,
  },
];

describe("countUsersByRole", (): void => {
  it("should return counts of all admin users when admin role is specified", (): void => {
    let result = countUsersByRole(users, UserRole.Admin);
    expect(result).toBe(2);
  });

  it("should return counts of all organizer users when organizer role is specified", (): void => {
    let result = countUsersByRole(users, UserRole.Organizer);
    expect(result).toBe(1);
  });

  it("should return counts of all member users when member role is specified", (): void => {
    let result = countUsersByRole(users, UserRole.Member);
    expect(result).toBe(1);
  });
});
