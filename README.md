# 📝 AltoCV

AltoCV es una plataforma innovadora que utiliza inteligencia artificial para adaptar tu currículum a diferentes posiciones laborales, asegurando que superes los filtros de los sistemas de seguimiento de candidatos (ATS). Puedes subir referencias como enlaces o archivos de distintos formatos y buscar información adicional en Google. Además, te permite descargar tu CV en formato PDF o publicarlo en una URL hosteada directamente en la app, facilitando el acceso y la gestión de tu perfil profesional.

## 🚀 Características Principales

✅ Generación de CV optimizados para ATS.  
✅ Creación de múltiples versiones según el puesto.  
✅ Editor enriquecido estilo Notion.  
✅ Exportación a PDF con diseños profesionales.  
✅ Integración con IA para sugerencias automáticas.  

---

## 📸 Capturas de Pantalla

![image](https://github.com/user-attachments/assets/05fd7eab-0c65-4dec-8c1b-4da5ba63e02b)

![image](https://github.com/user-attachments/assets/8ea63f12-ad89-4e34-85cf-f19d00d21c17)


---

## 📦 Tecnologías Usadas

- **Next.js 14** - Framework de React para aplicaciones web modernas.
- **Tailwind CSS** - Estilos rápidos y personalizables.
- **Vercel AI SDK** - Integración de inteligencia artificial.
- **Prisma & PostgreSQL** - Base de datos eficiente y escalable.
- **NextAuth.js** - Autenticación segura con Google.

---

## 🎯 Instalación y Uso

### 1️⃣ Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/alto-cv.git
cd alto-cv
```

### 2️⃣ Instalar Dependencias
```bash
npm install
```

### 3️⃣ Configurar Variables de Entorno
Crea un archivo `.env.local` con la siguiente estructura:
```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/alto_cv"
NEXTAUTH_SECRET="clave_secreta"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="tu_client_id"
GOOGLE_CLIENT_SECRET="tu_client_secret"
```

### 4️⃣ Ejecutar en Desarrollo
```bash
npm dev
```
La aplicación estará disponible en `http://localhost:3000`.

---

## 📜 Licencia
Este proyecto está bajo la licencia **MIT**. Puedes usarlo y modificarlo libremente.

---

## 📩 Contacto
Si tienes dudas o sugerencias, contáctame en [tu-email@example.com](mailto:tu-email@example.com).

