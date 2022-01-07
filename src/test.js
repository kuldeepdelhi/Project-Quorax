// const updateUser = async (req, res) => {
//     try {
//         userId = req.params.userId;
//         let requestBody = req.body;
//         let profileImage = req.files
//         let decodedUserId = req.userId
//         if (!validator.isValidRequestBody(requestBody)) return res.status(400).send({ status: false, message: 'No paramateres passed. Book unmodified' })

//         const UserFound = await userModel.findOne({ _id: userId })
//         if (!UserFound) return res.status(404).send({ status: false, message: `User not found with given UserId` });

//         if (!decodedUserId == userId) return res.status(400).send({ status: false, message: "userId in url param and in token is not same" });

//         if (profileImage && profileImage.length > 0) {
//             var uploadedFileURL = await awsFile.uploadFile(profileImage[0]);
//             requestBody.profileImage = uploadedFileURL
//         };
//         requestBody.address = JSON.parse(requestBody.address)

//         if (Object.prototype.hasOwnProperty.call(requestBody, 'email')) {
//             if (!(validator.validEmail.test(requestBody.email))) {
//                 res.status(400).send({ status: false, message: `Email should be a valid email address` })
//                 return
//             };
//             const isEmailAlreadyUsed = await userModel.findOne({ email: requestBody.email });
//             if (isEmailAlreadyUsed) {
//                 res.status(400).send({ status: false, message: `${requestBody.email} email address is already registered` })
//                 return
//             };
//         };
//         if (Object.prototype.hasOwnProperty.call(requestBody, 'password')) {
//             requestBody.password = requestBody.password.trim();
//             if (!(requestBody.password.length > 7 && requestBody.password.length < 16)) {
//                 res.status(400).send({ status: false, message: "password should between 8 and 15 characters" })
//                 return
//             };
//             var salt = await bcrypt.genSalt(10);
//             password = await bcrypt.hash(requestBody.password, salt)
//             // console.log(password)
//             requestBody.password = password;
//         };
//         requestBody.UpdatedAt = new Date()
//         const upatedUser = await userModel.findOneAndUpdate({ _id: userId }, requestBody, { new: true })
//         res.status(200).send({ status: true, message: 'User updated successfully', data: upatedUser });
//     } catch (err) {
//         res.status(500).send({ status: false, msg: err.message })
//     }
// };


// const UpdateUser = async (req, res) => {

//     userId = req.params.userId;
//     const requestBody = req.body;
//     const profileImage = req.files
//     TokenDetail = req.user

//     if (!validator.isValidRequestBody(requestBody)) {
//         return res.status(400).send({ status: false, message: 'No paramateres passed. Book unmodified' })
//     }
//     const UserFound = await userModel.findOne({ _id: userId })


//     if (!UserFound) {
//         return res.status(404).send({ status: false, message: `User not found with given UserId` })
//     }
//     if (!TokenDetail === userId) {
//         res.status(400).send({ status: false, message: "userId in url param and in token is not same" })
//     }

//     var { fname, lname, email, phone, password } = requestBody

//     if (Object.prototype.hasOwnProperty.call(requestBody, 'email')) {
//         if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(requestBody.email))) {
//             res.status(400).send({ status: false, message: `Email should be a valid email address` })
//             return
//         };

//         const isEmailAlreadyUsed = await userModel.findOne({ email: requestBody.email });
//         if (isEmailAlreadyUsed) {
//             res.status(400).send({ status: false, message: `${requestBody.email} email address is already registered` })
//             return
//         };
//     }
//     // console.log(Object.prototype.hasOwnProperty.call(requestBody, 'password'))

//     if (Object.prototype.hasOwnProperty.call(requestBody, 'password')) {
//         requestBody.password = requestBody.password.trim();
//         if (!(requestBody.password.length > 7 && requestBody.password.length < 16)) {
//             res.status(400).send({ status: false, message: "password should  between 8 and 15 characters" })
//             return
//         };

