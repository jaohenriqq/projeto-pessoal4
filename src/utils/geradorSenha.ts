// src/utils/geradorSenha.ts
export function gerarSenha(length = 8, incluirNumeros = true, incluirSimbolos = false): string {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (incluirNumeros) chars += '0123456789';
    if (incluirSimbolos) chars += '!@#$%^&*';
    let senha = '';
    for (let i = 0; i < length; i++) {
        senha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return senha;
}