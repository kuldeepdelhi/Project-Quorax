const mongoose = require('mongoose')
const questionModel = require('../models/questionModel')
const userModel = require('../models/userModel')
const answerModel = require('../models/answerModel')
let validate = require('../validators/validator');



//POST QUESTION
const postquestion = async (req, res) => {
    try {
        const Body = req.body
        let tokenId = req.userId
        if (!validate.isValidObjectId(tokenId)) {
            return res.status(400).send({ status: false, message: "The TokenId Is InValid" })
        }
        if (!validate.isValidRequestBody(Body)) {
            return res.status(400).send({ status: false, message: "Please Provide The Data To Continue" })
        }
        const { description, tag, askedBy } = Body
        if (!validate.isValid(description)) {
            return res.status(400).send({ status: false, message: "Please Provide Your Question Description" })
        }
        if (!validate.isValid(askedBy)) {
            return res.status(400).send({ status: false, message: "Please Provide User Id" })
        }
        if (!validate.isValidObjectId(askedBy)) {
            return res.status(400).send({ status: false, message: "The UserId Is InValid" })
        }
        let find = await userModel.findById({ _id: askedBy })
        if (!find) {
            return res.status(404).send({ status: false, message: "Cant find The User" })
        }
        if (askedBy != tokenId) {
            return res.status(401).send({ status: false, message: "You Are Not Authorized To Perform This Task" })
        }
        if (find.creditScore < 100) {
            return res.status(400).send({ status: false, Message: "You don't have enough credit score to post a question" })
        }
        if (tag) {
            if (!validate.isValid(tag)) {
                return res.status(400).send({ status: false, message: "Please Provide The Tags" })
            }
            if (tag.length > 0) {
                let data = { description, tag, askedBy }
                let question = await questionModel.create(data)
                await userModel.findOneAndUpdate({ _id: askedBy }, { $inc: { creditScore: -100 } })
                return res.status(201).send({ status: true, message: "question posted successfully", data: question })
            }
        }
        let Data = { description, askedBy, isDeleted: false, createdAt: new Date(), updatedAt: new Date() }
        await questionModel.create(Data)
        await userModel.findOneAndUpdate({ _id: askedBy }, { $inc: { creditScore: -100 } })
        return res.status(201).send({ status: true, message: "question posted successfully", Data: Data })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

//GET QUESTION
const getquestion = async (req, res) => {
    try {
        let updatedfilter = { isDeleted: false }
        const body = req.query
        const { tag, sort } = body
        if (tag) {
            if (!validate.isValid(tag)) {
                res.status(400).send({ status: false, message: `Please Provide The Tag` });
                return;
            }
            const Tags = tag.split(',')
            updatedfilter["tag"] = { $all: Tags }
        }
        if (sort) {
            if (!(sort == -1 || sort == 1)) {
                return res.status(400).send({ status: false, message: "You Can Only Use 1 For Ascending And -1 For Descending Sorting" })
            }
        }
        let check = await questionModel.find(updatedfilter).lean().sort({createdAt:sort})
        if (check.length > 0) {
            for (let i = 0; i < check.length; i++) {

                let answer = await answerModel.find({ questionId: check[i]._id, isDeleted: false })
                check[i]["answers"] = answer
                console.log(answer)
            }
            //check = await questionModel.find(updatedfilter).lean().sort({ createdAt: sort })
            return res.status(200).send({ status: true, Data: check })
        }
        else {
            return res.status(404).send({ messege: "Cant Find What You Are Looking For" })
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

//GET QUESTION BY ID
const getquestionbyid = async (req, res) => {
    try {
        let questionId = req.params.questionId
        if (!validate.isValidObjectId(questionId)) {
            return res.status(400).send({ status: false, messege: "Please Use A Valid Link The Question Id Is Invalid" })
        }
        if (!validate.isValid(questionId)) {
            return res.status(400).send({ status: false, messege: "Please Use A Valid Link The Question Id Is Invalid" })
        }
        let findquestion = await questionModel.findOne({ _id: questionId, isDeleted: false }).select({ __v: 0 })
        if (findquestion) {
            let { description, tag, askedBy, isDeleted, deletedAt, createdAt, updatedAt } = findquestion

            let answers = await answerModel.find({ questionId: questionId, isDeleted: false }).select({ answeredBy: 1, text: 1 }).sort({ createdAt: -1 });
            if (answers.length > 0) {

                const data = { description, tag, askedBy, answers, isDeleted, deletedAt, createdAt, updatedAt }
                return res.status(200).send({ status: true, messege: "Successfully Fetched The Question", Data: data })
            }

            const Data = { description, tag, askedBy, isDeleted, deletedAt, createdAt, updatedAt }
            return res.status(200).send({ status: true, messege: "Successfully Fetched The Question", Data: Data })

        } else {
            return res.status(404).send({ status: false, messege: "Cant Find What You Are Looking For" })
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


//UPDATE QUESTION BY ID
const updatequestionbyid = async (req, res) => {
    try {
        let Id = req.params.questionId
        let token = req.userId
        let Body = req.body

        if (!validate.isValidObjectId(Id)) {
            return res.status(400).send({ status: false, messege: "Please Use A Valid Link The Question Id Is Invalid" })
        }
        if (!validate.isValid(Id)) {
            return res.status(400).send({ status: false, messege: "Please Use A Valid Link The Question Id Is Invalid" })
        }
        if (!validate.isValidRequestBody(Body)) {
            return res.status(400).send({ status: false, messege: "Please Provide The Data You Want To Update" })
        }
        const { description, tag } = Body
        if (description) {
            if (!validate.isValid(description)) {
                return res.status(400).send({ status: false, messege: "Please Provide A Valid Description You Want To Update" })
            }
        }
        if (description === "") {
            return res.status(400).send({ status: false, messege: "Please Provide A Valid Description You Want To Update" })
        }
        if (tag) {
            if (!validate.isValid(tag)) {
                return res.status(400).send({ status: false, messege: "Please Provide A Valid Tag You Want To Update" })
            }
        }
        if (tag === "") {
            return res.status(400).send({ status: false, messege: "Please Provide A Valid Tag You Want To Update" })
        }
        let findquestion = await questionModel.findOne({ _id: Id, isDeleted: false })
        if (!findquestion) {
            return res.status(400).send({ status: false, message: "Cant find what you are looking for" })
        }
        let user = findquestion.askedBy
        if (token == !user) {
            return res.status(401).send({ status: false, message: "You Are Not Authorised To Perform This Action" })
        }
        let update = await questionModel.findOneAndUpdate({ _id: Id, isDeleted: false }, { description: description, tag: tag }, { new: true })
        return res.status(200).send({ status: true, messege: "Data Updated Successfully", UpdatedData: update })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


//DELETE QUESTION BY ID
const deletequestionbyid = async (req, res) => {
    try {
        let Id = req.params.questionId
        let token = req.userId
        if (!validate.isValidObjectId(Id)) {
            return res.status(400).send({ status: true, messege: "The Question Id Is Invalid" })
        }
        if (!validate.isValidObjectId(token)) {
            return res.status(400).send({ status: true, messege: "The Token Id Is Invalid" })
        }
        let find = await questionModel.findOne({ _id: Id, isDeleted: false })
        if (!find) {
            return res.status(400).send({ status: false, messege: "Can't Find The Question" })
        }
        let user = find.askedBy
        if (token == !user) {
            return res.status(401).send({ status: false, message: "You Are Not Authorized To Perform This Task" })
        }
        let deletedquestion = await questionModel.findOneAndUpdate({ _id: Id, isDeleted: false }, { isDeleted: true, deletedAt: new Date() }, { new: true })
        if (deletedquestion) {
            return res.status(200).send({ status: true, messege: "Question Deleted Successfully", Data: deletedquestion })
        }
        else {
            return res.status(404).send({ msg: "Question Has Been Already Deleted" })
        }

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = { postquestion, getquestion, getquestionbyid, updatequestionbyid, deletequestionbyid }