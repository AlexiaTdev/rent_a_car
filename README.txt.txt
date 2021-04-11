TEISSIER Alexia & Paul --GROUPE ?



-----------------------------------------------EXERCICE 6


##A MODIFIER
---------------------------------------------------------------------------------------------DOCUMENTATION API RENTACAR

---------------------------------------------------------------------------------------------PATH PRINCIPAUX

###############acceder a une liste de voitures
URI : /cars
methode HTTP : GET
code HTTP retourné : 200 OK
exemple de request : HTTP GET http://LocationDeVoitures/cars
exemple de ressource retournée :
[
{
"brand": "renaut",
"color": "verte",
"id": 1,
"model": "c5",
"state":"louable"
}
]
Parametres de request applicables : page, status, sortByStatus, dateDebut=value&dateFin=value, 
parametres par défaut pour chaque Parametres de request applicable :
##page
@QueryParam("page") @DefaultParam("0")
valeurs possibles : value au format int positif
exemple de request pour le paramètre : HTTP GET http://LocationDeVoitures/cars?page=1

##status
@QueryParam("status") @DefaultParam("louable")
valeurs possibles : "à réparer", "louable", "en location", "en réparation"
exemple de request pour le paramètre : HTTP GET http://LocationDeVoitures/cars?status="à réparer"

##sortByStatus
@QueryParam("sortByStatus") @DefaultParam("true")
valeurs possibles : value au format boolean
exemple de request pour le paramètre : HTTP GET http://LocationDeVoitures/cars?sortByStatus=true

##perPage
@QueryParam("perPage") @DefaultParam(10)
valeurs possibles : value au format int positif INFERIEUR A 20
exemple de request pour le paramètre : HTTP GET http://LocationDeVoitures/cars?perPage=6




###############acceder a une voiture
URI : /cars/id
methode HTTP : GET
code HTTP retourné : 200 OK
code erreurs potentiels : 
exemple de request : HTTP GET http://LocationDeVoitures/cars/1
exemple de ressource retournée :
[
{
"brand": "renaut",
"color": "verte",
"id": 1,
"model": "c5",
"state":"louable"
}
]
Parametres de request applicables : status, addToRepairHistory(post seulement), repairHistory
##status
@QueryParam("status") @DefaultParam("louable")
valeurs possibles : "à réparer", "louable", "en location", "en réparation"
exemple de request pour le paramètre : HTTP GET http://LocationDeVoitures/cars/1/?status="à réparer"

##addToRepairHistory (POST SEULEMENT)
@QueryParam("addToRepairHistory") @DefaultParam(today)
valeurs possibles : value au format date
exemple de request pour le paramètre : HTTP GET http://LocationDeVoitures/cars?/1/status="à réparer"

##repairHistory
@QueryParam("repairHistory") @DefaultParam(true)
valeur possible : true
exemple de request pour le paramètre : HTTP POST http://LocationDeVoitures/cars/1?RepairHistory=true



---------------------------------------------------------------------------------------------exemples d'accès aux ressources

-lister des voitures en cours de location
HTTP GET http://LocationDeVoitures/cars?status="en location"

- lister des voitures à réparer
HTTP GET http://LocationDeVoitures/cars?status="à réparer"

- lister des voitures pouvant être louées
HTTP GET http://LocationDeVoitures/cars?status="louable"

- lister toutes les voitures pour connaître leur état
HTTP GET http://LocationDeVoitures/cars?sortByStatus=true

---------------------
- créer une nouvelle location de voiture
HTTP POST http://LocationDeVoitures/cars/1?status="en location"

- récupérer le détail d’une voiture
HTTP POST http://LocationDeVoitures/car/1





