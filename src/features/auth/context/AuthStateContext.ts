import { createContext } from "react"

import type { AuthState } from "../types"

export const AuthStateContext = createContext<AuthState | null>(null)
