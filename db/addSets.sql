insert into sets (id, title, creatorName, creatorId, numOfTerms, description) values ($1, $2, $3, $4, $5, $6);

FOR i IN 0..($5 - 1) LOOP
insert into cards (id, setId, term, definition, imageUrl, imageWidth, imageHeight) values ($7[i], $1, $8[i], $9[i], $10[i], $11[i], $12[i]);
END LOOP; 

-- $7 is term ids
-- $8 is term terms
-- $9 is term defs
-- $10 is term images urls
-- $11 is term image width
-- $12 is term image height