const Tech = require('../models/Tech')

module.exports = {
    async store(req, res) {
      const { techName } = req.body
      const { techCategory } = req.body

      const tech = await Tech.create({ 
        techName, 
        techCategory 
      })

      return res.json(tech)
    },

    async index(req, res) {
      let tech = null
      if (req.query.category != undefined){
          const { category } = req.query

          tech = await Tech.find({ techCategory: category })

      } else{
        tech = await Tech.find({})
      }
      return res.json(tech)
  },
}