//         var salt = await bcrypt.genSalt(10);
//         password = await bcrypt.hash(requestBody.password, salt)
//         console.log(password)
//         requestBody.password = password;
//     }
//     if (profileImage && profileImage.length > 0) {
//         var uploadedFileURL = await upload.uploadFile(profileImage[0]);
//         console.log(uploadedFileURL)
//         requestBody.profileImage = uploadedFileURL
//     };

//     //
//     if (requestBody.address) {
//         requestBody.address = JSON.parse(requestBody.address)
//         if (requestBody.address.shipping) {
//             if (requestBody.address.shipping.street) {
//                 UserFound.address.shipping.street = requestBody.address.shipping.street
//                 await UserFound.save()
//             }
//             if (requestBody.address.shipping.city) {
//                 UserFound.address.shipping.city = requestBody.address.shipping.city
//                 await UserFound.save()
//             }
//             if (requestBody.address.shipping.pincode) {
//                 UserFound.address.shipping.pincode = requestBody.address.shipping.pincode
//                 await UserFound.save()
//             }
//         }

//         if (requestBody.address.billing) {
//             if (requestBody.address.billing.street) {
//                 UserFound.address.billing.street = requestBody.address.billing.street
//                 await UserFound.save()
//             }
//             if (requestBody.address.billing.city) {
//                 UserFound.address.billing.city = requestBody.address.billing.city
//                 await UserFound.save()
//             }
//             if (requestBody.address.billing.pincode) {
//                 UserFound.address.billing.pincode = requestBody.address.billing.pincode
//                 await UserFound.save()
//             }
//         }
//     }
//     requestBody.UpdatedAt = new Date()
//     const UpdateData = { fname, profileImage: uploadedFileURL, lname, email, phone, password }
//     const upatedUser = await userModel.findOneAndUpdate({ _id: userId }, UpdateData, { new: true })
//     res.status(200).send({ status: true, message: 'User updated successfully', data: upatedUser });

// }


//     // const updateUserDetailes = async function (req, res) {
//     //     try {
//     //         const reqParams = req.params.userId;
//     //         const requestUpdateBody = req.body;
//     //         let files = req.files;
//     //         let userToken = req.userId;

//     //         if (!validate.isValidObjectId(reqParams)) {
//     //             return res
//     //                 .status(404)
//     //                 .send({ status: false, message: "Invalid userId." });
//     //         }

//     //         if (userToken !== reqParams) {
//     //             res.status(400).send({ status: false, message: "authorization failed!" });
//     //             return;
//     //         }

//     //         const searchUser = await userModel.findById({ _id: reqParams });
//     //         if (!searchUser) {
//     //             return res.status(404).send({
//     //                 status: false,
//     //                 message: `user does not exist by this ${reqParams}.`,
//     //             });
//     //         }

//     //         if (!validate.isValidRequestBody(requestUpdateBody)) {
//     //             return res.status(400).send({
//     //                 status: false,
//     //                 message: "Invalid request parameters. Please provide user details to update.",
//     //             });
//     //         }

//     //         const { fname, lname, email, profileImage, phone, password, address } =
//     //             requestUpdateBody;

//     //         // if (fname || lname || email || profileImage || phone || password || address) {
//     //         let updateData = {};
//     //         if (fname) {
//     //             if (!validate.isValid(fname)) {
//     //                 return res.status(400).send({
//     //                     status: false,
//     //                     message: "fname is required or check its key & value",
//     //                 });
//     //             }
//     //             updateData["fname"] = fname;
//     //         }

//     //         if (lname) {
//     //             if (!validate.isValid(lname)) {
//     //                 return res.status(400).send({
//     //                     status: false,
//     //                     message: "lname is required or check its key & value.",
//     //                 });
//     //             }
//     //             updateData["lname"] = lname;
//     //         }

//     //         if (email) {
//     //             if (!validate.isValid(email)) {
//     //                 return res.status(400).send({
//     //                     status: false,
//     //                     message: "email is required or check its key & value",
//     //                 });
//     //             }

//     //             if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email.trim())) {
//     //                 res
//     //                     .status(400)
//     //                     .send({ status: false, message: `${email} is not a valid email` });
//     //                 return;
//     //             }

