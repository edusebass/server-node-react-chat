import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("<h1>Servidor corriendo</h1>");
});
app.post("/authenticate", async (req, res) => {
    const { username } = req.body;
    try {
        const response = await axios.put(
            'https://api.chatengine.io/users/',
            {
                username: username,
                secret: username,
                first_name: username
            },
            {
                headers: {
                    "private-key": "7a0769f5-e05a-4713-a6d9-4dde0329efdd"
                }
            }
        );
        return res.status(response.status).json(response.data);
    } catch (error) {
        console.error("Error en la solicitud a la API externa:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});