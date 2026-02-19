/* eslint-disable @typescript-eslint/no-unused-vars */
// AuthProvider.tsx

import {
    useReducer,
    useEffect,
    useMemo,
    type ReactNode,
} from "react";

import * as authApi from "../api";
import { rolePermissions } from "../constants";
import { AuthActionsContext } from "../context/AuthActionsContext";
import { authReducer } from "../context/authReducer";
import { AuthStateContext } from "../context/AuthStateContext";
import type { Role, User } from "../types";
import type { AuthState } from "../types/auth-context";

interface Props {
    children: ReactNode;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    role: "guest",
    permissions: [],
};

export function AuthProvider({ children }: Props) {
    const [state, dispatch] = useReducer(
        authReducer,
        initialState
    );

    /**
     * helper: extract role and permissions from user
     */
    const extractRolePermissions = (
        user: User | null
    ) => {
        const role: Role =
            (user?.role as Role) ?? "guest";

        const permissions =
            rolePermissions[role] ?? [];

        return { role, permissions };
    };

    /**
     * restore session on app start
     */
    useEffect(() => {
        (async () => {
            try {
                const user =
                    await authApi.getCurrentUser();

                if (user) {
                    dispatch({
                        type: "RESTORE_SESSION",
                        payload: user,
                    });

                    const {
                        role,
                        permissions,
                    } =
                        extractRolePermissions(user);

                    dispatch({
                        type: "SET_ROLE_PERMISSIONS",
                        payload: {
                            role,
                            permissions,
                        },
                    });
                } else {
                    dispatch({
                        type: "SET_LOADING",
                        payload: false,
                    });
                }
            } catch (error) {


                dispatch({
                    type: "SET_LOADING",
                    payload: false,
                });
            }
        })();
    }, []);

    /**
     * auth actions
     */
    const actions = useMemo(
        () => ({
            login: async (
                email: string,
                password: string,
                remapUser?: (
                    user: User
                ) => User
            ) => {
                const response =
                    await authApi.login({
                        email,
                        password,
                    });

                let user = response.user;

                if (remapUser) {
                    user = remapUser(user);
                }

                dispatch({
                    type: "LOGIN",
                    payload: user,
                });

                const {
                    role,
                    permissions,
                } =
                    extractRolePermissions(user);

                dispatch({
                    type: "SET_ROLE_PERMISSIONS",
                    payload: {
                        role,
                        permissions,
                    },
                });
            },

            logout: async () => {
                await authApi.logout();

                dispatch({
                    type: "LOGOUT",
                });

                dispatch({
                    type: "SET_ROLE_PERMISSIONS",
                    payload: {
                        role: "guest",
                        permissions: [],
                    },
                });
            },

            updateUser: async (
                id: string,
                data: Partial<User>
            ) => {
                await authApi.updateUserProfile(
                    id,
                    data
                );

                dispatch({
                    type: "UPDATE_USER",
                    payload: data,
                });

                const updatedUser = {
                    ...state.user,
                    ...data,
                } as User;

                const {
                    role,
                    permissions,
                } =
                    extractRolePermissions(
                        updatedUser
                    );

                dispatch({
                    type: "SET_ROLE_PERMISSIONS",
                    payload: {
                        role,
                        permissions,
                    },
                });
            },
        }),
        [state.user]
    );

    /**
     * provider
     */
    return (
        <AuthStateContext.Provider
            value={state}
        >
            <AuthActionsContext.Provider
                value={actions}
            >
                {children}
            </AuthActionsContext.Provider>
        </AuthStateContext.Provider>
    );
}
