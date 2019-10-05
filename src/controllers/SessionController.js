// index = listagem de sessão
// show = listar uma única sessão
// store = criar uma sessão
// update = atualizar uma sessão
// destroy = deletar uma sessão

const User = require('../models/User');

module.exports = {
    async store(req, res) {
        const { name } = req.body
        const { email } = req.body

        let user = await User.findOne({ email })

        if (!user) {
            user = await User.create({ name, email })
        }

        return res.json(user)
    }
}