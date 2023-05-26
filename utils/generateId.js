

function generateUserId() {
	const highestId = db.data.users.reduce((maxId, currentUser) => {
		return Math.max(maxId, currentUser.id) 
	}, 0)
	
	return highestId + 1 
	
}

export {generateUserId}