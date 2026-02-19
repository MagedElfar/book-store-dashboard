import type { Permission, Role } from "./role";
import type { User } from "./user";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  permissions: Permission[]
  role: Role
}

export type AuthAction =
  | { type: "RESTORE_SESSION"; payload: User }
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "UPDATE_USER"; payload: Partial<User> }
  | { type: "SET_LOADING"; payload: boolean }
  | {
    type: "SET_ROLE_PERMISSIONS";
    payload: {
      role: Role;
      permissions: Permission[];
    };
  }

export interface AuthActions {
  login: (email: string, password: string, remapUser?: (user: User) => User) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (id: string, data: Partial<User>) => Promise<void>;
}
