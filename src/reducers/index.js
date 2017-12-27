import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authorise from './authorise';
import login from './login';
import logout from './logout';
import signUp from './signUp';
import room from './room';
import message from './message';
import participant from './participant';
import forgottenPassword from './forgottenPassword';
import passwordReset from './passwordReset';
import stat from './stat';

export default combineReducers({
    authorise,
    login,
    logout,
    signUp,
    room,
    message,
    participant,
    forgottenPassword,
    passwordReset,
    stat,
    form: formReducer,
});
