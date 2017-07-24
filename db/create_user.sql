INSERT INTO users(id, username, profileimage)
VALUES ($1, $2, $3)
RETURNING *;