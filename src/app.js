const express = require('express');
const cors = require('cors');

const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/repositories', (request, response) => {
  return response.json(repositories);
});

app.post('/repositories', (request, response) => {
  const { title, url, techs } = request.body;

  const repository = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repository);

  return response.json(repository);
});

app.put('/repositories/:id', (request, response) => {
  const { id } = request.params;
  const { title, techs, url } = request.body;

  try {
    const repositorieIndex = repositories.findIndex((e) => e.id === id);
    repositorieIndex === -1
      ? (function () {
          throw 'error';
        })()
      : null;
    const repositorie = {
      id,
      title,
      url,
      techs,
      likes: repositories[repositorieIndex].likes,
    };
    repositories[repositorieIndex] = repositorie;
    return response.json(repositories[repositorieIndex]);
  } catch (error) {
    return response
      .status(400)
      .json({ error: 'Repositorie not found', msg: error });
  }
});

app.delete('/repositories/:id', (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found.' });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post('/repositories/:id/like', (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found.' });
  }

  const repositorieIndex = repositories.findIndex((e) => e.id === id);
  repositorieIndex === -1
    ? (function () {
        throw 'error';
      })()
    : null;
  repositories[repositorieIndex].likes += 1;

  return response.json(repositories[repositorieIndex]);
});

module.exports = app;