//     //             const findEmail = await userModel.findOne({ email });
//     //             if (findEmail) {
//     //                 return res.status(403).send({
//     //                     status: false,
//     //                     message: `nothing to update ${email} is already in use.`,
//     //                 });
//     //             }
//     //             updateData["email"] = email;
//     //         }

//     //         // if (!validate.isValid(profileImage)) {
//     //         //     return res.status(400).send({ status: false, message: "profileImage is required or check its key & value." })
//     //         // };

//     //         if (phone) {
//     //             if (!validate.isValid(phone)) {
//     //                 return res.status(400).send({
//     //                     status: false,
//     //                     message: "phone is required or check its key & value.",
//     //                 });
//     //             }

//     //             if (!validate.isValidPhone(phone)) {
//     //                 return res.status(400).send({
//     //                     status: false,
//     //                     message: "phone is required or check its key & value.",
//     //                 });
//     //             }

//     //             const findPhone = await userModel.findOne({ phone });
//     //             if (findPhone) {
//     //                 return res.status(403).send({
//     //                     status: false,
//     //                     message: `nothing to update ${phone} is already in use.`,
//     //                 });
//     //             }

//     //             updateData["phone"] = phone;
//     //         }

//     //         if (password) {
//     //             if (!validate.isValid(password)) {
//     //                 return res.status(400).send({
//     //                     status: false,
//     //                     message: "password is required or check its key & value.",
//     //                 });
//     //             }
//     //             let encryptPass = await bcryptjs.hash(password, 10);
//     //             updateData["password"] = encryptPass;
//     //         }

//     //         if (address) {
//     //             if (!validate.isValid(address)) {
//     //                 return res.status(400).send({
//     //                     status: false,
//     //                     message: "address is required or check its key & value.",
//     //                 });
//     //             }
//     //             updateData["address"] = address;
//     //         }

//     //             if (files && files.length > 0) {
//     //                 let uploadedFileURL = await awsCon.uploadFile(files[0]);
//     //                 updateData["profileImage"] = uploadedFileURL;
//     //             }

//     //             const updateDetails = await userModel.findOneAndUpdate({ _id: reqParams },
//     //                 updateData, { new: true }
//     //             );

//     //             res.status(201).send({
//     //                 status: true,
//     //                 message: "Successfully updated User details.",
//     //                 data: updateDetails,
//     //             });

//     //     } catch (err) {
//     //         return res.status(500).send({
//     //             status: false,
//     //             message: "Something went wrong",
//     //             Error: err.message,
//     //         });
//     //     }
//     // };




//     // const getProduct = async (req, res) => {
// //     try {

// //         let query = req.query;
// //         const { size, name, priceGreaterThan, priceLessThan } = query

// //         if (size || name || priceGreaterThan || priceLessThan) {
// //             let get = { isDeleted: false, deletedAt: null };

// //             if (size) {
// //                 get.availableSizes = size
// //             }
// //             if (name) {
// //                 // get.title = { $regex: '.' + name + '.' }
// //                 get.title = { $regex: '.*' + name + '.*' }
// //             }
// //             console.log(name)
// //             //console.log(get.title)
// //             if (priceGreaterThan) {
// //                 get.price = { $gt: priceGreaterThan }
// //                 //console.log(get.price)
// //             }
// //             if (priceLessThan) {
// //                 get.price = { $lt: priceLessThan }
// //                 //console.log(get.price)
// //             }
// //             console.log(get)
// //             if (priceGreaterThan && priceLessThan) {
// //                 get.price = { $gt: priceGreaterThan, $lt: priceLessThan }
// //                 // console.log(get.price)
// //             }


// //             // let productFound = await productModel.find(get)
// //             let productFound = await productModel.find(get).select({
// //                 _id: 1, title: 1, description: 1, price: 1, currencyId: 1, currencyFormat: 1, isFreeShipping: 1, productImage: 1, style: 1,
// //                 availableSizes: 1, installments: 1, deletedAt: 1, isDeleted: 1
// //             })


// //             if (!(productFound.length > 0)) {
// //                 return res.status(404).send({ status: false, message: "no such product found" });
// //             }

