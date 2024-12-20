const postsArray = require('../posts');

function index(req, res) {
    const queryTag = req.query.tag;
    const queryLimit = req.query.limit;
    const querySkip = req.query.skip;

    let postsFiltered = postsArray;

    if (req.query.tag) {
        postsFiltered = postsFiltered.filter((el) => el.tags.includes(queryTag));

        if (!postsFiltered) {
            res.status(404);
            return res.json({
                error: "Not Found",
                message: "Il post non è stato trovato"
            });
        };
    };

    if (req.query.skip) {
        postsFiltered = postsFiltered.filter((el, i) => i >= querySkip);


        if (!postsFiltered) {
            res.status(404);
            return res.json({
                error: "Not Found",
                message: "Il post non è stato trovato"
            });
        };
    };

    if (req.query.limit) {
        postsFiltered = postsFiltered.filter((el, i) => i < queryLimit);


        if (!postsFiltered) {
            res.status(404);
            return res.json({
                error: "Not Found",
                message: "Il post non è stato trovato"
            });
        };
    };


    res.json({ posts: postsFiltered, length: postsArray.length });

};

function show(req, res) {
    const key = req.params.key;
    let post = {};
    let currentPost = {};
    let prev = [];
    let next = [];

    if (isNaN(parseInt(key))) {
        post = postsArray.filter((el) => el.tags.includes(key));
    } else {
        const resPost = postsArray.filter((el) => el.id === parseInt(key));
        currentPost = resPost[0];
        const index = postsArray.findIndex((el) => (el === currentPost))
        postsArray.forEach((element, i) => {
            if (element !== currentPost) {
                i > index ? next.push(element) : prev.unshift(element);
            }
        });
        post = {
            currentPost,
            prev,
            next
        }
    };
    if (post) {
        res.json(post);
        console.log(post)
    } else {
        res.status(404);
        return res.json({
            error: "Not Found",
            message: "Il post non è stato trovato"
        });
    };

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
    const id = req.params.id;
    let postId;
    postId = postsArray.findIndex((el) => el.id === parseInt(id));
    postsArray.splice(postId, 1);



    if (!postId && postId !== 0) {
        res.status(404);
        return res.json({
            error: "Not Found",
            message: "Il post non è stato trovato"
        });
    };


    console.log(postsArray);

    res.status(204);
    res.send();
};


module.exports = { index, show, store, update, modify, destroy };