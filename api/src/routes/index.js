require("dotenv").config();
const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { YOUR_API_KEY } = process.env;
const { Dog, Temperament } = require("../db");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// necesario => img, nombre, temperamento, peso, altura, años de vida, id

const getApiData = async () => {
  const apiUrl = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
  );
  const apiInfo = await apiUrl.data.map((e) => {
    return {
      name: e.name,
      id: e.id,
      image: e.image.url,
      temperament: e.temperament,
      weight: e.weight.metric,
      height: e.height.metric,
      life_span: e.life_span,
    };
  });
  return apiInfo;
};

const getDbData = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllData = async () => {
  const apiInfo = await getApiData();
  const dbInfo = await getDbData();
  const totalInfo = apiInfo.concat(dbInfo);
  return totalInfo;
};

// --- RUTAS ---

// GET /dogs & GET /dogs?name=
router.get("/dogs", async (req, res) => {
  const name = req.query.name;
  let dogsTotal = await getAllData();
  if (name) {
    let dogName = await dogsTotal.filter(
      (e) => e.name.toLowerCase().includes(name.toLowerCase()) 
    );
    dogName.length
      ? res.status(200).send(dogName)
      : res.status(404).send("The wanted dog was not found");
  } else {
    res.status(200).send(dogsTotal);
  }
});

// GET /temperament:
router.get("/temperament", async (req, res) => {
  const temperamentApi = (await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
  )).data
  
  let temperaments = temperamentApi.map((e) => e.temperament);
  temperaments = temperaments.join().split(","); // es un array que en cada posicion tiene varios temperamentos separados por coma. Con join los uno y separo con split por la coma, en cada posicion del array me queda un temperamento.
  
  temperaments = temperaments.filter (e => e)
  
  temperaments = [...new Set (temperaments)].sort();//eliminar elementos duplicados, crea conjuntos de valores únicos. Paso el array como parámetro. Cuando se cree el conjunto se eliminarán automáticamente los valores duplicados.

  temperaments.forEach((e) => {
    Temperament.findOrCreate({
      where: { name: e },
    });
  });
  const allTemperaments = await Temperament.findAll();
  res.send(allTemperaments);
});

// GET /dogs/{idRaza}
router.get("/dogs/:id", async (req, res) => {
  const id = req.params.id;
  const dogsTotal = await getAllData();
  if (id) {
    let dogId = await dogsTotal.filter((e) => e.id == id);
    dogId.length
      ? res.status(200).json(dogId)
      : res.status(404).send("Not found");
  }
});

// // POST /dog
router.post("/dog", async (req, res) => {
  let { name, temperament, weight, height, life_span, image, createdDb } = req.body;
  try {
    let dogCreated = await Dog.create({
      name,
      weight,
      height,
      life_span,
      image,
      createdDb,
    });
    await dogCreated.setTemperaments(temperament)
    res.send("Your dog has been created!");
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;
