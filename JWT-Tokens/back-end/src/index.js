import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { PORT, JWT_SECRET_KEY, PORT_FRONTEND } from "./config.js";
import { UserRepository } from "./user-repository.js";

const app = express();

app.use(
  cors({
    origin: `http://localhost:${PORT_FRONTEND}`,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Middleware para que Express pueda leer JSON en el body de las peticiones
app.use(express.json());

// Middleware para poder leer cookies en las peticiones
app.use(cookieParser());

/*
  Middleware global de autenticación.

  Este middleware se ejecuta antes de llegar a cualquier ruta.

  Su función es:
  1. Leer la cookie llamada "access_token".
  2. Crear una sesión básica en req.session.
  3. Si existe token, intenta verificarlo.
  4. Si el token es válido, guarda los datos del usuario en req.session.user.
  5. Si el token no existe o es inválido, req.session.user queda como null.
*/
app.use((req, res, next) => {
  // Obtenemos el token JWT desde la cookie
  const token = req.cookies.access_token;

  // Creamos una sesión en la request
  req.session = { user: null };

  try {
    // Si existe token, lo verificamos con la clave secreta
    if (token) {
      const dataToken = jwt.verify(token, JWT_SECRET_KEY);

      // Guardamos los datos del token en la sesión
      req.session.user = dataToken;
    }
  } catch (error) {
    /*
      Si el token no es válido o ha expirado, jwt.verify lanzará un error.

      No hacemos nada porque simplemente queremos que el usuario quede como no autenticado.
    */
  }

  // Pasamos al siguiente middleware o ruta
  next();
});

/*
  Ruta principal.

  Devuelve el usuario autenticado si existe.
  Si no hay usuario autenticado, devuelve user: null.
*/
app.get("/", (req, res) => {
  const { user } = req.session;

  console.log("USER: " + user);

  res.send({ user });
});

/*
  Ruta de login.

  Recibe username y password desde el body.
  Si las credenciales son correctas:
  1. Busca el usuario.
  2. Crea un token JWT con id y username.
  3. Guarda el token en una cookie HTTP-only.
  4. Devuelve el usuario y el token.

  Si las credenciales son incorrectas:
  - Devuelve error 401.
*/
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  try {
    // Validamos usuario y contraseña
    const user = UserRepository.login({ username, password });

    console.log("Usuario autenticado:", user);

    // Creamos el token JWT con los datos básicos del usuario
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      },
    );

    console.log("Token generado:", token);

    /*
      Guardamos el token en una cookie.

      httpOnly:
      La cookie no se puede leer desde JavaScript en el navegador.
      Esto protege frente a ataques XSS.

      secure:
      En producción, la cookie solo se enviará por HTTPS.

      sameSite:
      La cookie solo se enviará desde el mismo sitio.
      Ayuda a proteger contra ataques CSRF.

      maxAge:
      La cookie caduca en 1 hora.
    */
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60,
    });

    // Devolvemos el usuario y el token
    res.send({ user, token });
  } catch (error) {
    // Si falla el login, devolvemos error 401 Unauthorized
    console.log("ERROR LOGIN:", error.message);
    res.status(401).send(error.message);
  }
});

/*
  Ruta de registro.

  Recibe username y password desde el body.
  Crea un nuevo usuario usando UserRepository.create.

  Si el usuario se crea correctamente:
  - Devuelve el id del nuevo usuario.

  Si ocurre un error:
  - Devuelve error 400.
*/
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  // Mostramos el body por consola para depuración
  console.log(req.body);

  try {
    // Creamos el usuario
    const id = UserRepository.create({ username, password });

    // Devolvemos el id del usuario creado
    res.send({ id });
  } catch (error) {
    // Si hay error al registrar, devolvemos Bad Request
    res.status(400).send(error.message);
  }
});

/*
  Ruta de logout.

  Elimina la cookie access_token.
  Al borrar la cookie, el usuario deja de estar autenticado.
*/
app.post("/logout", (req, res) => {
  res.clearCookie("access_token");

  res.send("Logout endpoint");
});

/*
  Ruta protegida.

  Solo permite acceso si el usuario está autenticado.

  Para saber si está autenticado, revisa req.session.user,
  que se rellenó antes en el middleware global.
*/
app.get("/protected", (req, res) => {
  const { user } = req.session;

  // Si no hay usuario en sesión, no está autenticado
  if (!user) {
    return res.status(401).send("Unauthorized");
  }

  // Si hay usuario, permitimos acceso a la ruta protegida
  res.send({
    user,
  });
});

/*
  Arrancamos el servidor en el puerto definido en config.js.
*/
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
