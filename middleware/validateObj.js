// ************validazione ***********
function validateObj(req, res, next) {
	const { title, content, image, tags, published } = req.body;
	const errors = [];

	if (!title) {
		errors.push('Title is required');
	};
	if (typeof published === 'undefined') {
		errors.push('Published is required');
	};
	if (!content) {
		errors.push('Content is required');
	};
	if (!tags) {
		errors.push('Tags is required');
	};

	if (errors.length) {
		res.status(400);
		return res.json({
			error: 'Invalid request',
			messages: errors,
		});
	};

	next();
};

module.exports = validateObj;