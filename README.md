# 🐦 ColibriApp — Guardería Colibrí

Sistema de gestión para centros de educación inicial. Panel para administradora, maestras y representantes.

---

## ⚡ Despliegue rápido

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Fork o sube este repo a GitHub
2. Importa en [vercel.com](https://vercel.com) → **Deploy**
3. Tu URL estará lista en ~30 segundos

---

## 🔥 Configuración Firebase

El archivo `index.html` ya contiene la configuración Firebase del proyecto `guarderia-colibri`.

### Pasos adicionales requeridos en Firebase Console:

**1. Habilitar Anonymous Authentication:**
> Firebase Console → Authentication → Sign-in method → Anónimo → **Activar**

**2. Crear base de datos Firestore:**
> Firebase Console → Firestore Database → Crear base de datos → Modo prueba → us-central

**3. Publicar reglas de seguridad Firestore:**
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /colibriapp/{document=**} {
      // Solo usuarios autenticados (anónimamente) pueden leer/escribir
      allow read, write: if request.auth != null;
    }
  }
}
```

**4. Restringir la API Key (Google Cloud Console):**
> [console.cloud.google.com](https://console.cloud.google.com) → APIs y servicios → Credenciales → Tu API key → **Restricciones de aplicación** → Referentes HTTP → Agrega:
> - `https://colibriapp.vercel.app/*`
> - `https://*.vercel.app/*` (para preview deployments)

---

## 🔐 Seguridad implementada

| Capa | Mecanismo |
|------|-----------|
| **Transporte** | HTTPS forzado (Vercel) + HSTS |
| **Autenticación Firebase** | Anonymous Auth obligatorio para acceder a Firestore |
| **Reglas Firestore** | `request.auth != null` — solo sesiones autenticadas |
| **API Key** | Restringida por dominio en Google Cloud Console |
| **Headers HTTP** | CSP, X-Frame-Options, X-XSS-Protection, Referrer-Policy |
| **Acceso a la app** | Sistema de códigos de acceso gestionado por la administradora |
| **Indexación** | `noindex, nofollow` — no aparece en buscadores |

> ⚠️ **Nota sobre la API key:** Las API keys de Firebase para aplicaciones web son **públicas por diseño**. La seguridad real está en las Firebase Security Rules y la restricción de dominio, no en ocultar la key.

---

## 📁 Estructura del repositorio

```
colibriapp/
├── index.html      ← Aplicación completa (single-file)
├── vercel.json     ← Configuración Vercel + headers de seguridad
├── .gitignore      ← Archivos excluidos del repositorio
└── README.md       ← Este archivo
```

---

## 👥 Roles y acceso

| Rol | Código inicial | Acceso |
|-----|---------------|--------|
| Administradora | `ADM-2025` | Total |
| Maestra | Asignado por admin | Su sala |
| Representante | Asignado por admin | Datos de su hijo/a |

Los códigos se gestionan desde **Panel Admin → Usuarios y Accesos**.

---

## 📦 Tecnologías

- **Frontend:** HTML5 + CSS3 + JavaScript Vanilla (sin frameworks)
- **Base de datos:** Google Firestore (tiempo real)
- **Autenticación:** Firebase Anonymous Auth
- **Hosting:** Vercel
- **Almacenamiento local:** localStorage (respaldo offline)

---

## 🔄 Actualizar la aplicación

1. Edita `index.html` en GitHub (botón ✏️)
2. Commit los cambios
3. Vercel redespliega automáticamente en ~30 segundos

---

*ColibriApp v1.0 · Guardería Colibrí · Cuenca, Ecuador · 2025*
