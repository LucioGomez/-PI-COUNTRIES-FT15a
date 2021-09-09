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

const {Op, or} = require('sequelize');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/countries', async function (req,res) {
///
let {name,filterby, orderby} = req.query

///
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
else if(filterby&&orderby){
  try {
      if(orderby){
      const CountryPupulationOrderyByASC=  await Country.findAll({
          order:[[req.query.filterby, req.query.orderby]],
          include:{
            model: Activity
          }
      })
      res.json(CountryPupulationOrderyByASC)
    }
  }  
    catch (error) {
        console.log(error)
  } 
}
else{
    try {
   //     let orderby = req.query.orderby
    //console.log(orderby)
        const countrys = await Country.findAll({ 
            // limit:9,
            // offset : req.query.page,
            order:[['name']], //asc /desc
            include:{
               model: Activity
            }
        })
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
            include:{
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
    const {name,difficulty,duration,season,countryid} = req.body
    try {
        if(name && difficulty && duration && season){
           let activityCreated = await Activity.create({
                    name,
                     difficulty ,
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
                res.send('Actividad creada')
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
