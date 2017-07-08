module.exports = {
    addSets: (req, res) => {
        const dbInstance = req.app.get('db');
        const {id, title, created_by, creator_id, term_count, description} = req.body;

        
       const terms = req.body.terms.map( (term) => {
            return {
                id: term.id,
                setid: id,
                term: term.term,
                definition: term.definition,
                imageurl: (term.image) ? term.image.url: null
            }
        } );

        dbInstance.sets.insert({
            id,
            title,
            creatorname: created_by,
            creatorid: creator_id,
            numofterms: term_count,
            description
        })
        .then(() => dbInstance.cards.insert(terms))
        .then( () => res.status(200).send() ).catch(console.error);
    },
    getSets: (req, res) => {
        
    }
}