// //             return res.status(200).send({ status: true, message: 'Product list', data: productFound });

// //         } else {
// //             let Found = await productModel.find({ isDeleted: false })
// //             return res.status(200).send({ status: true, message: "Success", data: Found });
// //         }
// //     }
// //     catch (err) {
// //         return res.status(500).send({ status: false, msg: err.message });
// //     }
// // }



// // const updateUserDetailes = async (req, res) => {

// //     try {
// //         userId = req.params.userId;
// //         const requestBody = req.body;
// //         const profileImage = req.files
// //         TokenDetail = req.userId
// //         if (!validate.isValidRequestBody(requestBody)) {
// //             return res.status(400).send({ status: false, message: 'No paramateres passed. Book unmodified' })
// //         }
// //         const UserFound = await userModel.findOne({ _id: userId })
// //         if (!UserFound) {
// //             return res.status(404).send({ status: false, message: `User not found with given UserId` })
// //         }
// //         if (!TokenDetail === userId) {
// //             res.status(400).send({ status: false, message: "userId in url param and in token is not same" })
// //         }
// //         var { fname, lname, email, phone, password } = requestBody
// //         if (Object.prototype.hasOwnProperty.call(requestBody, 'email')) {
// //             if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(requestBody.email))) {
// //                 res.status(400).send({ status: false, message: `Email should be a valid email address` })
// //                 return
// //             };
// //             const isEmailAlreadyUsed = await userModel.findOne({ email: requestBody.email });
// //             if (isEmailAlreadyUsed) {
// //                 res.status(400).send({ status: false, message: `${requestBody.email} email address is already registered` })
// //                 return
// //             };
// //         }
// //         // console.log(Object.prototype.hasOwnProperty.call(requestBody, 'password'))
// //         if (Object.prototype.hasOwnProperty.call(requestBody, 'password')) {
// //             requestBody.password = requestBody.password.trim();
// //             if (!(requestBody.password.length > 7 && requestBody.password.length < 16)) {
// //                 res.status(400).send({ status: false, message: "password should  between 8 and 15 characters" })
// //                 return
// //             };
// //             var salt = await bcryptjs.genSalt(10);
// //             password = await bcryptjs.hash(requestBody.password, salt)
// //             console.log(password)
// //             requestBody.password = password;
// //         }
// //         if (profileImage && profileImage.length > 0) {
// //             var uploadedFileURL = await upload.uploadFile(profileImage[0]);
// //             console.log(uploadedFileURL)
// //             requestBody.profileImage = uploadedFileURL
// //         };
// //         //
// //         if (requestBody.address) {
// //             // requestBody.address = JSON.parse(requestBody.address)
// //             if (requestBody.address.shipping) {
// //                 if (requestBody.address.shipping.street) {
// //                     UserFound.address.shipping.street = requestBody.address.shipping.street
// //                     await UserFound.save()
// //                 }
// //                 if (requestBody.address.shipping.city) {
// //                     UserFound.address.shipping.city = requestBody.address.shipping.city
// //                     await UserFound.save()
// //                 }
// //                 if (requestBody.address.shipping.pincode) {
// //                     UserFound.address.shipping.pincode = requestBody.address.shipping.pincode
// //                     await UserFound.save()
// //                 }
// //             }
// //             if (requestBody.address.billing) {
// //                 if (requestBody.address.billing.street) {
// //                     UserFound.address.billing.street = requestBody.address.billing.street
// //                     await UserFound.save()
// //                 }
// //                 if (requestBody.address.billing.city) {
// //                     UserFound.address.billing.city = requestBody.address.billing.city
// //                     await UserFound.save()
// //                 }
// //                 if (requestBody.address.billing.pincode) {
// //                     UserFound.address.billing.pincode = requestBody.address.billing.pincode
// //                     await UserFound.save()
// //                 }
// //             }
// //         }
// //         requestBody.UpdatedAt = new Date()
// //         const UpdateData = { fname, profileImage: uploadedFileURL, lname, email, phone, password }
// //         const upatedUser = await userModel.findOneAndUpdate({ _id: userId }, UpdateData, { new: true })
// //         res.status(200).send({ status: true, message: 'User updated successfully', data: upatedUser });
// //     } catch (error) {
// //         res.status(500).send({ status: false, message: error.message })
// //     }
// // }

