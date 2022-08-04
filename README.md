# Udagram Image Filtering Microservice

Udagram is a simple cloud application developed alongside the Udacity Cloud Engineering Nanodegree. It allows users to register and log into a web client, post photos to the feed, and process photos using an image filtering microservice.


 [The Image Filtering Microservice](https://github.com/udacity/cloud-developer/tree/master/course-02/project/image-filter-starter-code), the final project for the course. It is a Node-Express application which runs a simple script to process images. [Your assignment - Done]

## Tasks

✅ Setup Node Environment

You'll need to create a new node server. Open a new terminal within the project directory and run:

1. Initialize a new project: `npm i`
2. run the development server with `npm run dev`

✅ Create a new endpoint in the server.ts file

The starter code has a task for you to complete an endpoint in `./src/server.ts` which uses query parameter to download an image from a public URL, filter the image, and return the result.

We've included a few helper functions to handle some of these concepts and we're importing it for you at the top of the `./src/server.ts`  file.

```typescript
import {filterImageFromURL, deleteLocalFiles} from './util/util';
```

✅ Deploying your system - System has been deployed to elastic bean

Follow the process described in the course to `eb init` a new application and `eb create` a new environment to deploy your image-filter service! Don't forget you can use `eb deploy` to push changes.


### Link to ElasticBean url: image-filter-microservice-elvis-dev.us-east-1.elasticbeanstalk.com

### Sample Query for an image using elastic bean: 
`image-filter-microservice-elvis-dev.us-east-1.elasticbeanstalk.com/filteredImage?imageUrl=https://th.bing.com/th/id/R.3cd1b099bdbd00288a82e96fe05e10f3?rik=Q9oB8p%2fk%2bZPQXA%26riu=http%3a%2f%2fimages2.fanpop.com%2fimages%2fphotos%2f6800000%2fSpace-space-6899356-1600-1200.jpg%26ehk=ETTJDARdceC8FQwuhdIElsE0Bhk%2fGoaWYl9fYC5xnEw%3d%26risl=%26pid=ImgRaw%26r=0`.com

### Sample Query for an image using localhost: 
* After `npm i`
* You can start the project using `http://localhost:8082/filteredImage?imageUrl=https://th.bing.com/th/id/R.3cd1b099bdbd00288a82e96fe05e10f3?rik=Q9oB8p%2fk%2bZPQXA%26riu=http%3a%2f%2fimages2.fanpop.com%2fimages%2fphotos%2f6800000%2fSpace-space-6899356-1600-1200.jpg%26ehk=ETTJDARdceC8FQwuhdIElsE0Bhk%2fGoaWYl9fYC5xnEw%3d%26risl=%26pid=ImgRaw%26r=0`

