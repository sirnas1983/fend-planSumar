import { Auditor } from "./auditor";

export interface Usuario {
  id: string;
  username: string;
  email: string;
  roles: string[];
  validated: boolean;
  unlocked: boolean;
  lastLoginDate: string;
}
