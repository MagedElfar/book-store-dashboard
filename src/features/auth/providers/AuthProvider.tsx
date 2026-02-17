// AuthProvider.tsx
import { useReducer, useEffect, useMemo, type ReactNode } from "react"

import * as authApi from "../api"
import { AuthActionsContext } from "../context/AuthActionsContext"
import { authReducer } from "../context/authReducer"
import { AuthStateContext } from "../context/AuthStateContext"
import type { AuthState } from "../types/auth-context"
import type { User } from "../types/user"

interface Props {
    children: ReactNode
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true
}

export function AuthProvider({ children }: Props) {
    const [state, dispatch] = useReducer(authReducer, initialState)

    // restore session from server (HTTP-only cookies)
    useEffect(() => {
        (async () => {
            try {
                const user = await authApi.getCurrentUser()
                if (user) dispatch({ type: "RESTORE_SESSION", payload: user })
                else dispatch({ type: "SET_LOADING", payload: false })
            } catch {
                dispatch({ type: "SET_LOADING", payload: false })
            }
        })()
    }, [])

    // actions
    const actions = useMemo(() => ({
        login: async (email: string, password: string, remapUser?: (user: User) => User) => {
            const response = await authApi.login({ email, password })

            let user = response.user
            if (remapUser) user = remapUser(user) // remap user data if needed

            dispatch({ type: "LOGIN", payload: user })
        },

        logout: async () => {
            await authApi.logout()
            dispatch({ type: "LOGOUT" })
        },

        updateUser: async (id: string, data: Partial<User>) => {
            await authApi.updateUserProfile(id, data)
            dispatch({ type: "UPDATE_USER", payload: data })
        }

    }), [])

    return (
        <AuthStateContext.Provider value={state}>
            <AuthActionsContext.Provider value={actions}>
                {children}
            </AuthActionsContext.Provider>
        </AuthStateContext.Provider>
    )
}
