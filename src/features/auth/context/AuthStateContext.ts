import { createContext } from "react"

import type { AuthState } from "../types/auth-context"

export const AuthStateContext = createContext<AuthState | null>(null)