//        let reqBody = req.body
//         let reqParams = req.params.userId
//         // const TokenDetail = req.userId

//         if (!validate.isValidObjectId(reqParams)) {
//             res.staus(400).send({ staus: false, message: "please enter valid details" })
//             return
//         }

//         if (!validate.isValidRequestBody(reqBody)) {
//             res.staus(400).send({ staus: false, message: "please enter valid details" })
//             return
//         }

//         // if (!TokenDetail === reqParams) {
//         //     res.status(400).send({ status: false, message: "user Authorization failed" })
//         // }

//         let { userId, items, totalPrice, totalItems } = reqBody

//         // if (reqParams === userId) {
//             // if (!validate.isValid(userId)) {
//             //     res.status(400).send({ status: false, message: "enter valide user id" })
//             //     return
//             // }

//             // if (!validate.isValidObjectId(userId)) {
//             //     res.status(400).send({ status: false, message: `${userId} is not a valid userId` })
//             //     return
//             // }

//             const findUser = await userModel.findOne({ _id: reqParams })
//             if (!findUser) {
//                 res.status(400).send({ status: false, message: "user dose not exist" })
//                 return
//             }

//             let productID = items[0].productId
//             let proQuantity = items[0].quantity
//             if (!validate.isValid(items)) {
//                 res.status(400).send({ status: false, message: "enter valide items" })
//                 return
//             }

//             if (!validate.isValid(productID)) {
//                 res.status(400).send({ status: false, message: "enter valide productId" })
//                 return
//             }

//             if (!validate.isValidObjectId(productID)) {
//                 res.status(400).send({ status: false, message: "productId not valid" })
//                 return
//             }
//             // console.log(items[0])
//             // console.log(items[0].productId)
//             // console.log(productID)

//             // if (!validate.isValid(proQuantity)) {
//             //     res.status(400).send({ status: false, message: "enter valide quantity" })
//             //     return
//             // }

//             const checkPrice = await productModel.findOne({ _id: productID })
//             const ifCartAlreadyCreated = await cartModel.findOne({ userId: reqParams })
//             // console.log(checkPrice.price)
//             // console.log(checkPrice)
//             // console.log((ifCartAlreadyCreated.items[0].productId).toString())
//             // console.log(ifCartAlreadyCreated.items[0].productId.toString())
//             // console.log(productID)

//             if (!checkPrice) {
//                 res.status(404).send({ status: false, message: `${productID} id dose not exist` })
//                 return
//             }
//             console.log(ifCartAlreadyCreated.items)
//             if (ifCartAlreadyCreated) {
//                 for(let i = 0; i < ifCartAlreadyCreated.items.length; i++ ){
//                     console.log(ifCartAlreadyCreated.items[i])

//                 // let find = ifCartAlreadyCreated.items.find(function(post, index){
//                 //     let consStr = post.productId.toString()
//                 //         if(consStr === productID){
//                 //             return true;
//                 //         }
//                 //     })

