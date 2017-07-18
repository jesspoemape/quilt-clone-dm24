module.exports = {
    addSets: (req, res) => {
        var random = Math.floor((Math.random() * 201557593) + 1);
        const dbInstance = req.app.get('db');

        const {id, title, created_by, creator_id, term_count, description} = req.body;

        
       const terms = req.body.terms.map( (term) => {
            return {
                id: term.id,
                setid: id,
                term: term.term,
                definition: (term.definition) ? term.definition : "",
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
        .then( () => dbInstance.cards.insert(terms) )
        .then( () => res.status(200).send('set and cards added') ).catch(console.error, "Error");
    },
    getSets: (req, res) => {
        
    },
    addSet: (req, res) => {
        const dbInstance = req.app.get('db');

        
    }
}