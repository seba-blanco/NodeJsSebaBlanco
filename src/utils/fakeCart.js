function fakeCart (userID) {    
   let cart = {
            "prods": [
                {
                    "id": 1,
                    "name": "Escuadra",
                    "description":"mira que lindo producto",
                    "timestamp":"1651621481714",
                    "price": 123.45,
                    "photo": "https://via.placeholder.com/15",
                    "stock": 2
                },
                {
                    "id": 2,
                    "name": "calculadora",
                    "description":"mira que lindo producto",
                    "timestamp":"1651621481714",
                    "price": 234.56,
                    "photo": "https://via.placeholder.com/15",
                    "stock": 3
                },
                {
                    "id": 5,
                    "name": "calculadora agregada",
                    "description":"mira que lindo producto",
                    "timestamp":"1651621481714",
                    "price": 234.56,
                    "photo": "https://via.placeholder.com/15",
                    "stock": 3
                }],
                "userID":userID
            }
return cart;
};

module.exports = {fakeCart};