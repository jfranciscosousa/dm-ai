export function authenticate(password: string) {
  return password === process.env.INVITE_TOKEN;
}
