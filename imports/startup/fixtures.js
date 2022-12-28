import { Accounts } from 'meteor/accounts-base';
import { ADMIN } from '/imports/utils/constans';

Meteor.setTimeout(() => {
    const userCount = Meteor.users.find().count();

    if(userCount === 0) {
        //사용자 등록
        console.log('user create');

        const userValues = {
            email: 'admin@admin.com',
            password: '1234',
        }

        Accounts.createUser(userValues);
    } else {
        //이미 등록된 사용자가 있음
        console.log(`user count ${userCount}`);
    }
}, 3000);