module.exports = {
    addSets: (req, res) => {
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
    // ============== this will add a set from UI ============================
    addSet: (req, res) => {
        const dbInstance = req.app.get('db');

// destructure req body
        const {id, title, creatorname, creatorid, numofterms, description, cards} = req.body;

// map through cards on req body and format them for database
        const terms = cards.map( card => {
            return {
                id: card.id,
                setid: id,
                term: card.term,
                definition: (card.definition) ? card.definition : '',
                imageurl: (card.imageurl) ? card.imageurl : null
            }
        } );

// insert set info to set table
// then insert cards into cards table
// then sent response status, message, and catch
    dbInstance.sets.insert({
        id,
        title,
        creatorname,
        creatorid,
        numofterms,
        description
    })
    .then( () => dbInstance.cards.insert(terms) )
    .then( () => res.status(200).send('set and cards added') ).catch(console.error, 'Error');

},
    getSetInfo: (req, res) => {
        const dbInstance = req.app.get('db');

        // find a single set with a matching criteria object of req.params.id
        dbInstance.sets.find({id: req.params.id}).then(response => res.status(200).send(response)).catch(console.error, 'Error');
    },
    getCards: (req, res) => {
        const dbInstance = req.app.get('db');

        // then find the cards with a matching setid 
        dbInstance.cards.find({setid: req.params.id}).then(response => res.status(200).send(response)).catch(console.error, 'Error');
    }
}