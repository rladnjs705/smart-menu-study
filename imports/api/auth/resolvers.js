import { Accounts } from "meteor/accounts-base";
import { ADMIN } from "/imports/utils/constans";
import { checkAuth } from "/imports/api/auth/checkAuth";

const mutations = {

    async loginWithPassword(_, {email, pwd}) {
        //이메일 패스워드 값 유무 확인 (1)
        if(!email || !pwd) throw 'Unauthorized';

        //유저정보 가져오기(2)
        const authenticatingUser = await Meteor.users.findOne({'emails.address': email});

        //유저 정보가 없을경우(3)
        if (!authenticatingUser) throw 'Unauthorized';

        //유저 정보가 정상적이지 않을 경우(4)
        if(!(authenticatingUser.services != null ? authenticatingUser.services.password : undefined)) throw 'Unauthorized';

        //패스워드 확인(5)
        const passwordVerification = await Accounts._checkPassword(authenticatingUser, pwd);
        if (passwordVerification.error) throw 'Unauthrized';

        //토큰 생성(6)
        const authToken = await Accounts._generateStampedLoginToken();
        const hashedToken = await Accounts._hashLoginToken(authToken.token);

        //토큰 저장(7)
        await Accounts._insertHashedLoginToken(authenticatingUser._id, {hashedToken: hashedToken, when: authToken.when});

        //토큰 리턴(8)
        return { authToken: authToken.token, userId: authenticatingUser._id };
    },
    async logout(_, {}, {user, userToken}) {

        if(!user || !userToken) throw 'Not Login';

        try {
            const hashedToken = await Accounts._hashLoginToken(userToken);

            await Accounts.destroyToken(user._id, hashedToken);
            return true;
        } catch (error) {
            throw error.message;
        }
    },
    async addUser(_, {email, pwd}, { user }) {

        const newUser = {
            email: email,
            password: pwd,
        }

        try {
            const result = await Accounts.createUser(newUser);
            return result;
        } catch (error) {
            throw error.message;
        }

    },
    async updateUserRole(_, {_id, role}, { user }) {

        try {
            checkAuth(user, ADMIN);
            if(user._id !== _id){
                const result = await Meteor.users.update(
                    {_id: _id},
                    {$set: {'profile.role': role}}
                );
                return result;
            }
            return false;
        } catch (error) {
            throw `updateUserRole Error: ${error}`;
        }
    },
}

const queries = {
    async users(_, args, { user }, info) {
        try {
            checkAuth(user, ADMIN);
            const result = await Meteor.users.find();
            return result;
        } catch (error) {
            throw error;
        }
    },
    me(_, args, { user }, info) {
        let userValue = {
            _id: user._id,
            emails: [
                {address:user.emails[0].address}
            ],
            profile: {
                role: user.profile.role
            }
        }

        return userValue;
    }
}

const resolvers = {
    Mutation: mutations,
    Query: queries,
}

export default resolvers;