insert into sets (id, title, creatorName, creatorId, numOfTerms, description) values ($1, $2, $3, $4, $5, $6);
insert into cards (id, setId, term, definition, imageUrl) values ($7, $1, $8, $9, $10);