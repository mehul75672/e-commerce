const user = require('../model/User');
const bcrypt = require('bcrypt');
const admin = async (req, res) =>{
    const existuser = await user.findOne({ email:process.env.ADMIN_EMAIL})
    if (!existuser) {
        const hash = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10);
        await user.create({
            
            firstname:"nirav",
            lastname:"gorasiya",
            fullname:"nirav gorasiya",
            email:process.env.ADMIN_EMAIL,
            password:hash,
            status:true     
        })
    }
}
admin();
