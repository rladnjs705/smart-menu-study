import { getCurrentDate } from '../../utils/formatDate';
import Orders from './collections';

const queries = {
    // '_': 부모로부터 전달받은 값
    // args: 클라이언트에서 서버로 보낼 값
    // context: 모든 resolver에 공통으로 전달될 값(보통 header로 전달하는 인증키등이 대표적)
    // info 현재 필드의 정보가 있으나 사실상 잘 사용하지 않음
    async orders(_, args, context, info) { 
        try {
            const result = await Orders.find({
                orderDate: {"$gte" : new Date()} //오늘 날짜 이후에 주문건만 나오도록함
            }).fetch(); //DB호출 구문
            return result;
        }
        catch(error) {
            throw `Orders query Error: ${error}`;
        }
    },
}

const mutations = {
    async addOrder(_, { orderPriceSum, orderCount, orderItems }, { user }, info) {
        const newDate = getCurrentDate();

        let orderValues = {
            orderDate: newDate,
            orderPriceSum: orderPriceSum,
            orderCount: orderCount,
            orderItems: orderItems,
            orderState: false
        }

        try {
            const result = await Orders.insert(orderValues);
            return result;
        } catch (error) {
            throw `Order Add Error: ${error}`;
        }
    },

    async checkOrder(_, { _id, orderState }, { user }, info) {
        const changeOrderState = {
            orderState: !orderState
        }

        try {
            await Orders.update(
                {_id: _id},
                {$set: changeOrderState},
            );

            return _id;
        } catch (error) {
            throw `CheckOrder Update Error: ${error}`;
        }
    }
}

const resolvers = {
    Query: queries,
    Mutation: mutations,
}

export default resolvers;