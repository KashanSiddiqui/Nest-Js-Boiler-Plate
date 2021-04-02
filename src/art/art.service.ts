import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Art } from './art.model'
import { Category } from '../category/category.model'

@Injectable()
export class ArtService {

    constructor(@InjectModel('Art') private readonly artModel: Model<Art>, @InjectModel('Category') private readonly categoryModel: Model<Category>) { }

    async addArt(req) {
        try {
            console.log("view req", req.files)
            console.log("view req", req.body)
            return req.body
        } catch (e) {
            throw e
        }
    }

    async getArt(req) {
        try {
            let { page }: any = req.query
            if (req.query.category == 'all') {
                const get = await this.artModel.find().skip(page * 12).limit(12)
                let data = {
                    data: get
                }
                return data
            }
            if (req.query.productId != undefined) {
                const product = await this.artModel.findById(req.query.productId).skip(page * 12).limit(12)
                if (product == null) {
                    return ({})
                }
                return product
            }
            const get = await this.artModel.find().populate({ path: 'seller', select: ['-hash', '-code'] }).where({ category: req.query.category }).skip(page * 12).limit(12)
            const gets: any = await this.categoryModel.findOne().where({ 'detail.categoryName': req.query.category }).populate('detail.artist', ['displayName', '_id'])
            let check: any = {}
            let filter: any = false
            if (gets == null) {
                return gets
            }
            check = gets.detail.find((item) => {
                if (item.categoryName == req.query.category) {
                    return item.categoryName
                }
            })
            if (check != null) {
                filter = {
                    "Artist": check.artist,
                    "Material Type": check.materialType
                }
            }
            let data = {
                data: get,
                filter
            }
            console.log("view datra lebngth", data.data.length)
            return data
        }
        catch (e) {
            console.log("erorr ", e)
            throw e
        }
    }

    async filter(req) {
        try {
            let { page }: any = req.query.page - 1
            if (req.query.category == "general") {
                let filter: any = []
                if (req.body.filter.Artist != "" && req.body.filter.MaterialType != "") {
                    for (var key in req.body.filter.Artist) {
                        const getFilterArts = await this.artModel.find({ $and: [{ seller: req.body.filter.Artist[key]._id, materialType: req.body.filter.MaterialType[key], category: req.query.category }] }).skip(page * 12).limit(12)
                        console.log("view getfilter arts", getFilterArts)
                        if (getFilterArts != "") filter.push(...getFilterArts)
                    }
                    let data = {
                        data: filter
                    }
                    console.log("data checked here==>", data)
                    return data
                }
                if (req.body.filter.Artist != "" && req.body.filter.MaterialType == "") {
                    for (var key in req.body.filter.Artist) {
                        const getFilterArts = await this.artModel.find({ seller: req.body.filter.Artist[key]._id, category: req.query.category }).skip(page * 12).limit(12)
                        console.log("view getfilter arts", getFilterArts)
                        if (getFilterArts != "") filter.push(...getFilterArts)
                    }
                    let data = {
                        data: filter
                    }
                    console.log("data checked here==>", data)
                    return data
                }
                if (req.body.filter.Artist == "" && req.body.filter.MaterialType != "") {
                    for (var key in req.body.filter.MaterialType) {
                        const getFilterArts = await this.artModel.find({ materialType: req.body.filter.MaterialType[key], category: req.query.category }).skip(page * 12).limit(12)
                        console.log("view getfilter arts", getFilterArts)
                        if (getFilterArts != "") filter.push(...getFilterArts)
                    }
                    let data = {
                        data: filter
                    }
                    console.log("data checked here==>", data)
                    return data
                }
                if (req.body.filter.Artist == "" && req.body.filter.MaterialType == "") {
                    const getFilterArts = await this.artModel.find({ category: req.query.category }).skip(page * 12).limit(12)
                    console.log("view getfilter arts", getFilterArts)
                    let data = {
                        data: getFilterArts
                    }
                    console.log("data checked here==>", data)
                    return data
                }
            }
            if (req.query.category == "masterpiece") {
                let filter = []
                if (req.body.filter.Artist != "" && req.body.filter.MaterialType != "") {
                    for (var key in req.body.filter.Artist) {
                        const getFilterArts = await this.artModel.find({ $and: [{ seller: req.body.filter.Artist[key]._id, materialType: req.body.filter.MaterialType[key], category: req.query.category }] }).skip(page * 12).limit(12)
                        console.log("view getfilter arts", getFilterArts)
                        if (getFilterArts != "") filter.push(...getFilterArts)
                    }
                    let data = {
                        data: filter
                    }
                    console.log("data checked here==>", data)
                    return data
                }
                if (req.body.filter.Artist != "" && req.body.filter.MaterialType == "") {
                    for (var key in req.body.filter.Artist) {
                        const getFilterArts = await this.artModel.find({ seller: req.body.filter.Artist[key]._id, category: req.query.category }).skip(page * 12).limit(12)
                        console.log("view getfilter arts", getFilterArts)
                        if (getFilterArts != "") filter.push(...getFilterArts)
                    }
                    let data = {
                        data: filter
                    }
                    console.log("data checked here==>", data)
                    return data
                }
                if (req.body.filter.Artist == "" && req.body.filter.MaterialType != "") {
                    for (var key in req.body.filter.MaterialType) {
                        const getFilterArts = await this.artModel.find({ materialType: req.body.filter.MaterialType[key], category: req.query.category }).skip(page * 12).limit(12)
                        console.log("view getfilter arts", getFilterArts)
                        if (getFilterArts != "") filter.push(...getFilterArts)
                    }
                    let data = {
                        data: filter
                    }
                    console.log("data checked here==>", data)
                    return data
                }
                if (req.body.filter.Artist == "" && req.body.filter.MaterialType == "") {
                    const getFilterArts = await this.artModel.find({ category: req.query.category }).skip(page * 12).limit(12)
                    console.log("view getfilter arts", getFilterArts)
                    let data = {
                        data: getFilterArts
                    }
                    console.log("data checked here==>", data)
                    return data
                }
            }
        }
        catch (e) {
            console.log("view error here", e)
            throw e
        }
    }
}