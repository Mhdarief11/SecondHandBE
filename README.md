# Binar Final Project: SecondHand WebApp

![alt text](./Database_FinalProjectBinar_FSW.jpg)

## Getting Started

Untuk mulai membuat sebuah implementasi dari HTTP Server, mulainya menginspeksi file [`app/index.js`](./app/index.js), dan lihatlah salah satu contoh `controller` yang ada di [`app/controllers/mainController.js`](./app/controllers/mainController.js)

Lalu untuk menjalankan development server, kalian tinggal jalanin salah satu script di package.json, yang namanya `develop`.

```sh
yarn develop
```

## Database Management

Di dalam repository ini sudah terdapat beberapa script yang dapat digunakan dalam memanage database, yaitu:

- `yarn db:create` digunakan untuk membuat database
- `yarn db:drop` digunakan untuk menghapus database
- `yarn db:migrate` digunakan untuk menjalankan database migration
- `yarn db:seed` digunakan untuk melakukan seeding
- `yarn db:rollback` digunakan untuk membatalkan migrasi terakhir
