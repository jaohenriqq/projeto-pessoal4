// src/server.ts
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import senhasRoutes from './routes/senhas';

// Carregar variáveis do .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Usa a porta do .env ou 3000 como padrão

// Middleware para parsear JSON
app.use(express.json());

// Servir arquivos estáticos (HTML, JS) da pasta public
app.use(express.static(path.join(__dirname, '../public')));

// Rota raiz: Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Usar as rotas de senhas
app.use('/senhas', senhasRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
