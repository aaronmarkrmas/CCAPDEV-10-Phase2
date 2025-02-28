*** create a separate js file for every route controller ***

disregard the current controller file 

File Naming Format:
cc_ for customerRoutes
ca_ for adminRoutes
cr_ for restaurantRoutes

Examples:
    cc_getAccount
    ca_getReports
    cr_createAccount

*use GridFS for pics*

Examples:
    rc_getAccount
    ra_getReports
    rr_createAccount

ID Generator: const { v4: uuidv4 } = require('uuid');

Element: [ / ] - Done
    Resto:
        createResto /
        editRestoProfile /
        getRestoEmail /
        editReply /
        addReply /
        deleteReply /
        getReply (get reply using the reviewID then get replyID)
        getResto / 
        getAllResto
        updateRating (use whenever a review is added)
        updateNReview (update nReview of the resto when a review is added)
        getRestoReviews / (all reviews posted on the tl of the resto)
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
        resolveReport (resolved but not deleted)
        deactRestoAcc (can be reactivated but after 30 days, the account will be deleted)
        deactCustAcc  (can be reactivated but after 30 days, the account will be deleted)
        reactRestoAcc
        reactCustAcc 
        openPostID    /
        getAllReports /
        addTag
        deleteTag
        getUserDemog (customerAcc, restoAcc, allAcc)
        *add more if necessary*

