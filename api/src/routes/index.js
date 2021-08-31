const { Router } = require('express');
/// Importar todos los routers;
/// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios')

///Me traigo las tablas de la base de datos
const {
    Country,
    Activity,
    countries_activities
} = require('../db.js');

const {Op} = require('sequelize');


const router = Router();
/// Funcion para traer la data de la api a la base de datos

// const loadData = async() =>{
//     try {                               
//     const arrdata = await axios.get('https://restcountries.eu/rest/v2/all')
//     const apiInfo = await arrdata.data.map(el =>{
//         return{
//             id: el.alpha3Code,
//             name : el.name,
//             flag : el.flag,
//             capital: el.capital,
//             subregion : el.subregion,
//             area : el.area,
//             population: el.population
//         }
//     })
//   ///  console.log("Api info", apiInfo)
//     return apiInfo
//     } catch (error) {
//         console.log(error)
//     }
// } 

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/countries', async function (req,res) {
///
let name = req.query.name
///
// const allCountries = await loadData()

// // try {
// //     //traigo los datos de mi bd 
// //     const countAll = await Country.findAndCountAll()
// //     console.log('esto es el lenght de todos los countries', countAll.count)
// //     if(countAll.count < 1){ 
// //         console.log('entre al if')
// //         await Country.bulkCreate(allCountries)
// //     }
// // } catch (error) {
// //     console.log(error)
// }

/// si hay name
if(name){
    try {
        let CountryName = await Country.findAll({
            where:{
                name:{
                    [Op.iLike]: '%' + name +'%'
                }
            }
        })
       console.log('esto es CountryName lenght', CountryName.length)
        if(!CountryName.length){
            return res.status(404).json('No existe pais con ese nombre')
        }
        else{
            return res.status(200).json(CountryName)
        }
    } catch (error) {
        console.log(error)
    }
}
/// si no hay name muestro en pantalla
else{
    try {
        const countrys = await Country.findAll()

        res.json(countrys)
    } catch (error) {
        console.log(error)
    }    
}
})


///GET /countries/{idPais}

router.get('/countries/:id', async function(req,res){
    ///
    const id = req.params.id
    ///
    try {
        //Variable con el model Country 
        const Find = await Country.findAll({
            where:{
                id: id
            },
            incluide:{
                model: Activity,
            }
        })
    //console.log('esto es Find', Find)
    if(Find){
        res.json(Find)
    }
    else{
        res.status(404).render("Error id no aceptado")
    }
    } catch (error) {
        console.log(error)
    }
})
//setACountry
router.post('/activity', async function(req,res){
    const {name,dificulty,duration,season,countryid} = req.body
    try {
        if(name && dificulty && duration && season){
           let activityCreated = await Activity.create({
                    name,
                     dificulty ,
                     duration ,
                     season,
              })
            try {
                let country = await Country.findAll({
                    where:{
                        id : countryid
                    }
                })
                await activityCreated.addCountries(country)
                res.send('actividad creada')
            } catch (error) {
                console.log(error)
            }
        }
        else{
            res.status(404).render("Error no ingresaste los campos correctamente")
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
