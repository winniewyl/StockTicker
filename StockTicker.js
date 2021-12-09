var http = require('http');
var fs = require('fs');

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://dbCS20:wp20020302@cluster0.ryv6f.mongodb.net/dbCS20?retryWrites=true&w=majority";
var CT_arr = [];
var company_arr = [];
var ticker_arr = [];

//read csv file
fs.createReadStream('./Downloads/companies.csv').on('data', function(row) {
    var query = row.toString();
    CT_arr = query.split('\r\n');  
    CT_arr.pop();
    console.log(CT_arr);

    CT_arr.forEach(element => {
        var query;
        query = element.split(',');
        company_arr.push(query[0]);
        ticker_arr.push(query[1]);
    });


    MongoClient.connect(url, {useUnifiedTopology: true}, async function(err, db) {
        if (err) {
            console.log("Connection error: " + err);
            return;
        } else {
            
            console.log("database connected successfully");          
        }

        var dbo = db.db('StockTicker');
        var insert_arr = [];
        for (i = 1; i < company_arr.length; i++) {
            new_query = {"Company": company_arr[i], "Ticker": ticker_arr[i]};
            insert_arr.push(new_query);
        }
        
        await dbo.collection("companies").insertMany(insert_arr, function(err, res) {
            if (err) {
                console.log("query error: " + err);
                return;
            }
            
            console.log("insert successfully");
        }); 
        

        await db.close();      
    })

    

})

.on('end', () => {
    console.log("csv file processed successfully");
})

    



// http.createServer(function (req, res) {

    


//     // res.writeHead(200, {'Content-Type' : 'text/html'});
//     // res.write("Hello!!!!!");
//     // res.end();

// }).listen(8080);