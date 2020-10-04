var xhr = new XMLHttpRequest();
xhr.open("POST", 'http://18.133.7.134:88/order', true);
xhr.setRequestHeader('Content-Type', 'application/json');


document.getElementById("demo").onclick = function() {
    console.log(23455);
    xhr.send(JSON.stringify({
            "method": "create",
            "login" : "test",
            "password":"pass",
            "params": {
                "order_id": "390384",
                "sale_date": "2020-10-04",
                "name": "телефон",
                "brand": "Samsung",
                "model": "S10",
                "serial": "AH",
                "color": "black",
                "price": "2000"}
        }
    ));
};
