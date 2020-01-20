# Wheretopark (Backend)

## Organisation des fichiers

Les fichiers de l'application backend son organisés comme suit :

* **database**: contient le code nécessaire pour établir la connexion à la base de données.
* **middlewares**: contient divers middlewares utilisés par l'application, qui ne rentrent dans aucune des autres catégories.
* **routes**: contient les routes de l'API REST décrite dans le fichier [openapi.yaml](openapi.yaml).
* **services**: contient les services d'accès aux données exposés par l'API REST. Il servent à faire la jonction entres les API tierces, la base de données et l'API REST.
* **
