import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import * as AWS from "./aws";

(async () => {

  // Init the Express application
  const app = express();
  const multer  = require('multer')

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // TODO - First write a req to get the image via query params provided
  // TODO - Send the resulting file to the storage bucket associated with the elastic bean
  // TODO - Use the delete helper function to delete any files stored on the server during this process
  // All this should be done in conjunction with the elastic bean server


  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]
  /**************************************************************************** */

  // Function to send the file to the S3 bucket
  async function sendFilesToBucket(file:string) {
    const path = file.split("/")
    const filename = path.pop()
    const rmy_pop = path.join(",")
    const extension = filename.split(".").pop()
    // const upload = multer({ dest: `${path.join(",").replace(",","/")}/` })
    try{
      const send_item = AWS.getPutSignedUrl(filename)
      const url_path =  AWS.getGetSignedUrl(send_item)
      // a post request of the image with a valid signed-url
      // app.post(url_path, upload.single(filename),async (req:Request,res:Response) => {
      //   return res.status(200)
      //       .contentType(`${extension == 'jpg'} ? image/jpeg : image/${extension}`)
      //       .send(`Successfully uploaded image: ${path}/${filename}`)
      // })
      const lerrf = rmy_pop.replace(",","/")
      console.log(`Filename: ${filename}, Path: ${lerrf}, Extension: ${extension}`);

    }catch (err){
      console.error(err)
    }
  }







  
  app.get("/filteredimage/",async(req:Request,res:Response) => {
    let {imageUrl} = req.query
    const arrayOfFiles = [] 
    if (!imageUrl){
      res.status(404).send(`ImageURL: ${imageUrl} cannot be found.`)
    }
    // This downloads the image and prepends it with a file path
    const result = await filterImageFromURL(imageUrl)
    arrayOfFiles.push(result)

    // Send the files to the S3 bucket
    // logic to upload the file
    const path = result.split("/")
    const filename = path.pop()
    const send_item = AWS.getPutSignedUrl(filename)
    const url_path =  AWS.getGetSignedUrl(send_item)
    if(url_path){
      console.log("I am here!");
      console.log("Path:"+url_path);
      app.post(url_path, (req:Request,res:Response) => {
        res.sendFile(__dirname+"/util/tmp/"+filename, function (err:Error){
          if(err){
            res.status(400).send("Malformed File")
          }
          // await deleteLocalFiles(arrayOfFiles)
          res.status(201).send("Image sent!")
        });
      })
    }
    await deleteLocalFiles(arrayOfFiles)
    console.log("Done with process!");
  });

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  });
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();