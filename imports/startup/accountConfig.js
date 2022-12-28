import { Accounts } from "meteor/accounts-base";
import { USER, ADMIN } from "../utils/constans";

Accounts.onCreateUser((options, user) => {
    if(options.email === 'admin@admin.com') {
        user.profile = options.profile ? options.profile: {}; //option으로 들어오는 profile이 없을때 빈 객체를 만듬
        user.profile.role = ADMIN;
    } else {
        user.profile = options.profile ? options.profile: {}; //option으로 들어오는 profile이 없을때 빈 객체를 만듬
        user.profile.role = USER;
    }

    return user;
    
});