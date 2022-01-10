const mongoose = require('mongoose')
const questionModel = require('../models/questionModel')
const userModel = require('../models/userModel')
const answerModel = require('../models/answerModel')
let validate = require('../validators/validator');


//Post Answer
const postanswer = async (req, res) => {
    try {
        const Body = req.body
        let token = req.userId
        if (!validate.isValidRequestBody(Body)) {
            return res.status(400).send({ status: false, message: "Please Provide A valid Data To Cotinue" })
        }
        const { answeredBy, questionId, text } = Body
        if (!validate.isValid(answeredBy)) {
            return res.status(400).send({ status: false, message: "Please Provide The User Id" })
        }
        if (!validate.isValidObjectId(answeredBy)) {
            return res.status(400).send({ status: false, message: "The User Id Is InValid" })
        }
        if (!validate.isValid(questionId)) {
            return res.status(400).send({ status: false, message: "Please Provide The Question Id" })
        }
        if (!validate.isValidObjectId(questionId)) {
            return res.status(400).send({ status: false, message: "The Question Id Is InValid" })
        }
        if (!validate.isValid(text)) {
            return res.status(400).send({ status: false, message: "Please Provide Your Answer For The Question" })
        }
        const find = await userModel.findOne({ _id: answeredBy })
        if (!find) {
            return res.status(404).send({ status: false, message: "Can't Find Any User Using User Id" })
        }
        const check = await questionModel.findOne({ _id: questionId, isDeleted: false })
        if (!check) {
            return res.status(404).send({ status: false, message: "Can't Find Any Question Using The Question Id" })
        }
        if (token == !answeredBy) {
            return res.status(404).send({ status: false, message: "You Are Not Authorised To Upload A Answer" })
        }
        let userdata = await questionModel.findOne({ _id: questionId })
        if (!(req.body.answeredBy == userdata.askedBy)) {
            let incScore = await userModel.findOneAndUpdate({ _id: answeredBy }, { $inc: { creditScore: + 200 }}, { new: true })
            const data = { answeredBy, text, questionId }
            const answerData = await answerModel.create(data);
            let totalData = { answerData, incScore }
            return res.status(200).send({ status: false, message: "User Credit Score updated ", data: totalData });

        } else {
            
            return res.status(400).send({ status: true, message: 'Sorry , You cannot Answer Your Own Question' });
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

//Get Answer
const getanswer = async (req, res) => {
    try {
        let question = req.params.questionId
        if (!validate.isValid(question)) {
            return res.status(400).send({ status: false, message: "Please Provide A Valid QuestionId" })
        }
        if (!validate.isValidObjectId(question)) {
            return res.status(400).send({ status: false, message: "The QuestionId Is InValid" })
        }
        let findquestion = await questionModel.findOne({ _id: question,isDeleted:false })
        if (!findquestion) {
            return res.status(404).send({ status: false, message: "Cant Find Any Question Through The Question Id" })
        }
        let findanswer = await answerModel.find({ questionId: question ,isDeleted:false})
        if (findanswer.length > 0) {
            let Answer = await answerModel.find({ questionId: question,isDeleted:false}).select({ answeredBy: 1, text: 1 }).sort({ "createdAt": -1 })
            let Question = findquestion.description
            let Details = { Question,QuestionID:question, Answer }
            return res.status(200).send({ status: true, message: "Succeefully Fetched All Details", Details })
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


//Update Answer
const updateanswer = async (req, res) => {
    try {
        let ID = req.params.answerId
        let token = req.userId
        let Body = req.body
        if(!validate.isValid(ID)){
            return res.status(400).send({status:false,message:"The Answer Id Is InValid"})
        }
        if(!validate.isValidObjectId(ID)){
            return res.status(400).send({status:false,message:"The Answer Id Is Not A Valid ObjectId"})
        }
        if(!validate.isValid(token)){
            return res.status(400).send({status:false,message:"The Token Id Is InValid"})
        }
        if(!validate.isValidObjectId(token)){
            return res.status(400).send({status:false,message:"The Token Id Is Not A Valid ObjectId"})
        }
        if(!validate.isValidRequestBody(Body)){
            return res.status(400).send({status:false,message:"Please Provide The Requird Field To Update"}) 
        }
        const {text} = Body
        if(!validate.isValid(text)){
            return res.status(400).send({status:false,message:"Please Provide Your New Answer For Updation"}) 
        }
        let found = await answerModel.findOne({_id:ID,isDeleted:false})
        if(!found){
            return res.status(404).send({status:false,message:"The Answer Doesn't Exist"})
        }
        let user = found.answeredBy
        if(token ==! user){
            return res.status(401).send({status:false,message:"You Are Not Authorized To Perform This Task"})
        }
        let updateanswer = await answerModel.findOneAndUpdate({_id:ID,isDeleted:false},{text:text},{new:true})
        return res.status(200).send({status:true,message:"Answer Updated Successfully",UpdatedAnswer:updateanswer})
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

//Delete Answer
const deleteanswer = async (req, res) => {
    try {
        let ID = req.params.answerId
        let token = req.userId
        if(!validate.isValid(ID)){
            return res.status(400).send({status:false,message:"The Answer Id Is InValid"})
        }
        if(!validate.isValidObjectId(ID)){
            return res.status(400).send({status:false,message:"The Answer Id Is Not A Valid ObjectId"})
        }
        if(!validate.isValid(token)){
            return res.status(400).send({status:false,message:"The Token Id Is InValid"})
        }
        if(!validate.isValidObjectId(token)){
            return res.status(400).send({status:false,message:"The Token Id Is Not A Valid ObjectId"})
        }
        let found = await answerModel.findOne({_id:ID,isDeleted:false})
        if(!found){
            return res.status(404).send({status:false,message:"The Answer Doesn't Exist Or Already Been Deleted"})
        }
        let user = found.answeredBy
        if(token ==! user){
            return res.status(401).send({status:false,message:"You Are Not Authorized To Perform This Task"})
        }
        let deleteanswer = await answerModel.findOneAndUpdate({_id:ID,isDeleted:false},{isDeleted:true},{new:true})
        return res.status(200).send({status:true,message:"Answer Deleted Successfully",DeletedAnswer:deleteanswer})
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}



module.exports = { postanswer, getanswer, updateanswer, deleteanswer }