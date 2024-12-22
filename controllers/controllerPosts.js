const connection = require('../data/db');

function index(req, res) {

    const sql = 'SELECT * FROM `posts`';

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    })


};

function show(req, res) {
    const { id } = req.params;

    const postSql = 'SELECT * FROM `posts` WHERE id = ?';

    const tagSql = `
    SELECT tags.label 
    FROM tags 
    JOIN post_tag 
    ON tags.id = post_tag.tag_id 
    WHERE post_id = ?
    `;

    connection.query(postSql, [id], (err, postResult) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (postResult.length === 0) return res.status(404).json({ error: 'Post not found' });

        const post = postResult[0];

        connection.query(tagSql, [id], (err, tagResult) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });

            post.tags = tagResult;
            res.json(post);
        })

    });
};

function store(req, res) {
    const lastIndex = postsArray.at(-1).id;

    const { title, content, image, tags, published } = req.body;
    const newImage = image === "" ? '/img/placeholder.png' : image;
    const newPost = {
        id: lastIndex + 1,
        title,
        content,
        image: newImage,
        tags,
        published
    }

    postsArray.push(newPost);
    res.status(201);

    res.json(newPost);
    console.log(postsArray);
};

function update(req, res) {
    let post = req.post;

    const { title, content, image, tags, published } = req.body;
    post.title = title,
        post.content = content,
        post.image = image,
        post.tags = tags
    post.published = published

    console.log(postsArray);
    res.json(post);
};

function modify(req, res) {
    let post = req.post;

    const { title, content, image, tags, published } = req.body;

    if (title) post.title = title;
    if (content) post.content = content;
    if (image) post.image = image;
    if (tags) post.tags = tags;
    if (published) post.published = published;

    res.json(post);
    console.log(postsArray);
};

function destroy(req, res) {

    const { id } = req.params;

    connection.query('DELETE FROM posts WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete post' });
        res.sendStatus(204)
    });
};


module.exports = { index, show, store, update, modify, destroy };