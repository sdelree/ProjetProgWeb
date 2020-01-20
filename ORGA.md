# WhereToPark

![](https://github.com/sdelree/WhereToPark/workflows/Front%20test/badge.svg)

Une version déployée de l'application se trouve à l'adresse suivante : [https://wheretopark-bordeaux-app.herokuapp.com/](https://wheretopark-bordeaux-app.herokuapp.com/)

1. [Liste des membres](#liste-membres)
2. [Description du projet](#description-projet)
3. [Technologies utilisées](#technologies-utilisees)
    1. [Technologies frontend](#technologies-frontend)
    2. [Technologies backend](#technologies-backend)
    2. [API tierces](#api-tierces)
4. [Organisation](#organisation)

## Liste des membres <a id="liste-membres"></a>

Voici la composition de notre groupe :
* DELREE Sylvain
* GIACHINO Nicolas
* OULD AMARA Amel

## Description du projet <a id="description-projet"></a>

WhereToPark est une application permettant de trouver les parkings les plus intéressants autour d'une destination (à Bordeaux) en fonction de certaines caractéristiques du véhicule et de leur prix, disponibilité,... Cette application utilisera une API OpenData de la ville de Bordeaux pour les données de parking, une API du gouvernement pour les coordonnées en fonction d'une adresse et nous utiliserons notre propre backend pour permettre à l'utilisateur d'enregistrer plusieurs véhicules et éventuellement des destinations favorites.

## Technologies utilisées <a id="technologies-utilisees"></a>

### Technologies frontend <a id="technologies-frontend"></a>

Pour la partie frontend, nous avons choisi d'utiliser :

* **Angular** comme framework afin d'en faire facilement une *SPA*.
* **Angular Material** comme framework de composants graphiques.

### Technologies backend <a id="technologies-backend"></a>

Pour la partie backend, nous avons choisi d'utiliser :

* **Nodejs** comme runtime.
* **Javascript** comme langage.
* **Expressjs** comme serveur web.
* **MongoDB** comme base de données.

### API tierces <a id="api-tierces"></a>

Nous utilisons les API tierces suivantes :

* [OpenData Bordeaux parkings](https://opendata.bordeaux-metropole.fr/explore/dataset/st_park_p/information/) pour récupérer les informations liées aux parkings et parcs relais (localisation, tarifs, places libres,...) de la ville de Bordeaux afin de proposer les parkings les plus intéressants.
* [API Geo.gouv](https://geo.api.gouv.fr/adresse) pour autocompléter la recherche et récupérer les coordonnées GPS d'une destination.


## Organisaton <a id="organisation"></a>

Le projet est découpé en deux parties distinctes : 
* Un frontend([/frontend](frontend)), écrit principalement en Typescript et utilisant le framework Angular. Il s'agit d'une Single Page Application. Davantage d'informations sont données dans le [README correspondant](frontend/README.md).
* Un backend ([/backend](backend)), gérant l'API à laquelle le frontend fait appel. Il est écrit principalement en Javascript. Davantage d'informations sont données dans le [README correspondant](backend/README.md).

