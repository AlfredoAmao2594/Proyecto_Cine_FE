# Imágenes de la app

Vite copia `public/` tal cual al build, así que un archivo en `public/img/estrenos/moana-2.jpg`
se ve en `http://SERVIDOR/img/estrenos/moana-2.jpg`. La base de datos guarda solo la ruta
(`/img/estrenos/moana-2.jpg`) en la columna `url_imagen`.

Nombres que esperan los datos iniciales (`backend/database/04_datos.sql`):

estrenos/ (póster vertical, JPG ~ 400x600)
- dune-parte-dos.jpg
- intensamente-2.jpg
- gladiador-2.jpg
- moana-2.jpg
- deadpool-wolverine.jpg
- robot-salvaje.jpg

dulceria/ (PNG ~ 400x400)
- combo-pareja.png
- combo-familiar.png
- combo-individual.png
- canchita.png
- canchita-dulce.png
- nachos.png
- hot-dog.png
- gaseosa.png
- agua.png

Si una imagen no existe, la app muestra un recuadro gris (ImageWithFallback).
