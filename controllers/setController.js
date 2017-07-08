module.exports = {
    addSets: (req, res) => {
        const dbInstance = req.app.get('db');
        const {id, title, created_by, creator_id, term_count, description} = req.body;

        let termIds = [];
        let termTerms = [];
        let termDefs = [];
        let termImageUrls = [];
        let termImageWids = [];
        let termImageHeis = [];

        for (let i = 0; i < term_count; i++) {
            termIds.push(req.body.terms[i].id);
            termTerms.push(req.body.terms[i].term);
            termDefs.push(req.body.terms[i].definition);

            if (req.body.terms[i].image) {
                termImageUrls.push(req.body.terms[i].image.url);
                termImageHeis.push(req.body.terms[i].image.height);
                termImageWids.push(req.body.terms[i].image.width);
            }
            else {
                termImageHeis.push('null');
                termImageWids.push('null');
                termImageUrls.push('null');
            }
        }

        dbInstance.addSets( [id, title, created_by, creator_id, term_count, description, termIds, termTerms, termDefs, termImageUrls, termImageWids, termImageHeis] )
            .then( () => res.status(200).send() )
            .catch( () => res.status(500).send() );
    },
    getSets: (req, res) => {
        
    }
}