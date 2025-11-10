import { hash, compare } from "bcryptjs";

// gera hash de uma senha usando bcrypt

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 10);
}

// Compara a senha em t exto plano com hash

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return compare(password, hashedPassword);
}
