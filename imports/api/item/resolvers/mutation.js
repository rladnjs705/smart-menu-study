import { Categories, Items} from './collections';
import { getCurrentDate } from '/imports/utils/formatDate';
const mutations = {
    async addCategory(_, { categoryName}){
        const categoryValue = {
            categoryName: categoryName
        }

        try {
            const result = await Categories.insert(categoryValue);
            return result;
        } catch (error) {
            throw `Category Add Error: ${error}`
        }
    },

    async updateCategory(_, {_id, categoryName}){
        const categoryValue = {
            categoryName: categoryName
        }

        try {
            const result = await Categories.update(
                {_id:_id},
                {$set: categoryValue}
            )
            return result;
        } catch (error) {
            throw `Category Update Error: ${error}`
        }
    },

    async deleteCategory(_, {_id}){
        try {
            const result = await Categories.remove(_id);
            return result;
        } catch (error) {
            throw `Category Delete Error: ${error}`
        }
    },

    async addItem(_, {itemName, itemPrice, itemImage, itemCategoryId}){
        const newDate = getCurrentDate();
        
        const itemValues = {
            itemName: itemName,
            itemPrice: itemPrice,
            itemImage: itemImage,
            itemCategoryId: itemCategoryId,
            createdAt: newDate,
            updatedAt: newDate,
        }

        try {
            
            const result = await Items.insert(itemValues);
            itemValues._id = result;

            return itemValues;

        } catch (error) {
            throw `Add Item Error: ${error}`
        }

    },

    async updateItem(_, {_id,itemName, itemPrice, itemImage, itemCategoryId}){
        const newDate = getCurrentDate();

        const itemValues = {
            itemName: itemName,
            itemPrice: itemPrice,
            itemImage: itemImage,
            itemCategoryId: itemCategoryId,
            updatedAt: newDate,
        }

        try {
            await Items.update(
                {_id:_id},
                {$set: itemValues}
            );

            itemValues._id = _id;

            return itemValues;
        } catch (error) {
            throw `Update Item Error: ${error}`
        } 
    },

    async deleteItem(_, {_id}){

        try {
            await Items.remove(_id);
            return _id;
            
        } catch (error) {
            throw `Delete Item Error: ${error}`
        }
    },

    async updateFile(_, {}){

    }
}

export default mutations;