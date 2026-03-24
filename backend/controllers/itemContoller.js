const { addItem, fetchItems, fetchItemById, isValid, findUser, uploadNewItem, updateIsSold, updateUserListings } = require("../db/dbFunction");

// async function handleAddItems(req, res) {
//     const {title, price, category, condition, description, images, tags, owner} = req.body;

//     const item = await addItem(title, price, category, condition, description, images, tags, owner);

//     res.json(item);
// }

async function handleFetchItems(req, res) {
    try {
        const {q:query='', page=1, limit=5} = req.query;
        console.log(query);

        const {items, total, skipped} = await fetchItems(query, Number(page), Number(limit));
        const hasMore = items.length + skipped < total;

        res.status(200).json({items, hasMore});
    } catch(err) {
        console.log(`Error at handleFetchItems Controller - ${err}`);
        res.status(400).json({error: 'Somethng went wrong. Try again later.'});
    }
}

async function handleFetchOneItem(req, res) {
    try {
        const {id} = req.params;
        if(!id) {
            return res.status(400).json({error: 'Invalid Item id'});
        }

        if (!isValid(id)) {
            return res.status(400).json({error: 'Invalid Item id'});
        }
        
        const item = await fetchItemById(id);
        res.status(200).json(item);
    } catch(err) {
        console.log(`Error at handleFetchOneItem Controller - ${err}`);
        res.status(400).json({error: 'Somethng went wrong. Try again later.'});
    }
}

async function handleUploadItem(req, res) {
    try {
        const {username} = req;
        const user = await findUser(username);
        if (!user) {
            return res.status(400).json({error: 'Invalid Token'});
        }

        const {itemData} = req.body;
        if (!itemData) {
            return res.status(400).json({error: "Invalid Data"});
        }

        const item = await uploadNewItem({...itemData, owner: user._id});
        await updateUserListings(user._id, item._id);

        res.status(200).json({msg: "Item uploaded Successfully", itemID: item._id});
    } catch(err) {
        console.log(`Error at handleUploadItem Controller - ${err}`);
        res.status(400).json({error: 'Somethng went wrong. Try again later.'});
    }
}

async function handleUpdateIsSold(req, res) {
    const {userID} = req;
    const {id, isSold} = req.body;

    if (!id) {
        return res.status(400).json({error: "Invalid data"});
    }

    const result = await updateIsSold(id, isSold);
    console.log(result);
    if (result.matchedCount === 0) {
        return res.status(401).json({error: 'Invalid token'});
    }

    return res.status(200).json({msg: 'Updated successfully'});

}

module.exports = { 
    handleFetchItems, handleFetchOneItem, handleUploadItem,
    handleUpdateIsSold,
};