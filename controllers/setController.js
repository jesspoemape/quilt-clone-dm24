module.exports = {
    getSets: (req, res) => {
        const dbInstance = req.app.get('db');
        const {id, title, created_by} = res.body;

        dbInstance.getSets( [id, title, created_by] )
            .then( () => res.status(200).send() )
            .catch( () => res.status(500).send() );
    }
}