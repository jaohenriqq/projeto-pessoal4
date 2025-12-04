
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import senhasRoutes from './routes/senhas';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Usa a porta do .env ou 3000 como padrão


app.use(express.json());

 public
app.use(express.static(path.join(__dirname, '../public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});


app.use('/senhas', senhasRoutes);


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
