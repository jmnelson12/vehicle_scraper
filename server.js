const express = require('express');
const helmet = require('helmet')
const cors = require('cors');
const app = express();

const port = process.env.PORT || 8080;
const { getAutoTempestResults } = require('./lib/tempest');
const { auto } = require('./lib/cron');

app.use(cors());
app.use(helmet());
app.disable('x-powered-by');

app.get('/getVehicles', async (req, res, next) => {
    console.log("--------------------");
    console.log("GETTING VEHICLES");
    const { params } = req.params;

    const autoTempestResults = await getAutoTempestResults(params);

    console.log("DONE GETTING VEHICLES");
    console.log("--------------------\n");

    res.json({
        vehicles: autoTempestResults
    })
});

app.get(`/startCron`, (req, res, next) => {
    const init = auto("*/10 * * * * *");
    init.leCron().start();

    return res.json("success");
});

// async function testing() {
//     const autoTempestResults = await getAutoTempestResults();
//     console.log(autoTempestResults);
// }
// testing();


app.listen(port, () => console.log(`Server started on port: ${port}`));