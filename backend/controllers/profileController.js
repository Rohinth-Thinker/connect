const { findUser, addSavedItems, removeSavedItems, updateEditedProfile, getUserProfile, getAllUserProfiles, getUserProfilesWithPagination, getSavedItems, findUserByID, getUserItemListings, getUserItems, updateAvatar, isValid } = require("../db/dbFunction");

async function handleGetSavedItemsID(req, res) {
    try {
        const {username} = req;

        const user = await findUser(username);
        if (!user) {
            return res.status(401).json({error: 'Invalid token'});
        }
        
        res.status(200).json(user.savedItems);
    } catch(err) {
        console.log(`Error at handleGetSavedItemsID Controller - ${err}`)
        res.status(400).json({error: 'Something went wrong. Try again later.'});
    }
}

async function handleGetSavedItems(req, res) {
    try {
        const {userID} = req;
        const {page=1, limit=5} = req.query;

        const user = await findUserByID(userID);
        if (!user) {
            return res.status(401).json({error: 'Invalid token'});
        }
        
        const {items, total, skipped} = await getUserItems(user?.savedItems, Number(page), Number(limit));
        const hasMore = items.length + skipped < total;
        
        res.status(200).json({items, hasMore});
    } catch(err) {
        console.log(`Error at handleGetSavedItemsID Controller - ${err}`)
        res.status(400).json({error: 'Something went wrong. Try again later.'});
    }
}

async function handleGetUserItemListings(req, res) {
    try {
        const {userID} = req.params;
        const {page=1, limit=5} = req.query;

        if (!userID || !isValid(userID)) {
            return res.status(400).json({error: "Invalid ID"});
        }

        const user = await findUserByID(userID);
        if (!user) {
            return res.status(401).json({error: 'Invalid token'});
        }
        
        const {items, total, skipped} = await getUserItems(user?.listings, Number(page), Number(limit));
        const hasMore = items.length + skipped < total;
        
        res.status(200).json({items, hasMore});
    } catch(err) {
        console.log(`Error at handleGetSavedItemsID Controller - ${err}`)
        res.status(400).json({error: 'Something went wrong. Try again later.'});
    }
}

async function handleUpdateSavedItems(req, res) {
    try {
        const {username} = req;
        const {id, isSaved} = req.body;

        console.log(id, isSaved);

        if (!id) {
            return res.status(400).json({error: 'Invalid Data'});
        }

        let result;
        if (isSaved) {
            result = await removeSavedItems(username, id);
        } else {
            result = await addSavedItems(username, id);
        }

        if (result.matchedCount === 0) {
           return res.status(401).json({error: 'Invalid token'});
        }

        return res.status(200).json({msg: 'Updated successfully'});

    } catch(err) {
        console.log(`Error at handleUpdateSavedItems Controller - ${err}`);
        res.status(400).json({error: 'Something went wrong. Try again later.'});
    }
}

async function handleEditProfile(req, res) {
    try {
        const {username} = req;
        const {profile} = req.body;
        if (!profile) {
            return res.status(400).json({error: 'Invalid Data'});
        }

        const result = await updateEditedProfile(username, profile);
        if (result.matchedCount === 0) {
            return res.status(401).json({error: 'Invalid token'});
        }

        return res.status(200).json({msg: 'Updated successfully'});
    } catch(err) {
        console.log(`Error at handleEditProfile Controller - ${err}`);
        res.status(400).json({error: 'Something went wrong. Try again later.'});
    }

}

async function handleGetUserProfile(req, res) {
    try {
        const {username} = req;
        const u = await findUser(username);
        if (!u) {
            return res.status(400).json({error: 'Invalid Token'});
        }

        const {requestedUsername} = req.params;
        if (!requestedUsername) {
            return res.status(400).json({error: 'Invalid username'});
        }

        const user = await getUserProfile(requestedUsername);
        if (!user) {
            return res.status(400).json({error: 'Invalid Token2'});
        }

        res.status(200).json(user);
    } catch(err) {
        console.log(`Error at handleGetUserProfile Controller - ${err}`);
        res.status(400).json({error: 'Something went wrong. Try again later.'});
    }
}

async function handleFetchAllUserProfiles(req, res) {
    const profiles = await getAllUserProfiles();
    res.json(profiles);
}

async function handleFetchUserProfiles(req, res) {

    try {

        const {q="", page="1", limit="10"} = req.query;

        const {profiles, total, skipped} = await getUserProfilesWithPagination(q, Number(page), Number(limit));

        const hasMore = skipped + profiles.length < total;
        
        res.status(200).json({profiles, hasMore});
    } catch(err) {
        console.log(`Error at handleFetchUserProfiles Controller - ${err}`);
        res.status(400).json({error: 'Something went wrong. Try again later.'});
    }
}

async function handleProfileImageChange(req, res) {
    try {
        const {userID} = req;
        const {url} = req.body;

        if (!userID || !isValid(userID)) {
            return res.status(400).json({error: "Invalid Token"});
        }

        if (!url) {
            return res.status(400).json({error: 'No avatar url to update'});
        }

        const result = await updateAvatar(userID, url);
        if (!result) {
            return res.json(400).error({error: "Invalid Token"});
        }

        res.status(200).json({success: true})
    } catch(err) {
        console.log(`Error at handleProfileImageChange Controller - ${err}`);
        res.status(400).json({error: 'Something went wrong. Try again later.'});
    }
}

module.exports = {
    handleGetSavedItemsID, handleGetSavedItems, handleUpdateSavedItems, 
    handleGetUserItemListings,
    handleEditProfile, handleGetUserProfile,
    handleFetchAllUserProfiles, handleFetchUserProfiles,
    handleProfileImageChange,
};