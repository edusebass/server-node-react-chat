import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());

// Habilitar CORS solo para el dominio de producción en Railway
const allowedOrigins = ["https://nodejs-reactjs-chat-production.up.railway.app/"]; // Reemplaza con el dominio de tu frontend en Railway
app.use(cors({
    origin: function(origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Acceso no permitido por CORS"));
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
}));

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
                    "private-key": process.env.CHAT_ENGINE_PRIVATE_KEY // Usar variable de entorno para la clave privada
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