//                 // const proP = checkPrice.price
//                 // console.log(proP)
//                 // console.log(find.quantity + 1)
//                 // console.log(find.productId.toString())
//                 //todo =-=-=-=-=-=-=-==-=-=-=-========================================================>
//                 console.log(ifCartAlreadyCreated.items[i].productId.toString())
//                 console.log(productID)
//                 if(productID === ifCartAlreadyCreated.items[i].productId.toString()){
//                     console.log("yo")
//                     let quantity = ifCartAlreadyCreated.items[i].quantity
//                     await cartModel.findOneAndUpdate({userId: reqParams, 'items.productId': productID}, {'items.$.quantity': quantity + proQuantity})
//                     const updateQuant = await cartModel.findOneAndUpdate({userId: reqParams}, {totalPrice: proQuantity*checkPrice.price +  ifCartAlreadyCreated.totalPrice}, {new: true})
//                     console.log(quantity)
//                     return res.status(200).send({status: false, message: "product added to cart", data: updateQuant})
//                 } 
//                 // for(let i = 0; i < ifCartAlreadyCreated.items.length; i++ ){
//                 //     // console.log(ifCartAlreadyCreated.items[i].productId)
//                 //     let convertStr = ifCartAlreadyCreated.items[i].productId.toString()
//                 //     // console.log(convertStr)
//                 //     if(convertStr === productID){
//                 //         // console.log(quant)
//                 //         // console.log(proQuantity)
//                 //         // let objIndex = ifCartAlreadyCreated.items.findIndex((obj => obj.productId == productID));
//                 //         // // console.log(objIndex)
//                 //         const quant = ifCartAlreadyCreated.items[i].quantity
//                 //         console.log(quant)
//                 //         const blankArr = []
//                 //         let takeOldQuant = {defVar: productID, quant: proQuantity + quant}
//                 //         blankArr.push(takeOldQuant)
//                 //         console.log(blankArr)
//                 //         console.log(takeOldQuant)
//                 //         const updateExistingProduct = await cartModel.findOneAndUpdate({userId: userId}, {items: blankArr, totalPrice: proP + ifCartAlreadyCreated.totalPrice })
//                 //         res.status(200).send({status: true, message: "thanks for purchesing product have a great day", data: updateExistingProduct})
//                 //         return
//                 //     }
//                 // }
//                 //     totalItems: ifCartAlreadyCreated + items.length
//                 // }
//                 // console.log(proP)
//                 //todo =-=-=-=-=-=-=-==-=-=-=-========================================================>
//                 const updateItems = await cartModel.updateOne({ userId: reqParams }, { $push: { items: items } })
//                 const updateTPriceItems = await cartModel.findOneAndUpdate({ userId: reqParams }, { totalPrice: (checkPrice.price * proQuantity) + ifCartAlreadyCreated.totalPrice, totalItems: items.length + 1 }, { new: true })
//                 res.status(200).send({ status: true, message: "product added successfully", data: updateTPriceItems })
//                 return
//             }
//             }
//             // console.log(productID)
//             // console.log(productID)
//             // console.log(productID)
//             // let checkPrice = await productModel.findOne({ productID })
//             // console.log(reqParams)
//             //todo if cart already exist------------------------------>
//             var saveCart = {
//                 userId: reqParams,
//                 items,
//                 totalPrice: checkPrice.price * proQuantity,
//                 // checkPrice.price * proQuantity
//                 totalItems: items.length
//             };
//             // console.log(saveCart)

//             const createCart = await cartModel.create(saveCart)
//             res.status(200).send({ status: true, message: "cart successfully created", data: createCart })
//             return
//         // } else {
//         //     res.status(400).send({ status: false, message: "user dose not match" })
//         //     return
//         // }


// let size = [1, 2 , 3 , 3 , 5]
// console.log(typeof size)

// for(let i = 0; i < size.length; i++){
//     // console.log(size[i])
//     console.log(typeof size[i])
// }
// console.log(typeof size)

// let num = 10

// console.log(Number(num).toFixed(2))
// console.log($.number( 123, 2 ))


// let items = [
//         { productId: "654656565132s1ad1a651", quantity: 5 },
//         { productId: "654656565132s1ad1a561", quantity: 2 },
//         { productId: "654656565132s1ad1a000", quantity: 3 }
// ]

// let find = items.find(function (post, index) {
//         if (post.productId === "654656565132s1ad1a561") {
//                 return true;
//         }
// })

// let constr = items.toString()
// let strfy = JSON.stringify(items)
// console.log(constr)
// console.log(strfy)

let arr = [1, 2 , 3, 4]

let addArr = arr.push(6)
console.log(arr)
// console.log("---------------------------->")
// //---------------------------->
// console.log(items[0].productId.type)
// console.log("---------------------------->")
// //---------------------------->
// for(let i = 0; i < items.length; i++){
//     console.log(items[i])
// // }

// console.log(items.length)

