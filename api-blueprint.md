FORMAT: 1A
HOST:  http://jobsy-kp-api.herokuapp.com/

# Jobsy

Jobsy is platform for connecting employers and employees, and posting/searching every day jobs.
This is the REST API writen in Java(spring).

## Users Collection [/users]

### List All Users [GET]

+ Response 200 (application/json)

        [
            {user},
            {user}
        ]

## Workers Collection [/workers]

### List All Workers [GET]

+ Response 200 (application/json)

        [
            {worker},
            {worker}
        ]

### Create a New Worker [POST]

+ Request (application/json)

        {
            "firstName": "Filip",
            "lastName": "Djordjevic",
            "birthday": "06-08-1988",
            "gender": "Male",
            "phone": "0601434835",
            "email": "eing.filip@gmail.com"
            "profession": "Electician",
            "Region": "Belgrade,Nis",
            "Description": "Working on all electician instalation"
            "type": "worker",
            "imageURL": "http://workers/images/1"
        }

+ Response 201 (application/json)

    + Headers

            Location: /questions/2

    + Body

{
  "links": [],
  "content": [
    {
      "id": 2,
      "firstName": "Thor",
      "lastName": "God",
      "birthday": "2017-08-12",
      "gender": "Male",
      "phone": "3232432432",
      "username": "thor",
      "email": "thor@asgard.com.",
      "password": "hammer1111",
      "fbId": "thor",
      "fbToken": "asdasd3d23d12w12cs",
      "type": "worker",
      "imageURL": null,
      "profession": "Stolar",
      "region": "Karaburma, Karaburma, Zvezdara, Palilula",
      "description": "Sve vrste stolarskih radova povoljno",
      "createdDate": "2017-08-12T00:00:00.000+0000",
      "modifiedDate": "2017-08-12T00:00:00.000+0000",
      "content": [],
      "links": [
        {
          "rel": "self",
          "href": "http://jobsy-kp-api.herokuapp.com/workers/2"
        },
        {
          "rel": "workerEntity",
          "href": "http://jobsy-kp-api.herokuapp.com/workers/2"
        }
      ]
    },
    {
      worker
    },
    {
      worker
    }
  ],
  "page": {
    "size": 20,
    "totalElements": 46,
    "totalPages": 3,
    "number": 0
  }
}

## Employers Collection [/employers]

### List All Employer [GET]

+ Response 200 (application/json)

        [
            {employer},
            {employer}
        ]

## Jobs Collection [/jobs]

### List All Jobs [GET]

+ Response 200 (application/json)

        [
            {employer},
            {employer}
        ]
