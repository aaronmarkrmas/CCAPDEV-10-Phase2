*** create a separate js file for every route ***

Naming Format:
rc_ for customerRoutes
ra_ for adminRoutes
rr_ for restaurantRoutes

*use GridFS for pics*

Routes:
POST - Send data to the server to create a new resource
GET - fetching data
PUT | PATCH - update existing data
DELETE - delete data

Examples:
    rc_getAccount
    ra_getReports
    rr_createAccount


Resto:
    createResto /
    editProfile 
    deleteReply
    addReply
    getResto
    getAllResto
    getRating
    *add more if necessary*


Customer:
    getReview (include the reply)
    addReview
    addLikeDislike (includes remove)
    getLikesDislikes
    editProfile  
    searchUser
    searchResto
    searchRestoByTag (using tag buttons)
    seachReview (using review text or username)
    *add more if necessary*

Admin: 
    resolveReport
    deactRestoAcc
    deactCustAcc
    getAllReports
    deleteReply
    deleteReview
    addTag
    deleteTag
    getUserDemog (customerAcc, restoAcc, allAcc)
    *add more if necessary*

