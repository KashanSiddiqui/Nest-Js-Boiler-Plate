import * as mongoose from 'mongoose';
const Schema = mongoose.Schema

export const ArtSchema = new mongoose.Schema({
    title: String,
    img: Array,
    price: Number,
    detail: Object,
    description: mongoose.Schema.Types.Mixed,
    category: String,
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: false
    },
    enable: Boolean
})

export interface Art {
    title: String;
    img: [];
    price: Number;
    detail: Object;
    description: mongoose.Schema.Types.Mixed;
    category: String;
    seller: Object;
    enable: Boolean
}