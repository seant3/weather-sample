import Weather from "../models/Weather.js";

export default {
  create,
};

async function create(req, res) {
    console.log('create controller firing')
  const weather = new Weather(req.body);
  try {
    await weather.save();
    res.send("Saved to DB");
  } catch (err) {
    res.status(400).send("Did not save to DB");
  }
}
