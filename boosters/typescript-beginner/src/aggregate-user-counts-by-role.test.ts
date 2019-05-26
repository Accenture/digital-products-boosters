import { UserRole } from "./count-users-by-role";
import { aggregateUserCountsByRole } from "./aggregate-user-counts-by-role";

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

describe("executeOperation", (): void => {
  it("should return counts of all admin users when admin role is specified", (): void => {
    let result = aggregateUserCountsByRole(users);
    expect(result).toEqual({
      [UserRole.Admin]: 2,
      [UserRole.Organizer]: 1,
      [UserRole.Member]: 1,
    });

    expect(result[UserRole.Admin]).toBe(2);
    expect(result[UserRole.Organizer]).toBe(1);
    expect(result[UserRole.Member]).toBe(1);
  });
});
