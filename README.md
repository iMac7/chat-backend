# chat-backend
A backend for a full stack chat application, (frontend in the chat-backend repo)

This is a node application that uses the MVC format and RESTful APIs. It includes:
  -server.js - the main server file. it connects to the mongodb database via the mongoose library and also contains the port the server runs on.
    Run this file to start the server.
    
  -Authentication is done with json web tokens stored in the browser. authentication code found in controllers/authcontrollers.js
    
  -MVC in respectively named folders. views are, however, not included because the application is rendered client side.
    Models in models folder. Reply model is available in the Post.js model
    Controller functions in controllers folder whose routes are available in routes folder.
    
  -Mongodb operations handled by mongoose
  
  -File uploads are stored in the uploads/images folder, handled by multer.
  
  
    
  
  
  
