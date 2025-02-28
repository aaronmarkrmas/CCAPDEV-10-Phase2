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

Element: [ / ] - Done

Resto:
    createResto /
    editRestoProfile /
    getRestoEmail /
    deleteReply 
    addReply
    deleteReply
    getReply
    getResto
    getAllResto
    getRating
    deactRestoAcc
    *add more if necessary*


Customer:
    getReview (include the reply)
    addReview
    getReview (using review text or username)
    deleteReview
    editReview
    addLikeDislike (includes remove)
    getLikesDislikes
    editCustProfile / 
    searchUser
    searchResto
    searchRestoByTag (using tag buttons)
    deactAccount 
    getCustEmail /
    getCustUsername /
    *add more if necessary*

Admin: 
    resolveReport
    deactRestoAcc (can be reactivated but after 30 days, the account will be deleted)
    deactCustAcc  (can be reactivated but after 30 days, the account will be deleted)
    reactRestoAcc
    reactCustAcc 
    getAllReports
    deleteReply
    deleteReview
    addTag
    deleteTag
    getUserDemog (customerAcc, restoAcc, allAcc)
    *add more if necessary*

