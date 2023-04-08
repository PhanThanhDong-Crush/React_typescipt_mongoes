// import User from "../models/user";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export const signup = async (req: any, res: any) => {
//     try {
//         const { name, email, password } = req.body;

//         const userExists = await User.findOne({ email });
//         if (userExists) {
//             return res.status(400).json({
//                 message: "User already exists",
//             });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const user = await User.create({
//             name,
//             email,
//             password: hashedPassword,
//         });
//         const token = jwt.sign({ _id: user._id }, "PhanThanhDong", { expiresIn: "1h" });
//         user.password = undefined;
//         return res.status(201).json({
//             message: "User created successfully",
//             accessToken: token,
//             user,
//         });
//     } catch (error) { }
// };

// export const signin = async (req: any, res: any) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({
//                 message: "Tài khoản không tồn tại",
//             });
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({
//                 message: "Khong dung mat khau",
//             });
//         }
//         const token = jwt.sign({ _id: user._id }, "PhanThanhDong", { expiresIn: "1h" });

//         user.password = undefined;

//         return res.status(200).json({
//             message: "Đăng nhập thành công",
//             accessToken: token,
//             user,
//         });
//     } catch (error) { }
// };