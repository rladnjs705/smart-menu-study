import { Categories, Items} from './collections';
import { ALL } from '/imports/utils/constans';

const pageSize = 15;

const queries = {

    async categories(_, args, context, info) {
        try {
            const result = await Categories.find();
            return result;
        } catch (error) {
            throw `categories Errors ${error}`;
        }
    },

    async item(_, args, context, info) {
        const _id = args._id;
        try {
            const result = await Items.findOne(_id);
            return result;
        } catch (error) {
            throw `item Errors ${error}`;
        }
    },

    async items(_, args, context, info) {
        const limit = pageSize; //한 페이지에 가져올 아이템 수
        let skip = 0; //패스할 아이템 수
        let pageNumber = 0;

        let setFilters = {};
        let setOptions = {};

        if(args.pageNumber){
            pageNumber = Number(args.pageNumber);
        } 

        if(pageNumber <= 1) {
            skip = 0;
        }
        else {
            skip = ((pageNumber -1) * limit)
        }

        let search = '';
        if(args.search) search = args.search;
        if(search) setFilters.itemName = RegExp(search);

        let itemCategoryId = '';
        if(args.itemCategoryId) itemCategoryId = args.itemCategoryId;
        if(itemCategoryId === ALL) itemCategoryId = '';
        if(itemCategoryId) setFilters.itemCategoryId = itemCategoryId; 

        setOptions.limit = limit;
        setOptions.skip = skip;

        setOptions.sort = {'createdAt': -1} //상품등록 내림차순으로 조회

        try {
            const result = await Items.find(setFilters, setOptions);
            return result;
        } catch (error) {
            throw `items Errors ${error}`;
        }
    },

    async itemsPageCount(_, args, context, info) {

        let search = '';
        let setFilters = {};

        if(args.search) search = args.search;
        if(search) setFilters.itemName = RegExp(search);

        let itemCategoryId = '';
        if(args.itemCategoryId) itemCategoryId = args.itemCategoryId;
        if(itemCategoryId === ALL) itemCategoryId = '';
        if(itemCategoryId) setFilters.itemCategoryId = itemCategoryId;

        try {
            const totalItemCount = await Items.find(setFilters).count();
            const totalPage = Math.ceil(totalItemCount / pageSize); //총 페이지수 소수점 올림

            return totalPage;
        } catch (error) {
            throw `itemPageCount Errors ${error}`;
        }
    }

}

export default queries;