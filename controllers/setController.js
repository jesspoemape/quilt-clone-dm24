module.exports = {
    addSets: (req, res) => {
        const dbInstance = req.app.get('db');
        const {id, title, created_by, creator_id, term_count, description} = req.body;

        let termIds = [];
        let termTerms = [];
        let termDefs = [];
        let termImages = [];

        for (let i = 0; i < term_count; i++) {
            termIds.push(req.body.terms[i].id);
            termTerms.push(req.body.terms[i].term);
            termDefs.push(req.body.terms[i].definition);
            termImages.push(req.body.terms[i].image);
        }

        dbInstance.addSets( [id, title, created_by, creator_id, term_count, description, termIds, termTerms, termDefs, termImages] )
            .then( () => res.status(200).send() )
            .catch( () => res.status(500).send() );
    },
    getSets: (req, res) => {
        
    }
}