# AngularAuthDemo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.

## Utilité de ce projet

Ce projet montre un exemple de comment gérer l'authentification. Il va avec le projet "Security-demo" 
(https://github.com/jomage/springsecurity-demo/).

## Explication de l'architecture du projet

Le projet possède plusieurs parties.

### App

Contient le module et composant racine. À noter que j'ai rajouté un `app-routing.module.ts` séparé qui contient
les routes pour `app.module.ts`.

### Shared

Contient les éléments qui sont réutilisés tout au long de l'application. Les éléments dans ce dossier **ne correspondent à aucune route**,
il sont juste importés dans d'autres modules.

### Public

Le module public contient les éléments qui ne nécéssitent pas d'être authentifié pour y accéder (création d'utilisateur et
connexion/auhtentification).

### Private

Contient les éléments qui nécéssitent d'être authentifié.

### Theme

Va contenir nos fichiers css/scss.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
