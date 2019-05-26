export enum UserRole {
  Member,
  Organizer,
  Admin,
}

let countUsersByRole = (users: { role: UserRole }[], role: UserRole): number =>
  users.reduce(
    (count, user): number => (user.role === role ? count + 1 : count),
    0,
  );

export { countUsersByRole };
