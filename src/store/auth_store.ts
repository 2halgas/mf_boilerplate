// atoms/auth.ts
import { atom } from "jotai";
import { User } from "../api/model/auth/user.model";

// Atom to store the current authenticated user (null if not logged in)
export const userAtom = atom<User | null>(null);

// Atom to store the authentication status
export const isAuthenticatedAtom = atom<boolean>(false);
