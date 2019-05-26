import { UserRole } from "./count-users-by-role";
import { Interface } from "readline";

interface User {
  name: string;
  role: UserRole;
}

type AggregateUserCounts = { [k in UserRole]: number };

type X = { [k in UserRole]: UserRole };
let a = { [UserRole.Admin]: UserRole[0] };
console.log(a);
interface Meow {
  x: number;
  y: string;
  z: number;
}
let bye: Meow = { x: 1, y: 2, z: 3 };
console.log(bye);
type adsf = keyof Meow;
type ValueOf<T> = T[keyof T];
type fdsa = ValueOf<Meow>;
type zasdf = Meow[keyof Meow];

let aggregateUserCountsByRole = (users: User[]): AggregateUserCounts =>
  users.reduce(
    (count, user): AggregateUserCounts => {
      count[user.role] += 1;
      return count;
    },
    { [UserRole.Admin]: 0, [UserRole.Organizer]: 0, [UserRole.Member]: 0 },
  );

export { aggregateUserCountsByRole };
