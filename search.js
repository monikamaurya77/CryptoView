function convertToJson(response){
    return response.json();
}

function showResult(data){
    const tbody_elem = document.getElementById("search_result");

   // console.log(data.coins);
    for( i = 0; i < data.coins.length; i +=1 ){
        const single_data = data.coins[i];


        const new_row  = document.createElement('tr');

        const new_id   = document.createElement('td');
        const new_logo = document.createElement('td');
        const new_name = document.createElement('td');
        const new_link = document.createElement('td');

        const new_img  = document.createElement('img');
        const new_a    = document.createElement('a');

        new_id.innerText   = i+1;
        new_img.src        = single_data.thumb;
        new_logo.appendChild(new_img);
        new_name.innerText = single_data.name + "(" + single_data.symbol + ")";
        new_a.innerText = "Show More";
        new_a.href = `details.html?coin=${single_data.id}`;   //http://127.0.0.1:5500/CryptoView/ nhi likha kuki yeh jab hum githube ya kahi pe host karege toh voh url change hoga or ye jo url hai yeh humhare local server ka hai.
        new_link.appendChild(new_a);


        new_row.appendChild(new_id);
        new_row.appendChild(new_logo);
        new_row.appendChild(new_name);
        new_row.appendChild(new_link);


        tbody_elem.appendChild(new_row);
        //console.log(single_data);
    }
}

const search_field = document.getElementById('search_field'); //taken reference.

var url    = new URL(window.location.href);  //http://127.0.0.1:5500/CryptoView/search.html?q=abcd
var params = new URLSearchParams(url.search);  //q=abcd
let search_key  = params.get("q");             //abcd

search_field.value = search_key; //inorder to show it on input after search.
//console.log(search_item);

//console.log(window.location.href);

fetch(`https://api.coingecko.com/api/v3/search?query=${search_key}`).then(convertToJson).then(showResult);