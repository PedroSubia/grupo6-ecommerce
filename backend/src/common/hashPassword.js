import bcrypt from "bcryptjs";

// const hashPassword = async(password) => {
//     const salt = await bcrypt.genSalt(10);
//     const encriptado =  await bcrypt.hash(password, salt);  
//     return encriptado;  
// };

// export default hashPassword;

const hashPassword = (password) => {
    const salt =  bcrypt.genSaltSync(10);
    password=   bcrypt.hashSync(password, salt);  
    return  password;
};

export default hashPassword;
