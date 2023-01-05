export interface User {
  id: number,
  login: string;

  // Contiendra "login:mdp" en base64
  authData?: string;
}
