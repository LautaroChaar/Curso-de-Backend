export const config = {
    
    isAdmin: true,

    atlas: {
        strConn: `mongodb+srv://Lautaro:batman123@cluster0.jfywafn.mongodb.net/proyectoFinal?retryWrites=true&w=majority`
    },

    firebase: {
        "type": "service_account",
        "project_id": "coder-60a60",
        "private_key_id": "050e76840d3ed3e936e4d45f9e7821bd70eae9a0",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCrSevHigRGmWGI\nGo62S3vFf95HhqDAgdA1TZDOCrSMLQL6J9cz09SW+4/vu6KFnKc3+8wz9HBs/Rv7\nDbzziOkscJw2ECOy1vzKuyVpBMUVvOEUy/dFgikjJdBQ7WMTMBjQEg6JuWamhToX\naf3b2U5HzVqeArKFOK7ufWwKB3tWNo9/Bl0UCBgqGdkWX305Y/ho5GkmkXLyzZvN\n/M9vwPB0OiyxfrKi7SFnI4ZOQAjeeYNSZUGrI75QtJlx2gtJnoMjuHbVEx3muzzt\nLE/MqO9aLGkqgcrcREcaf7ZfqOthGZEFbk26R0Vnjok0oIpJb70iWjEUe8Qa9pz3\n9g00vImlAgMBAAECggEACPdNGrxMPf/QXaX6O2uXFn77fSX8aydAZVHilw5zZfUD\nN2H3f1SCx8ZyQdvCBZluHV2WUk/kxKe5G7qb3emYPwXD/4Z3v+hGAjyqmCUyRdGF\nvKdykZZfHeJgVaQfcAUv/1A6p5XnXCcUI96d9bCZyuNib2v3uUZ+zagODDZZC+mo\nS/RL2oGvEiSJqwVXIRHsnN1wJqR6tPDd7lYjrNrxf9IPTlSSuHmiGgl1cZm1SSbx\nhtzKEP9fymjEdUI1+o1kQcvQB1XkVNxX2+Ovm3yHtzxzvCuKddeOfz9IMExcD5LV\nk6qajoNJkMPTJmwuALK4jh3l3Vc97QdV/osNkmD9HwKBgQDSt8h+dim7tqAjg5dz\nXphC7f8cXMD9js4wRGvRYpMDXq19JYPfg081n5JMsVhJkxjlOvuIvDIEwLNfplFJ\nSh9WCAelmj93WIBHhiDMk+iw+P317kMaOO6MJOSr9ZjPrF2p/3xWz+wqKXJJBECh\n/Q+NfLkk+zf/UDsipA/YE1MOEwKBgQDQGQX9c425L2jbs8PPneXjdu/SIvsntlcw\nMhBNHeLwbC81eBBjLtBcj+SLglPZf4XhFOOzpqMpLg44aZ0v8BixhALEronMCR/H\nYQjJ/Yan13yCfKmnnf955rwHkpSdaJ/oLgrfXNd/+2dxAyou5wTKDr3RA/OQiNG2\n230gnSKgZwKBgDBnAuj5n5B83MALpCheHD+Th7wuGi6kNPylWtbX+8kUYGmUynv3\nH6TDqMlxG0SbQ2a0a772685nrUxVWeqp2hTa91a03cs+Swki6DnV5+du6ncpacSG\nO1V5zAUr/xQFFebMxvTyAd+VcakQDwCmroHjmmvCQRSmi07jvLf3iGZ9AoGAOCEX\nwYZCitmj0ebKAR0Y3eK9yxNOZSbEm6ZVSUevZ6P2k9h/qxD8eIsDXTHZBghkhxKI\nXHOs/LWEdmjeUgjT0EXILV7aoiMv5CpjIYB1qp3v4o5XgHOYbjvzKaO63D5VK14H\n5rl3EvkvrIbrAN2lKA8T2eXT839D+at4M6zOoy8CgYBj7kRkQKAeM1WEvkoCAd7V\nodozBSx3GhymldwYreA/HAZ9h9IA2rd1+kIkucSSAan0DD7I5SNWYzpbNbahlGHN\nsKmRSfSoV2HAanreXwsI1kbYaFsb1f2lMfOTa6NBeZj/MqFDkRqOnr76Qsho+JdD\nceMl3kSXvRvnfydcSCjMkQ==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-tb7ne@coder-60a60.iam.gserviceaccount.com",
        "client_id": "116879188130800244075",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-tb7ne%40coder-60a60.iam.gserviceaccount.com"
    },

    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: './DB/proyectoFinal.sqlite'
        },
        useNullAsDefault: true
    },

    mariaDB: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'coderhouse',
            password: 'coderhouse',
            database: {
                prod: 'productos', 
                cart: 'carritos'
            }
        }
    }
}