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

