var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var port = process.env.PORT || 8080;

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://dbCS20:wp20020302@cluster0.ryv6f.mongodb.net/dbCS20?retryWrites=true&w=majority";


http.createServer(function (req, res) 
  {
	  
	  if (req.url == "/")
	  {
		  file = 'https://winniewyl.github.io/StockTicker/ST_interface.html';
		  fs.readFile(file, function(err, txt) {
    	  res.writeHead(200, {'Content-Type': 'text/html'});
		//   res.write("This is the home page<br>");
          res.write(txt);
          res.end();
		  });
	  }
	  else if (req.url == "/process")
	  {
		 res.writeHead(200, {'Content-Type':'text/html'});
		 res.write ("Here is the sorting result<br>");
		 pdata = "";
		 req.on('data', data => {
           pdata += data.toString();
         });

		// when complete POST data is received
		req.on('end', () => {
			pdata = qs.parse(pdata);
            user_selected = pdata['selection'];
            user_input = pdata['user_input'];
            if (user_selected == "Company Name") {
                theQuery = {Company: user_input};
            } else if (user_selected == "Stock Ticker") {
                theQuery = {Ticker: user_input}; 
            }

            res.write("User chooses: " + user_selected);
			res.write ("User Input is: "+ user_input);


            return_arr = [];
            

            
	res.end();
            // if (user_selected == "Company Name") {
                
            //     res.write("Company Name: " + user_input + "<br>");
            //     res.write(return_arr[0] + "<br>");
            // } else if (user_selected == "Stock Ticker") {
                
            //     res.write("Ticker: " + user_input + "<br>");
            //     res.write("Company Names: " + "<br>");
            //     for (i = 0; i < return_arr.length; i++) {
            //         res.write(return_arr[i]);
            //     }
            // }
			
		});
		
	  }
	  else 
	  {
		  res.writeHead(200, {'Content-Type':'text/html'});
		  res.write ("Unknown page request");
		  res.end();
	  }
  

}).listen(port);
