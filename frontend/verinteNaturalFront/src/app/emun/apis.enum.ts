export enum APIS_ENUM {
    //LOGIN SERVICE
    POST_LOGIN = '/api/login',
    POST_NEW_USER = '/api/newUser',
    GET_USER_BY_TOKEN = '/api/getUserByToken',
    
    //CONGRESS
    GET_CONGRESS_BY_ID = '/api/getCongreso/?',
    GET_ALL_CONGRESS = '/api/getCongresos',
    POST_DELETE_CONGRESS = '/api/deleteCongreso/?',
    POST_EDIT_CONGRESS = '/api/updateCongreso/?',
    POST_NEW_CONGRESS = '/api/newCongreso',  
    GET_CONGRESS_BY_CAREER = '/api/getCongresos/idCarrera/?',

    //USER
    GET_USER_BY_ID = '/api/getUser/?',
    GET_ALL_USERS = '/api/getUsers',
    POST_EDIT_USER = '/api/updateUser/?',
    POST_DELETE_USER = '/api/deleteUser/?',

    //CAREER
    POST_NEW_CAREER = '/api/newCarrera',
    GET_ALL_CAREERS = '/api/getCarreras',
    GET_CAREER_BY_ID = '/api/getCarrera/?',
    POST_EDIT_CAREER = '/api/updateCarrera/?',
    POST_DELETE_CAREER = '/api/deletecarrera/?',

    //FAQ
    GET_ALL_FAQ = '/api/getFaqs',
    POST_NEW_FAQ = '/api/newFAQ',
    GET_FAQ_BY_ID = '/api/getFaq/?',
    POST_EDIT_FAQ = '/api/updateFaq/?',
    GET_ALL_FAQ_BY_CONGRESS = '/api/getFaq/idCongreso/?',

    //PACKAGE

    POST_EDIT_PACKAGE = '/api/updateTipoPago/?',
    GET_ALL_PACKAGE = '/api/getTipoPagos',
    GET_PACKAGE_BY_ID = '/api/getTipoPago/?',
    POST_NEW_PACKAGE = '/api/newTipoPago',
    POST_DELETE_PACKAGE = '/api/deleteTipoPago/?',
    GET_PACKAGE_BY_CONGRESS = '/api/getTipoPagos/idCongreso/?',


    //ACTIVITY
    
    POST_NEW_ACTIVITY = '/api/newActividad',
    GET_ACTIVITY_BY_CONGRESS = '/api/getActividades/idCongreso/?',
    POST_DELETE_ACTIVITY = '/api/deleteActividad/?',
    GET_ACTIVITY_BY_ID = '/api/getActividad/?',
    POST_EDIT_ACTIVITY = '/api/updateActividad/?',


    //ASSISTANCE

    POST_NEW_ASSITANCE = '/api/newActividadUF',
    GET_ASSISTANCE_BY_ACTIVITY = '/api/getActividadUF/idActividad/?',


    //PAYMENT
    GET_PAYMENT_BY_PACKAGE = '/api/getPagos/idTipoPago/?',
    POST_NEW_PAYMENT = '/api/newPago',
    GET_PAYMENT_BY_ID = '/api/getPagos/?',
    POST_EDIT_PAYMENT = '/api/updatePagos/?'
}