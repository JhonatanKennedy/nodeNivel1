const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;
  
  const repository = {
    id: uuid(),
    title: title,
    url: url,
    techs: techs,
    likes: 0
  };
  repositories.push(repository)
  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params
  const {title, url, techs} = request.body;

  const indexRepo = repositories.findIndex(repository => repository.id === id)

    if(indexRepo<0){
      return response.status(400).json({error:'Repo não encontrado!'})
    }

    const repository = {
      id: id,
      title: title,
      url: url,
      techs: techs,
      likes: repositories[indexRepo].likes
    }
    repositories[indexRepo] = repository
  return response.json(repository) 
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params
  
  const indexRepo = repositories.findIndex(repository => repository.id === id)

   if(indexRepo < 0 ){
     return response.status(400).json({error:'Repo não encontrado!'})
   }

   repositories.splice(indexRepo,1)
   
   return response.status(204).send()

});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params
  const {like} = request.query
  const indexRepo = repositories.findIndex(repository => repository.id ===id)

  if(indexRepo < 0){
    return response.status(400).json({error:'Repo não encontrado!'})
  }
  repositories[indexRepo].likes++

  return response.status(200).json(repositories[indexRepo])

});

module.exports = app;
