function convertToJson(response){
    return response.json();

}  

function showInfo(data){
    const coin_img  = document.getElementById('coin_img');
    coin_img.src    = data.image.large;
    const coin_name = document.getElementById('coin_name');
    coin_name.innerText = data.name;
    const coin_description = document.getElementById('coin_description');
    coin_description.innerHTML = data.description.en;
    //DOM Manupulation
    //innerhtml used inorder to show blue link in description i.e anchor tag.
    //console.log(data.image.large);
   // console.log(data);
}


function showPrice(data){
    const inr_price = document.getElementById('inr_price');
    const usd_price = document.getElementById('usd_price');
    const eur_price = document.getElementById('eur_price');

    inr_price.innerText = data[coin_key].inr; //object and arrays.
    usd_price.innerText = data[coin_key].usd; //kuki hum nhi pata konsa key hai user ko chaheye i,e bitcoin,stellar,etc.. that why we array.
    eur_price.innerText = data[coin_key].eur;
    //console.log(data);
}


function showHistory(data){
    //console.log(data);
    showGraph(data);
}

var url    = new URL(window.location.href);  //http://127.0.0.1:5500/CryptoView/search.html?q=abcd
var params = new URLSearchParams(url.search);  //q=abcd
let coin_key  = params.get("coin");
//console.log(coin_key);  



//description api
fetch(`https://api.coingecko.com/api/v3/coins/${coin_key}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`).then(convertToJson).then(showInfo);

//inr,eur,usd --- price
fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin_key}&vs_currencies=inr%2Ceur%2Cusd`).then(convertToJson).then(showPrice);

// market history data for 7 day 7*24=169 i.e 169
fetch(`https://api.coingecko.com/api/v3/coins/${coin_key}/market_chart?vs_currency=inr&days=14&interval=daily`).then(convertToJson).then(showHistory);


function convertUnixToReadable(timestamp){
const date = new Date(timestamp); //Date is a build in class in JS.
const date_string = date.getDate();
var month_string = "0" + date.getMonth() ;

var readable = date_string + ' - ' + month_string ;
return readable;

}


function showGraph(history_data) {
    //console.log(history_data.prices);

    let labels = [];
    let prices = [];

    for(let i = 0; i< history_data.prices.length; i += 1){
      const single_price = history_data.prices[i];
      
      const readable_label = convertUnixToReadable(single_price[0]);
      labels.push(readable_label);
      prices.push(single_price[1]);
      //console.log(single_price);
    }
    console.log(history_data.prices);
    //console.log(labels);
    //console.log(prices);


    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Price (in INR)',
                data: prices,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,

                },
                    //grid: {      //in order to remove background grid strcture from graph.
                        //display: false,
                   // }
                    
                   
                   // x: {
                        //grid: {
                        //   display: false,
                       // }
                
            }
        }
    });
    

}


