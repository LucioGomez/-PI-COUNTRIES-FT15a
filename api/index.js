//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const axios = require('axios')
const {
  Country,
} = require('./src/db.js');
// Syncing all the models at once.
conn.sync({ force: true }).then(async () => { 
  try {                               
    const arrdata = await axios.get('https://restcountries.eu/rest/v2/all')
    const apiInfo = await arrdata.data.map((el) =>{
        return{
            id: el.alpha3Code,
            name : el.name,
            flag : el.flag,
            capital: el.capital,
            subregion : el.subregion,
            area : el.area,
            population: el.population
        }
      })
      await Country.bulkCreate(apiInfo)
      console.log('conectado a la BD')
  ///  console.log("Api info", apiInfo)
    } catch (error) {
        console.log(error)
    }
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
