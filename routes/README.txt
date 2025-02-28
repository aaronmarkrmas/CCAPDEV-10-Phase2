*** create a separate js file for every route ***

Naming Format:
rc_ for customerRoutes
ra_ for adminRoutes
rr_ for restaurantRoutes

*use GridFS for pics*

Route Methods:
POST - Send data to the server to create a new resource
GET - fetching data
PUT | PATCH - update existing data
DELETE - delete data

Examples:
    rc_getAccount
    ra_getReports
    rr_createAccount

Element: [ / ] - Done

ID Generator: const { v4: uuidv4 } = require('uuid');

ROUTES:
    Resto:
        createResto /
        editRestoProfile /
        getRestoEmail /
        editReply /
        addReply /
        deleteReply /
        getReply (get reply using the reviewID then get replyID)
        getResto
        getAllResto
        getRating
        getRestoReviews (All resto reviews)
        deactRestoAcc
        *add more if necessary*


    Customer:
        getReview (using review text or username)
        addReview
        deleteReview (when deleting a review, the reply must be deleted as well)
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

