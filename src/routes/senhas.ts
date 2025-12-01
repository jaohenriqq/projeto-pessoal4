// src/routes/senhas.ts
import { Router, Request, Response } from 'express';
import { gerarSenha } from '../utils/geradorSenha';

const router = Router();

// Array global para armazenar senhas (simplificado, em memória)
let senhas: { id: number; senha: string; criadoEm: string; atualizadoEm?: string }[] = [];

// CREATE: Cria uma nova senha
router.post('/', (req: Request, res: Response) => {
    const { length = 8, incluirNumeros = true, incluirSimbolos = false } = req.body;
    const novaSenha = {
        id: Date.now(),
        senha: gerarSenha(length, incluirNumeros, incluirSimbolos),
        criadoEm: new Date().toISOString()
    };
    senhas.push(novaSenha);
    res.status(201).json({ message: 'Senha criada com sucesso', senha: novaSenha });
});

// READ: Retorna todas as senhas
router.get('/', (req: Request, res: Response) => {
    res.json(senhas);
});

// UPDATE: Atualiza uma senha por ID
router.put('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { length = 8, incluirNumeros = true, incluirSimbolos = false } = req.body;
    const index = senhas.findIndex(item => item.id === id);
    if (index !== -1) {
        senhas[index].senha = gerarSenha(length, incluirNumeros, incluirSimbolos);
        senhas[index].atualizadoEm = new Date().toISOString();
        res.json({ message: 'Senha atualizada com sucesso', senha: senhas[index] });
    } else {
        res.status(404).json({ message: 'ID não encontrado' });
    }
});

// DELETE: Deleta uma senha por ID
router.delete('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const novasSenhas = senhas.filter(item => item.id !== id);
    if (novasSenhas.length < senhas.length) {
        senhas = novasSenhas;
        res.json({ message: 'Senha deletada com sucesso' });
    } else {
        res.status(404).json({ message: 'ID não encontrado' });
    }
});

export default router;